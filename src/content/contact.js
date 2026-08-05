export const CONTACT_CONTENT = {
  tabHeading: 'Contact',
  title: 'People & Businesses Can Reach Out Here',
  description:
    'People, ministries, brands, and businesses can contact The Divine Get Down for speaking engagements, collaborations, interviews, partnerships, workshops, and other creative opportunities.',
  businessContactKicker: 'Business Contact',
  emailHelper: 'Tap the email above to open your mail app instantly.',
  inquiryTypes: [
    { value: 'speaking-engagement', label: 'Speaking engagement' },
    { value: 'teaching-workshop', label: 'Teaching or workshop' },
    { value: 'interview-media', label: 'Interview or media appearance' },
    { value: 'faith-collaboration', label: 'Faith-based collaboration' },
    { value: 'business-partnership', label: 'Business or partnership inquiry' },
    { value: 'general-inquiry', label: 'General inquiry' },
  ],
  contactFor: {
    title: 'Contact for',
    items: [
      'Motivational speaking engagements and live/virtual events',
      'Educational teaching sessions and workshops',
      'Faith-based video collaborations and media opportunities',
      'Interviews and partnership inquiries',
    ],
  },
  bestWay: {
    title: 'Best Way to Reach Out',
    description:
      'Send a brief email with your name, organization, event or project details, and the kind of opportunity you have in mind. The Divine Get Down can then follow up directly with next steps.',
    emailButton: 'Email Now',
    channelButton: 'View Channel',
  },
  form: {
    submissionFailure: 'Inquiry submission failed.',
    confirmationTitle: 'Thank you. Your inquiry has been received.',
    confirmationDescription:
      'The Divine Get Down will review your message and follow up using the email address you provided.',
    confirmationEmailPrefix: 'Need to add context? Email ',
    confirmationEmailSuffix: '.',
    sendAnotherButton: 'Send Another Inquiry',
    title: 'Send an Inquiry',
    guidance:
      'Use this form for business, speaking, teaching, media, and faith-based collaboration inquiries.',
    requiredPrefix: 'Fields marked ',
    requiredSuffix: ' are required.',
    honeypotLabel: 'Leave this field blank',
    fields: {
      name: 'Name',
      email: 'Email',
      organization: 'Organization (optional)',
      inquiryType: 'Inquiry type',
      inquiryTypePlaceholder: 'Select an inquiry type',
      message: 'Message',
      messageHelp:
        'Share the event, project, timing, and response details needed for follow-up.',
    },
    privacy:
      'Please do not include payment information, passwords, medical details, or highly sensitive spiritual disclosures. Your information will be used only to review and respond to this inquiry.',
    submitButton: 'Send Inquiry',
    submittingButton: 'Sending...',
    statuses: {
      invalid: 'Please complete each required field before sending your inquiry.',
      error:
        'We could not send your inquiry. Please try again, or use the email address above.',
      submitting: 'Sending your inquiry...',
    },
  },
};
