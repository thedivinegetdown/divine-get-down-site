export const SCROLL_VAULT_CONTENT = {
  metadata: {
    title: 'Christian Prayers & Scripture Reflections | The Divine Get Down',
    description:
      'Explore Christian prayers for peace, strength, and healing, Scripture reflections, and guided moments that help you realign with God.',
    path: '/vault',
  },
  title: 'The Scroll Vault',
  subtitle: 'A quiet place for those who return.',
  introduction:
    'The Scroll Vault is a growing collection of sacred prayers, reflections, and guided moments — created to help you slow down and realign with God throughout your day.',
  rhythmLine: 'This is not content to consume.',
  rhythmResponse: 'This is a rhythm to live by.',
  insideHeading: 'Inside the Vault',
  insideItems: [
    'Prayer scrolls for peace, strength, and healing',
    'Short audio reflections',
    'Scripture-anchored stillness prompts',
    'Gentle guidance for daily return',
  ],
  accessOptions: [
    {
      title: 'One-time access',
      pricePrefix: 'One-time access — ',
      price: '$11',
      description: 'A simple doorway to begin.',
    },
    {
      title: 'Ongoing access',
      pricePrefix: 'Ongoing access — ',
      price: '$19/month',
      description: 'For those who want a daily return.',
    },
  ],
  requestHeading: 'Request Access',
  requestDescription:
    'Checkout links can be connected next (Gumroad, Stripe, or your preferred flow). For now, this form captures your request so you can be granted access immediately.',
  form: {
    honeypotLabel: 'Don’t fill this out if you’re human:',
    emailLabel: 'Email address',
    emailPlaceholder: 'Your email address',
    planLabel: 'Access plan',
    plans: [
      { value: 'one-time', label: 'One-time access ($11)' },
      { value: 'monthly', label: 'Ongoing access ($19/month)' },
    ],
    noteLabel: 'Prayer request (optional)',
    notePlaceholder: 'Optional: anything you’d like to receive prayer for?',
    submitButton: 'Enter the Scroll Vault',
    journeyLink: 'Prefer a guided path? Begin the 4-Week Journey →',
  },
  footnote: 'You may come and go freely. There is no pressure to stay.',
};
