import type { Metadata } from 'next';
import type { ReactNode } from 'react';

/**
 * /new — preview route for the homepage rewrite.
 *
 * noindex/nofollow is deliberate and load-bearing. Two live URLs
 * serving near-identical copy is exactly how a small site splits
 * its own search authority. This must stay until /new is promoted
 * to /, at which point delete this directory entirely rather than
 * leaving a duplicate behind.
 */
export const metadata: Metadata = {
  title: 'Preview · x-code.studio',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-neon/40 bg-ink-900/95 px-5 py-2 text-center text-label text-fg-subtle backdrop-blur">
        Preview build. Not indexed.{' '}
        <a href="/" className="text-neon hover:underline">
          Current site
        </a>
      </div>
      {children}
    </>
  );
}
