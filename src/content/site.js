export const SITE = {
  name: 'The Divine Get Down',
  canonicalUrl: 'https://thedivinegetdown.com',
  contactEmail: 'thedivinegetdown@gmail.com',
  contactFormName: 'contact-inquiry',
  logo: {
    png: '/divine_logo.png',
    webp: '/divine_logo.webp',
    alt: 'The Divine Get Down crest',
    width: 160,
    height: 160,
  },
  links: {
    home: '/',
    stillness: '/stillness',
    journey: '/journey',
    community: '/community',
    scrollVault: '/vault',
    resetExperience: '/reset-experience',
    experienceAccess: '/experience-access',
    thankYou: '/thank-you',
  },
  labels: {
    backToSanctuary: '← Back to the Sanctuary',
  },
};

export const SITE_URL = process.env.REACT_APP_SITE_URL || SITE.canonicalUrl;

export const CONTACT_EMAIL_HREF =
  `mailto:${SITE.contactEmail}?subject=The%20Divine%20Get%20Down%20Inquiry%20-%20Speaking%20or%20Collaboration`;
