export interface ContactValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

/** Options for the "Select a subject" dropdown (the design shows only the placeholder). */
export const CONTACT_SUBJECTS = [
  'Solar quote request',
  'Residential solar',
  'Commercial / industrial solar',
  'Products & brands',
  'Service & support',
  'Other',
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: ContactValues): ContactErrors {
  const e: ContactErrors = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';

  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email, e.g. you@example.com.';

  const phone = v.phone.trim();
  const digits = phone.replace(/\D/g, '');
  if (!phone) e.phone = 'Please enter your phone number.';
  else if (!/^[+\d][\d\s()-]*$/.test(phone) || digits.length < 10 || digits.length > 13) e.phone = 'Enter a valid phone number (10–13 digits).';

  if (!v.subject) e.subject = 'Please select a subject.';

  if (v.message.trim().length < 10) e.message = 'Please write a message of at least 10 characters.';
  return e;
}

export const isValidEmail = (v: string) => EMAIL_RE.test(v.trim());

export function isValidPhone(v: string) {
  const phone = v.trim();
  const digits = phone.replace(/\D/g, '');
  return /^[+\d][\d\s()-]*$/.test(phone) && digits.length >= 10 && digits.length <= 13;
}
