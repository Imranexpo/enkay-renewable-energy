import { isValidEmail, isValidPhone } from '../contact/contactLogic';

export type QuoteProjectType = 'residential' | 'commercial';

export interface QuoteValues {
  name: string;
  email: string;
  phone: string;
  projectType: QuoteProjectType;
  capacity: string;
  location: string;
  bill: string;
  details: string;
}

export type QuoteErrors = Partial<Record<keyof QuoteValues, string>>;

export const EMPTY_QUOTE: QuoteValues = {
  name: '', email: '', phone: '', projectType: 'residential', capacity: '', location: '', bill: '', details: '',
};

export function validateQuote(v: QuoteValues): QuoteErrors {
  const e: QuoteErrors = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';

  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!isValidEmail(v.email)) e.email = 'Enter a valid email, e.g. you@example.com.';

  if (!v.phone.trim()) e.phone = 'Please enter your phone number.';
  else if (!isValidPhone(v.phone)) e.phone = 'Enter a valid phone number (10–13 digits).';

  if (v.location.trim().length < 3) e.location = 'Please enter the installation address or area.';
  if (v.capacity.length > 60) e.capacity = 'Please keep this under 60 characters.';
  if (v.bill.length > 100) e.bill = 'Please keep this under 100 characters.';
  if (v.details.length > 2000) e.details = 'Please keep this under 2,000 characters.';
  return e;
}

export function quoteEmailBody(v: QuoteValues): string {
  return [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    `Phone: ${v.phone}`,
    `Project type: ${v.projectType === 'residential' ? 'Residential' : 'Commercial'}`,
    `Solar system capacity: ${v.capacity || 'Not specified'}`,
    `Location of installation: ${v.location}`,
    `Monthly electricity bill / energy requirement: ${v.bill || 'Not specified'}`,
    '',
    'Additional details:',
    v.details || 'None',
  ].join('\n');
}
