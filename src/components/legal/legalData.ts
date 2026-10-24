import { COMPANY_INFO } from '../../data/solarData';

// A paragraph, or a bulleted list.
export type LegalBlock = string | string[];

export interface LegalSection {
  id: string;
  title: string;
  body: LegalBlock[];
}

export interface LegalDoc {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const UPDATED = '25 October 2026';

export const PRIVACY_POLICY: LegalDoc = {
  eyebrow: 'Your Data, Respected',
  title: 'Privacy Policy',
  updated: UPDATED,
  intro: `This Privacy Policy explains how ${COMPANY_INFO.name} ("ENKAY", "we", "us") collects, uses and protects the personal information you share with us through this website, by phone, by email or on WhatsApp.`,
  sections: [
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      body: [
        'We only collect information that you choose to give us. When you send a message through our Contact form or request a quote, we collect:',
        [
          'Your name, email address and phone number.',
          'The subject and content of your message.',
          'Project details such as project type (residential or commercial), required capacity, site location and your average electricity bill.',
        ],
        'We do not ask for, and you should not send us through this website, payment card details, Aadhaar numbers, passwords or other sensitive personal data.',
      ],
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      body: [
        'We use your information to:',
        [
          'Reply to your enquiry and contact you about your solar requirements.',
          'Prepare site surveys, technical proposals and quotations.',
          'Assist with government subsidy applications and TNEB net-metering paperwork when you ask us to.',
          'Install, service and support systems you have purchased from us.',
          'Meet our legal, tax and accounting obligations.',
        ],
        'We do not sell, rent or trade your personal information, and we do not use it for third-party advertising.',
      ],
    },
    {
      id: 'sharing',
      title: 'When We Share Information',
      body: [
        'We share personal information only where it is needed to serve you:',
        [
          'With solar equipment manufacturers and distributors, for warranty registration and claims.',
          'With government bodies, DISCOMs (such as TNEB / TANGEDCO) and subsidy portals, when you ask us to file applications on your behalf.',
          'With trusted service providers who host this website and store enquiries for us, under confidentiality obligations.',
          'Where the law requires it, or to protect our legal rights.',
        ],
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies & Third-Party Services',
      body: [
        'This website does not use advertising or analytics cookies. Your browser stores a small session flag so the intro animation is only shown once per visit; it is cleared when you close the tab.',
        'Some pages include content from third parties, which may set their own cookies or collect technical data (such as your IP address) under their own privacy policies:',
        [
          'Google Maps, used to show our office location on the Contact page.',
          'Google Fonts, used to display the website typography.',
          'WhatsApp, if you choose to chat with us using the WhatsApp link.',
        ],
      ],
    },
    {
      id: 'storage-security',
      title: 'Data Storage & Security',
      body: [
        'Enquiries submitted through this website are sent over an encrypted (HTTPS) connection and stored in a secure, access-controlled database. Only authorised ENKAY staff can view them.',
        'We keep enquiry records for as long as needed to respond to you and to support any system we install, and as required by law. No method of transmission or storage is completely secure, but we take reasonable steps to protect your information.',
      ],
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      body: [
        "In line with India's Digital Personal Data Protection Act, 2023 and other applicable laws, you may ask us to:",
        [
          'Tell you what personal information we hold about you.',
          'Correct or update information that is inaccurate.',
          'Delete your information, where we are not required to keep it.',
          'Stop contacting you about your enquiry.',
        ],
        `To make a request, email us at ${COMPANY_INFO.email}. We will respond within a reasonable time.`,
      ],
    },
    {
      id: 'children',
      title: "Children's Privacy",
      body: ['This website is intended for adults. We do not knowingly collect personal information from anyone under 18. If you believe a child has sent us their information, please contact us and we will delete it.'],
    },
    {
      id: 'changes',
      title: 'Changes to This Policy',
      body: ['We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page shows when it was last revised. Continuing to use the website after a change means you accept the updated policy.'],
    },
  ],
};

export const TERMS_AND_CONDITIONS: LegalDoc = {
  eyebrow: 'Clear & Fair Terms',
  title: 'Terms & Conditions',
  updated: UPDATED,
  intro: `These Terms & Conditions govern your use of this website and the solar products and services offered by ${COMPANY_INFO.name} ("ENKAY", "we", "us"). By using this website or engaging our services, you agree to these terms.`,
  sections: [
    {
      id: 'website-use',
      title: 'Use of This Website',
      body: [
        'You may use this website to learn about our products and services and to contact us. You agree not to:',
        [
          'Submit false, misleading or someone else\'s information.',
          'Attempt to disrupt, damage or gain unauthorised access to the website or its systems.',
          'Copy or reuse website content for commercial purposes without our written permission.',
        ],
      ],
    },
    {
      id: 'information-estimates',
      title: 'Information & Estimates',
      body: [
        'We aim to keep product details, prices and specifications on this website accurate and up to date, but they may change without notice and may contain errors.',
        'Results from the Solar Savings Calculator are indicative estimates only. Actual generation and savings depend on your site, roof orientation, shading, weather, tariff and how you use electricity, and are not guaranteed.',
      ],
    },
    {
      id: 'quotations-orders',
      title: 'Quotations & Orders',
      body: [
        'Submitting an enquiry or quote request does not create a contract. A binding agreement is formed only when you accept our written technical and commercial proposal and we receive your purchase order and advance payment.',
        'Quotations are valid for the period stated on them. The prices, scope, delivery timeline and warranties in your signed proposal take precedence over anything shown on this website.',
      ],
    },
    {
      id: 'payment',
      title: 'Pricing & Payment',
      body: [
        'Unless your proposal says otherwise, prices are on a Chennai price basis and payment is made 75% in advance, with the remaining 25% due once installation is completed.',
        'Prices are subject to applicable taxes. Changes to the agreed scope, site conditions not disclosed at survey, or changes in government duties may affect the final price; we will tell you before any such change.',
      ],
    },
    {
      id: 'subsidies-approvals',
      title: 'Subsidies & Approvals',
      body: [
        'Government subsidies (such as PM Surya Ghar: Muft Bijli Yojana and state schemes) and net-metering are granted by the relevant authorities, not by ENKAY. We will help you apply, but eligibility, amounts and timelines are decided by those authorities and can change.',
        "TNEB net-metering is in the customer's scope unless your proposal states otherwise. Subsidy amounts are not deducted from our invoice unless agreed in writing.",
      ],
    },
    {
      id: 'installation',
      title: 'Installation & Site Access',
      body: [
        'Delivery is normally 1–2 weeks from receipt of your purchase order and advance payment, subject to stock and site readiness. You agree to:',
        [
          'Provide safe access to the site, roof and electrical panels during survey and installation.',
          'Confirm you own the property or have permission to install the system there.',
          'Obtain any society, landlord or building approvals required for the installation.',
        ],
        'Ownership of equipment passes to you once full payment has been received.',
      ],
    },
    {
      id: 'warranty',
      title: 'Warranty & Maintenance',
      body: [
        'Products carry the manufacturer\'s warranty, as stated in your proposal (for example, a 15-year manufacturing warranty on solar panels and a 10-year warranty on on-grid inverters). Other system components carry a 5-year warranty, and we provide 5 years of free maintenance unless your proposal states otherwise.',
        'Warranties do not cover damage from misuse, unauthorised repairs or modifications, theft, fire, flood, lightning, voltage fluctuations from the grid, or other events beyond reasonable control.',
      ],
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      body: [
        "To the extent permitted by law, ENKAY is not liable for indirect or consequential losses, including loss of savings, revenue or electricity generation. Our total liability for any claim relating to a project is limited to the amount you paid us for that project.",
        'Nothing in these terms limits any rights you have as a consumer that cannot be excluded under Indian law.',
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      body: ['All content on this website, including text, images, graphics and logos, belongs to ENKAY or its licensors. Brand names and logos of solar manufacturers belong to their respective owners and are shown to identify the products we supply.'],
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      body: ['These terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu. We encourage you to contact us first so we can try to resolve any concern directly.'],
    },
    {
      id: 'changes',
      title: 'Changes to These Terms',
      body: ['We may update these Terms & Conditions from time to time. The "Last updated" date at the top of this page shows when they were last revised. The terms in force when you signed your proposal apply to that project.'],
    },
  ],
};
