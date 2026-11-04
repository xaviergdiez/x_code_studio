'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '@/lib/motion';
import { PHONE_BODY, PHONE_VIEWBOX } from './huaweiPaths';

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
 * ── On the fifth finish ──────────────────────────────────────────
 *
 * Four finishes are P30 Pro photography. The fifth is Twilight,
 * drawn as the SVG from the 2018 Mate 20 Pro banner rather than
 * photographed. Putting it in the same picker is the point: one
 * client, two campaigns, a drawn phone and a shot phone switching
 * through the same mechanism.
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
  /** Back-of-phone photograph, or null for the drawn Twilight. */
  img: string | null;
  /** Whether label text on this finish should be light or dark. */
  ink: 'light' | 'dark';
};

const FINISHES: Finish[] = [
  { id: 'aurora', name: 'Aurora', stops: ['#02b09c', '#009d91', '#027b7f'], img: 'green_back.jpg', ink: 'light' },
  { id: 'amber', name: 'Amber Sunrise', stops: ['#ff8400', '#ff6700', '#ff3602'], img: 'orange_back.jpg', ink: 'dark' },
  { id: 'black', name: 'Black', stops: ['#7c7c7c', '#4a4a4a', '#000000'], img: 'black_back.jpg', ink: 'light' },
  { id: 'crystal', name: 'Breathing Crystal', stops: ['#d8edfc', '#a1daf8', '#4db4e7'], img: 'blue_back.jpg', ink: 'dark' },
  { id: 'twilight', name: 'Twilight', stops: ['hsl(212,30%,8%)', 'hsl(240,51%,48%)', 'hsl(197,94%,79%)'], img: null, ink: 'light' },
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

  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<style>
  *{box-sizing:border-box}
  html,body{margin:0;height:100%;overflow:hidden;font-family:system-ui,sans-serif}
  #bg{position:absolute;inset:0;transition:background-image .45s ease, background-color .45s ease}
  #art{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;padding:${kind === 'rect' ? '6px 6px 48px' : '8px'}}
  #art img,#art svg{max-width:100%;max-height:100%;object-fit:contain;display:block;filter:drop-shadow(0 8px 18px rgba(0,0,0,.35))}
  #brand{position:absolute;top:6px;left:8px;font-size:10px;font-weight:700;letter-spacing:.5px}
  #pick{position:absolute;left:0;right:0;bottom:0;padding:6px;display:flex;gap:6px;justify-content:center;align-items:center}
  .sw{width:26px;height:26px;min-width:26px;border-radius:50%;border:2px solid rgba(255,255,255,.85);cursor:pointer;padding:0}
  .sw[aria-pressed="true"]{outline:2px solid #fff;outline-offset:2px}
  #cap{position:absolute;bottom:34px;left:0;right:0;text-align:center;font-size:10px;font-weight:700;letter-spacing:1px}
  @media (prefers-reduced-motion: reduce){#bg{transition:none}}
</style></head><body>
<div id="bg"></div>
<div id="art"></div>
<div id="brand">HUAWEI P30 Pro</div>
${kind === 'rect' ? `<div id="cap">KIES JE KLEUR</div><div id="pick">${swatches}</div>` : ''}
<script>
(function(){
  var bg = document.getElementById('bg');
  var art = document.getElementById('art');
  var brand = document.getElementById('brand');
  var cap = document.getElementById('cap');
  var PHONE = ${JSON.stringify(PHONE_BODY)};
  var VB = ${JSON.stringify(PHONE_VIEWBOX)};
  var SLOT = ${JSON.stringify(`${kind}-${slotIndex}`)};
  var painted = false;

  function apply(f){
    painted = true;
    bg.style.background = 'linear-gradient(160deg,' + f.stops[0] + ',' + f.stops[1] + ',' + f.stops[2] + ')';
    var ink = f.ink === 'light' ? '#fff' : '#111';
    brand.style.color = ink;
    if (cap) cap.style.color = ink;
    if (f.img) {
      art.innerHTML = '<img alt="" src="/images/huawei/' + f.img + '">';
    } else {
      art.innerHTML =
        '<svg viewBox="' + VB + '" xmlns="http://www.w3.org/2000/svg">' +
        '<defs><linearGradient id="tw" x1="445" y1="1143" x2="156" y2="65" gradientUnits="userSpaceOnUse">' +
        '<stop offset="0" stop-color="hsl(212,30%,8%)"/><stop offset=".55" stop-color="hsl(248,38%,16%)"/>' +
        '<stop offset=".87" stop-color="hsl(240,51%,48%)"/><stop offset="1" stop-color="hsl(197,94%,79%)"/>' +
        '</linearGradient></defs><path d="' + PHONE + '" fill="url(#tw)"/></svg>';
    }
    var btns = document.querySelectorAll('.sw');
    for (var i=0;i<btns.length;i++){
      btns[i].setAttribute('aria-pressed', String(btns[i].dataset.id === f.id));
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
    apply(d.finish);
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

  const broadcast = useCallback((i: number) => {
    const finish = FINISHES[i];
    frames.current.forEach((f) =>
      f?.contentWindow?.postMessage({ ns: 'hpto', type: 'finish', finish }, '*'),
    );
  }, []);

  // `active` is read inside the listener but must not re-subscribe
  // it: the listener has to be attached once, as early as possible,
  // because the slot documents are tiny and start announcing
  // themselves before this component finishes hydrating.
  const activeRef = useRef(active);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = active;
  }, [active]);
  const seen = useRef<Set<string>>(new Set());

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
        if (e.source) {
          (e.source as Window).postMessage(
            { ns: 'hpto', type: 'finish', finish: FINISHES[activeRef.current] },
            '*',
          );
        }
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
      <div className="overflow-hidden rounded-card border border-line bg-white">
        <div className="flex items-center gap-1.5 border-b border-neutral-300 bg-neutral-200 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-400" />
          <span className="ml-3 text-[10px] font-semibold text-neutral-500">
            a news homepage
          </span>
        </div>

        {slot('masthead', 0, 'block h-[72px] w-full border-0', 'Ad slot: masthead')}

        <div className="flex gap-2 bg-neutral-100 p-2">
          {slot('skin', 1, 'hidden h-[320px] w-[120px] shrink-0 border-0 sm:block', 'Ad slot: left skin')}

          <div className="min-w-0 flex-1 rounded bg-white p-3">
            <div className="mb-3 h-2.5 w-2/5 rounded bg-neutral-300" />
            <div className="space-y-1.5">
              {[1, 0.95, 0.88, 0.97, 0.6].map((w, i) => (
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

          {slot('skin', 3, 'hidden h-[320px] w-[120px] shrink-0 border-0 lg:block', 'Ad slot: right skin')}
        </div>
      </div>

      <p className="terminal mt-4 text-label text-fg-subtle">
        {synced} slot documents handshaked · showing {FINISHES[active].name} · pick
        a swatch in the rectangle
      </p>
    </div>
  );
}
