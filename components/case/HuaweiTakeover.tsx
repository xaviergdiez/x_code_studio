'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import {
  PHONE_BACK_MASK,
  PHONE_BACK_VIEWBOX,
  PHONE_FRONT_MASK,
} from './huaweiPaths';

/**
 * Candidate 7: the P30 Pro homepage takeover, rebuilt honestly.
 *
 * The 2019 nu.nl takeover ran four separately served ad slots: a
 * masthead, two side skins and an in-page 300x250. Picking a finish
 * in the rectangle recoloured all four at once, product shot and
 * background together, through Weborama's screenad API.
 *
 * ── Why this uses real iframes ───────────────────────────────────
 *
 * The obvious way to rebuild this is one React tree with four
 * panels and a useState. That would look identical and demonstrate
 * nothing, because the difficulty was never the recolouring. It was
 * that each slot is a separate document that cannot see the others,
 * which is the whole reason an ad server ships a sync API.
 *
 * So each slot here is a real <iframe srcdoc>, with its own
 * document, its own script and no access to this component's state.
 * They coordinate exactly the way the originals did: the rectangle
 * posts a pick up to the page, the page fans it back out to every
 * slot, and each slot applies it locally. postMessage stands in for
 * the screenad API. Same topology, same failure modes, no shortcut.
 *
 * ── Four finishes, not five ──────────────────────────────────────
 *
 * The picker carries the four photographed P30 Pro finishes and
 * nothing else, because that is what the campaign shipped. The
 * drawn Twilight phone from the SVG experiment was in here for a
 * while, as a fifth swatch, which was a mistake twice over: it
 * belonged to the invented two-campaign framing, and it is a
 * different silhouette drawn at a different viewBox, so it read
 * as a flat slab sitting among four photographs. The experiment
 * has its own section at the end of the case, which is where it
 * actually belongs.
 *
 * The finish colours below are the device finishes themselves, so
 * they are content rather than theme, which is why they are literal
 * here. They match the stops already in components/case/
 * HuaweiPhones.tsx so the case page and this agree.
 */

type Finish = {
  id: string;
  name: string;
  stops: [string, string, string];
  /** Back-of-phone photograph. Every finish here has one. */
  img: string;
  /** Front photograph, used for the masthead's second phone. */
  front: string;
  /** Whether label text on this finish should be light or dark. */
  ink: 'light' | 'dark';
};

const FINISHES: Finish[] = [
  { id: 'aurora', name: 'Aurora', stops: ['#02b09c', '#009d91', '#027b7f'], img: 'green_back.jpg', front: 'green_front.jpg', ink: 'light' },
  { id: 'amber', name: 'Amber Sunrise', stops: ['#ff8400', '#ff6700', '#ff3602'], img: 'orange_back.jpg', front: 'orange_front.jpg', ink: 'dark' },
  { id: 'black', name: 'Black', stops: ['#7c7c7c', '#4a4a4a', '#000000'], img: 'black_back.jpg', front: 'black_front.jpg', ink: 'light' },
  { id: 'crystal', name: 'Breathing Crystal', stops: ['#d8edfc', '#a1daf8', '#4db4e7'], img: 'blue_back.jpg', front: 'blue_front.jpg', ink: 'dark' },
];

type SlotKind = 'masthead' | 'skin' | 'rect';

/**
 * One slot's document. Everything the slot needs travels in the
 * message, so the document itself knows nothing about the finishes
 * until the page tells it, exactly like a served creative.
 */
