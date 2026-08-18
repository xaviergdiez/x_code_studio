import Link from 'next/link';
import type { ReactNode } from 'react';

/**
 * Shared shell for the legal pages. Deliberately plain: no terminal
 * motif, no animation. Someone reading this is checking whether you
 * are a real vendor, not admiring the design.
 */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-2xl px-5 py-24 sm:px-8">
      <Link href="/" className="text-small text-neon hover:underline">
        ← Back to x-code.studio
      </Link>
      <h1 className="mt-8 text-h1 font-bold text-fg">{title}</h1>
      <p className="mt-2 text-small text-fg-subtle">Last updated {updated}</p>
      <div className="mt-10 space-y-8 text-body text-fg-muted [&_h2]:text-h3 [&_h2]:font-bold [&_h2]:text-fg [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </main>
  );
}
