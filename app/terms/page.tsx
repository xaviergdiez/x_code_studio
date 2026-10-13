import type { Metadata } from 'next';
import { LegalPage } from '../legal-layout';

export const metadata: Metadata = {
  title: 'Terms · x-code.studio',
  robots: { index: false },
};

/**
 * PLACEHOLDER. Working skeleton, not finished legal text.
 *
 * Two things must be settled before any digital product goes on
 * sale to EU buyers:
 *   1. The right-of-withdrawal waiver for instant downloads
 *      (Art. 16(m) Consumer Rights Directive). Without an explicit
 *      waiver at checkout, a consumer keeps a 14-day refund right
 *      on a file they have already downloaded.
 *   2. Who is the merchant of record for VAT. A merchant-of-record
 *      platform such as Lemon Squeezy or Paddle handles EU VAT and
 *      OSS filing; Stripe alone does not.
 */
export default function Terms() {
  return (
    <LegalPage title="Terms" updated="[date]">
      <p>
        These terms cover engagements with x-code.studio, run by Javier Garcia Diez, Amsterdam,
        the Netherlands. KVK [number], BTW [number].
      </p>

      <h2>How engagements work</h2>
      <p>
        Every engagement is scoped as a result obligation (resultaatsverplichting). We agree the
        deliverable, the acceptance criteria and the fixed price before work starts. I decide the
        methods, tools and working hours independently. There is no retainer, no availability
        commitment and no embedding in your organisation.
      </p>

      <h2>Payment</h2>
      <p>
        Fixed-price engagements are invoiced [terms]. Payment is due within [n] days. Dutch VAT
        applies where relevant; the reverse charge applies to EU business clients with a valid
        VAT number.
      </p>

      <h2>Digital products</h2>
      <p>
        [To be completed before launch. Must cover: licence granted, permitted commercial use,
        redistribution ban, refund policy, and the withdrawal-right waiver for instant downloads.]
      </p>

      <h2>Intellectual property</h2>
      <p>
        On full payment, you own the deliverable produced for you. I keep the right to reuse the
        underlying generic techniques, libraries and tooling. Nothing confidential to you is
        reused or shown publicly without written consent.
      </p>

      <h2>Liability</h2>
      <p>
        Liability is limited to the fee paid for the engagement in question. Dutch law applies and
        the courts of Amsterdam have jurisdiction.
      </p>
    </LegalPage>
  );
}