function slotDoc(kind: SlotKind, slotIndex: number, finishes: Finish[]): string {
  const swatches =
    kind === 'rect'
      ? finishes
          .map(
            (f) =>
              `<button class="sw" data-id="${f.id}" aria-label="${f.name}" style="background:linear-gradient(135deg, ${f.stops[0]}, ${f.stops[2]})"></button>`,
          )
          .join('')
      : '';

  // One layer per finish, all present from the start so a switch is
  // a cross-fade rather than a load. Each photograph is clipped to
  // the device silhouette by filling the mask path with a pattern
  // holding the JPEG, which is how the portfolio did it: without
  // the mask each photo arrives in its own 400x840 white box.
  const phone = (f: Finish, face: 'back' | 'front') => {
    const id = `pat-${face}-${f.id}`;
    const src = face === 'back' ? f.img : f.front;
    const mask = face === 'back' ? PHONE_BACK_MASK : PHONE_FRONT_MASK;
    return `<svg viewBox="${PHONE_BACK_VIEWBOX}" xmlns="http://www.w3.org/2000/svg">
      <defs><pattern id="${id}" patternUnits="userSpaceOnUse" width="400" height="840" x="0" y="0">
        <image href="/images/huawei/${src}" width="400" height="840" x="0" y="0"/>
      </pattern></defs>
      <path d="${mask}" fill="url(#${id})"/>
    </svg>`;
  };

  // The masthead is wide and short, so one upright phone leaves it
  // looking empty. A tilted front-and-back pair is what the hero
  // does and what the shipped billboard did: it fills the band and
  // shows both faces of the device in the space available.
  const layers = finishes
    .map((f) => {
      const art =
        kind === 'masthead'
          ? `<div class="pair"><div class="stack">
               <span class="face-front">${phone(f, 'front')}</span>
               <span>${phone(f, 'back')}</span>
             </div></div>`
          : phone(f, 'back');
      return `<div class="layer" data-f="${f.id}">${art}</div>`;
    })
    .join('');

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<style>
  *{box-sizing:border-box}
  html,body{margin:0;height:100%;overflow:hidden;font-family:system-ui,sans-serif}
  #bg{position:absolute;inset:0;transition:background .55s ease}
  #art{position:absolute;inset:0}
  /* Every finish is rendered and stacked. Switching cross-fades
     opacity instead of swapping a src, which is what the original
     did with four <image> nodes inside one pattern. Swapping the
     source snapped, and showed a blank frame while the next file
     decoded.

     The padding sits here, not on #art: inset:inherit took the
     parent's inset:0 rather than its padding box, so the phone
     ignored the reserved strip and sat on top of the caption and
     the swatches. */
  .layer{position:absolute;inset:0;padding:${kind === 'rect' ? '6px 6px 56px' : '8px'};
         display:flex;align-items:center;justify-content:center;
         opacity:0;transition:opacity .55s ease;pointer-events:none}
  .layer[data-on="1"]{opacity:1}
  .layer svg{max-width:100%;max-height:100%;display:block;filter:drop-shadow(0 8px 18px rgba(0,0,0,.35))}
  /* Masthead pair: two phones tilted off vertical, overlapping, and
     allowed to run past the band's top and bottom edges the way a
     billboard crop does. */
  /* The hero stacks a front and a back vertically, turns the front
     through 180 so the two face each other, then rotates the pair
     off vertical. Side by side they just looked like two phones in
     a row. Same construction here, cropped by the band. */
  .pair{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
  .stack{display:flex;flex-direction:column;align-items:center;gap:10px;
         transform:rotate(22deg);transform-origin:center}
  .stack span{display:block;height:132px}
  .stack svg{height:100%;width:auto;max-height:none}
  .face-front{transform:rotate(180deg)}
  /* Behind the phone, not in front of it: the wordmark is a
     surface marking, and a device crossing over it is what
     makes the slot read as one composition rather than a
     label stuck on top of a picture. */
  #brand{position:absolute;top:6px;left:8px;font-size:10px;font-weight:700;letter-spacing:.5px;z-index:0}
  #art{z-index:1}
  #pick{position:absolute;left:0;right:0;bottom:0;padding:6px;display:flex;gap:6px;justify-content:center;align-items:center}
  .sw{width:26px;height:26px;min-width:26px;border-radius:50%;border:2px solid rgba(255,255,255,.85);cursor:pointer;padding:0}
  .sw[aria-pressed="true"]{outline:2px solid #fff;outline-offset:2px}
  #cap{position:absolute;bottom:34px;left:0;right:0;text-align:center;font-size:10px;font-weight:700;letter-spacing:1px}
  @media (prefers-reduced-motion: reduce){#bg,.layer{transition:none}}
</style></head><body>
<div id="bg"></div>
<div id="art">${layers}</div>
<div id="brand">HUAWEI P30 Pro</div>
${kind === 'rect' ? `<div id="cap">KIES JE KLEUR</div><div id="pick">${swatches}</div>` : ''}
<script>
(function(){
  var bg = document.getElementById('bg');
  var brand = document.getElementById('brand');
  var cap = document.getElementById('cap');
  var layers = document.querySelectorAll('.layer');
  var SLOT = ${JSON.stringify(`${kind}-${slotIndex}`)};
  var painted = false;

  function apply(f, box){
    painted = true;
    // One gradient across the whole takeover, not one per slot.
    //
    // Each slot used to paint linear-gradient(160deg, ...) into its
    // own box, so every slot restarted the ramp and each boundary
    // showed a hard seam: three surfaces of the same colours that
    // obviously were not the same surface. The page now measures
    // where each slot sits and sends it those numbers, so the slot
    // paints the gradient at full page size and shifts it into
    // place. The slots are still separate documents that know
    // nothing about each other; they are told where they are, which
    // is the same thing the real takeover had to do.
    bg.style.backgroundImage =
      'linear-gradient(160deg,' + f.stops[0] + ',' + f.stops[1] + ',' + f.stops[2] + ')';
    if (box) {
      bg.style.backgroundSize = box.pw + 'px ' + box.ph + 'px';
      bg.style.backgroundPosition = (-box.x) + 'px ' + (-box.y) + 'px';
      bg.style.backgroundRepeat = 'no-repeat';
    }
    var ink = f.ink === 'light' ? '#fff' : '#111';
    brand.style.color = ink;
    if (cap) cap.style.color = ink;

    // Every finish is already in the document, masked and ready.
    // Switching is a class flip, so the browser cross-fades two
    // decoded images instead of tearing one out and loading the
    // next, which is what made the old version snap and flash.
    for (var i=0;i<layers.length;i++){
      layers[i].setAttribute('data-on', layers[i].dataset.f === f.id ? '1' : '0');
    }

    var btns = document.querySelectorAll('.sw');
    for (var j=0;j<btns.length;j++){
      btns[j].setAttribute('aria-pressed', String(btns[j].dataset.id === f.id));
    }
  }

  document.addEventListener('click', function(e){
    var b = e.target.closest ? e.target.closest('.sw') : null;
    if (!b) return;
    // A slot never recolours itself. It reports the pick and waits
    // to be told, which is what keeps four documents in step.
    parent.postMessage({ ns:'hpto', type:'pick', id:b.dataset.id }, '*');
  });

  addEventListener('message', function(e){
    var d = e.data;
    if (!d || d.ns !== 'hpto' || d.type !== 'finish') return;
    apply(d.finish, d.box);
  });

  // Announce until answered. A single shot on load is lost whenever
  // the page has not attached its listener yet, which is most of the
  // time: the slot document is tiny and finishes long before the
  // host framework has hydrated. Retrying is what makes the
  // handshake, and therefore the late-frame catch-up, actually hold.
  var tries = 0;
  function announce(){
    if (painted || tries++ > 20) return;
    parent.postMessage({ ns:'hpto', type:'ready', slot:SLOT }, '*');
    setTimeout(announce, 100);
  }
  announce();
})();
</script></body></html>`;
}

export function HuaweiTakeover() {
  const [active, setActive] = useState(0);
  const [synced, setSynced] = useState(0);
  const frames = useRef<(HTMLIFrameElement | null)[]>([]);
  const pageRef = useRef<HTMLDivElement>(null);

  /**
   * Where a slot sits inside the mock page, so it can paint its
   * slice of one page-wide gradient instead of its own.
   */
  const boxFor = useCallback((el: HTMLIFrameElement | null) => {
    const page = pageRef.current;
    if (!page || !el) return null;
    const p = page.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return {
      x: Math.round(r.left - p.left),
      y: Math.round(r.top - p.top),
      pw: Math.round(p.width),
      ph: Math.round(p.height),
    };
  }, []);

  const sendTo = useCallback(
    (idx: number, finishIndex: number) => {
      const el = frames.current[idx];
      el?.contentWindow?.postMessage(
        { ns: 'hpto', type: 'finish', finish: FINISHES[finishIndex], box: boxFor(el) },
        '*',
      );
    },
    [boxFor],
  );

  const broadcast = useCallback(
    (i: number) => frames.current.forEach((_, idx) => sendTo(idx, i)),
    [sendTo],
  );

  // `active` is read inside the listener but must not re-subscribe
  // it: the listener has to be attached once, as early as possible,
  // because the slot documents are tiny and start announcing
  // themselves before this component finishes hydrating.
  const activeRef = useRef(active);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = active;
  }, [active]);
  const seen = useRef<Set<string>>(new Set());

  // Same reason: the listener is attached once, so it reaches sendTo
  // through a ref rather than closing over the first one.
  const sendToRef = useRef(sendTo);
  useIsomorphicLayoutEffect(() => {
    sendToRef.current = sendTo;
  }, [sendTo]);

  useIsomorphicLayoutEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const d = e.data;
      if (!d || d.ns !== 'hpto') return;

      if (d.type === 'ready') {
        // Slots retry their announcement, so count distinct slots
        // rather than messages.
        if (typeof d.slot === 'string' && !seen.current.has(d.slot)) {
          seen.current.add(d.slot);
          setSynced(seen.current.size);
        }
        // Answer with the current finish, so a slot that loads late
        // cannot come up on a different colour from the other three.
        // Answered through sendTo rather than straight back at
        // e.source, because the reply has to carry the slot's own
        // geometry or it paints the gradient from its own corner and
        // breaks the seam it was supposed to hide.
        const idx = frames.current.findIndex((fr) => fr?.contentWindow === e.source);
        if (idx >= 0) sendToRef.current(idx, activeRef.current);
      }

      if (d.type === 'pick') {
        const i = FINISHES.findIndex((f) => f.id === d.id);
        if (i >= 0) setActive(i);
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // Deliberately no broadcast on mount. A slot enters the group only
  // by announcing itself and being answered, which is the same
  // contract the ad server's API enforces and the only way the
  // late-frame path gets exercised at all.
  //
  // Broadcasting on mount instead looked fine and quietly destroyed
  // the handshake: the broadcast beat the slot's first announcement,
  // the slot marked itself painted and stopped retrying, and the one
  // announcement it had already sent was lost because the page had
  // not attached its listener yet. Everything rendered correctly and
  // the handshake count sat at zero.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    broadcast(active);
  }, [active, broadcast]);

  // The shared gradient is positioned in pixels, so every slot needs
  // its numbers again whenever the layout moves. Without this the
  // seams reappear the moment the window is resized.
  useEffect(() => {
    const onResize = () => broadcast(activeRef.current);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [broadcast]);

  const slot = (kind: SlotKind, idx: number, className: string, title: string) => (
    <iframe
      key={idx}
      ref={(el) => {
        frames.current[idx] = el;
      }}
      title={title}
      srcDoc={slotDoc(kind, idx, FINISHES)}
      className={className}
      sandbox="allow-scripts"
    />
  );

  return (
    <div>
      {/* The mock publisher page. Everything grey is ordinary page
          furniture; the four coloured surfaces are the ad slots. */}
      <div ref={pageRef} className="overflow-hidden rounded-card border border-line bg-white">
        <div className="flex items-center gap-1.5 border-b border-neutral-300 bg-neutral-200 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-400" />
          <span className="ml-3 text-[10px] font-semibold text-neutral-500">
            a news homepage
          </span>
        </div>

        {/* Proportions are the demo's, not a real publisher's. A real
            takeover gives the skins whatever is left beside a wide
            article column, which here left three narrow strips of
            colour around a field of grey placeholder. Since the point
            is watching four surfaces move together, the article column
            is capped and centred and the slots take the room back:
            the skins are wide enough to read as surfaces and sit
            right against the content, and the masthead is a billboard
            rather than a bar. */}
        {slot('masthead', 0, 'block h-[200px] w-full border-0', 'Ad slot: masthead')}

        {/* No padding on this row and the skins flex. A takeover's
            colour runs to the edge of the window; boxing it in a
            grey gutter turns the skins into two banners sitting on a
            page, which is the opposite of what the format does. */}
        <div className="flex gap-1.5 bg-neutral-100">
          {slot('skin', 1, 'hidden h-[430px] min-w-0 flex-1 border-0 sm:block', 'Ad slot: left skin')}

          <div className="w-full min-w-0 max-w-[460px] shrink-0 bg-white p-4">
            <div className="mb-3 h-2.5 w-2/5 rounded bg-neutral-300" />
            <div className="space-y-1.5">
              {[1, 0.95, 0.88].map((w, i) => (
                <div key={i} className="h-1.5 rounded bg-neutral-200" style={{ width: `${w * 100}%` }} />
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              {slot('rect', 2, 'h-[250px] w-[300px] max-w-full border border-neutral-300', 'Ad slot: 300x250 rectangle, colour picker')}
            </div>
            <div className="mt-4 space-y-1.5">
              {[0.92, 1, 0.7].map((w, i) => (
                <div key={i} className="h-1.5 rounded bg-neutral-200" style={{ width: `${w * 100}%` }} />
              ))}
            </div>
          </div>

          {slot('skin', 3, 'hidden h-[430px] min-w-0 flex-1 border-0 sm:block', 'Ad slot: right skin')}
        </div>
      </div>

      <p className="terminal mt-4 text-label text-fg-subtle">
        {synced} slot documents handshaked · showing {FINISHES[active].name} · pick
        a swatch in the rectangle
      </p>
    </div>
  );
}
