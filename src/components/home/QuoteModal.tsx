import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { COMPANY_INFO } from '../../data/solarData';
import { submitQuickQuote } from '../../lib/enquiries';

interface QuoteModalProps {
  open: boolean;
  topic?: string;
  onClose: () => void;
}

/** Quick quote request dialog — saved to Supabase (quote_requests, source "quote_modal"). */
export default function QuoteModal({ open, topic = '', onClose }: QuoteModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<'sent' | 'failed' | null>(null);

  useEffect(() => {
    if (!open) return;
    setMessage(topic ? `I am interested in: ${topic}.` : '');
    setResult(null);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, topic, onClose]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      await submitQuickQuote({ name, phone, message });
      setName(''); setPhone(''); setMessage('');
      setResult('sent');
    } catch (ex) {
      console.error('Quick quote submit failed', ex);
      setResult('failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="hp-modal-back" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="hp-modal" role="dialog" aria-modal="true" aria-labelledby="hp-quote-title">
        <button className="hp-modal-x" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <h3 id="hp-quote-title">Get a Quote</h3>
        {result === 'sent' ? (
          <>
            <p role="status">Thank you! Your request has been received — our team will call you shortly.</p>
            <button type="button" className="hp-btn hp-btn-yellow" style={{ marginTop: 20 }} onClick={onClose}>Close</button>
          </>
        ) : (
          <>
            <p>Tell us about your requirement and our team will get back to you. Or call {COMPANY_INFO.phone}.</p>
            <form className="hp-form" onSubmit={submit}>
              <label>Name<input required minLength={2} maxLength={120} value={name} onChange={e => setName(e.target.value)} autoComplete="name" /></label>
              <label>Phone<input required type="tel" minLength={6} maxLength={30} value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" /></label>
              <label>Requirement<textarea required maxLength={2000} value={message} onChange={e => setMessage(e.target.value)} /></label>
              {result === 'failed' && <p role="alert" style={{ color: '#b42318', fontSize: 14 }}>Sorry, we couldn't send your request. Please try again or call {COMPANY_INFO.phone}.</p>}
              <button type="submit" className="hp-btn hp-btn-yellow" disabled={busy}>{busy ? 'Sending…' : 'Send Request'}</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
