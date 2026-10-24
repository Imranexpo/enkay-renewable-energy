import { supabase } from './supabase';
import type { ContactValues } from '../components/contact/contactLogic';
import type { QuoteValues } from '../components/quote/quoteLogic';

export type EnquiryStatus = 'new' | 'contacted' | 'closed';
export const ENQUIRY_STATUSES: EnquiryStatus[] = ['new', 'contacted', 'closed'];

export interface QuoteRequest {
  id: number;
  created_at: string;
  source: 'quote_page' | 'quote_modal';
  name: string;
  email: string | null;
  phone: string;
  project_type: 'residential' | 'commercial' | null;
  capacity: string | null;
  location: string | null;
  bill: string | null;
  details: string | null;
  status: EnquiryStatus;
}

export interface ContactMessage {
  id: number;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
}

export type EnquiryTable = 'quote_requests' | 'contact_messages';

const orNull = (v: string) => v.trim() || null;

// Inserts are write-only for visitors (RLS blocks reading back), so no .select() after insert.
export async function submitQuote(v: QuoteValues) {
  const { error } = await supabase.from('quote_requests').insert({
    source: 'quote_page',
    name: v.name.trim(),
    email: orNull(v.email),
    phone: v.phone.trim(),
    project_type: v.projectType,
    capacity: orNull(v.capacity),
    location: orNull(v.location),
    bill: orNull(v.bill),
    details: orNull(v.details),
  });
  if (error) throw error;
}

export async function submitQuickQuote(v: { name: string; phone: string; message: string }) {
  const { error } = await supabase.from('quote_requests').insert({
    source: 'quote_modal',
    name: v.name.trim(),
    phone: v.phone.trim(),
    details: orNull(v.message),
  });
  if (error) throw error;
}

export async function submitContact(v: ContactValues) {
  const { error } = await supabase.from('contact_messages').insert({
    name: v.name.trim(),
    email: v.email.trim(),
    phone: v.phone.trim(),
    subject: v.subject,
    message: v.message.trim(),
  });
  if (error) throw error;
}

export async function listEnquiries<T>(table: EnquiryTable): Promise<T[]> {
  const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false }).limit(1000);
  if (error) throw error;
  return data as T[];
}

export async function setEnquiryStatus(table: EnquiryTable, id: number, status: EnquiryStatus) {
  const { error } = await supabase.from(table).update({ status }).eq('id', id);
  if (error) throw error;
}

export async function deleteEnquiry(table: EnquiryTable, id: number) {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}
