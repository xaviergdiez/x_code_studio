import type { Metadata } from 'next';
import { LegalPage } from '../legal-layout';

export const metadata: Metadata = {
  title: 'Privacy · x-code.studio',
  robots: { index: false },
};

/**
 * PLACEHOLDER. This is a working skeleton so the footer links are
 * not dead, not finished legal text. Before selling anything to EU
 * buyers, have this reviewed and fill in the bracketed items.
 */
export default function Privacy() {
  return (
    <LegalPage title="Privacy" updated="[date]">
      <p>
        x-code.studio is run by Javier Garcia Diez in Amsterdam, the Netherlands. This page
        explains what happens to the information you send through this site.
      </p>

      <h2>What is collected</h2>
      <ul>
        <li>The name, email address and message you type into the contact form.</li>
        <li>Nothing else. There is no analytics script, no advertising pixel and no tracking cookie on this site.</li>
      </ul>

      <h2>Where it goes</h2>
      <p>
        Contact form submissions are processed by Formspree, which forwards them to my inbox.
        Their privacy policy is at formspree.io/legal/privacy-policy. Hosting is provided by
        [host]. No data is sold or shared with anyone else.
      </p>

      <h2>How long it is kept</h2>
      <p>
        Enquiries are kept for [period] and then deleted. Records tied to a paid engagement are
        kept for seven years, as Dutch tax law requires.
      </p>

      <h2>Your rights</h2>
      <p>
        Under the GDPR you can ask for a copy of what is held about you, ask for it to be
        corrected, or ask for it to be deleted. Email hello@x-code.studio and you will get a
        reply within thirty days. You can also complain to the Autoriteit Persoonsgegevens.
      </p>
    </LegalPage>
  );
}
