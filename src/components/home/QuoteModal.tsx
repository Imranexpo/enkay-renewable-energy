import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { COMPANY_INFO } from '../../data/solarData';

interface QuoteModalProps {
  open: boolean;
  topic?: string;
  onClose: () => void;
}

/** Quote request dialog — composes an email to the company inbox (the project has no backend). */
export default function QuoteModal({ open, topic = '', onClose }: QuoteModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!open) return;
    setMessage(topic ? `I am interested in: ${topic}.` : '');
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, topic, onClose]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Solar quote request');
    const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\n${message}`);
    window.location.href = `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <div className="hp-modal-back" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="hp-modal" role="dialog" aria-modal="true" aria-labelledby="hp-quote-title">
        <button className="hp-modal-x" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <h3 id="hp-quote-title">Get a Quote</h3>
        <p>Tell us about your requirement and our team will get back to you. Or call {COMPANY_INFO.phone}.</p>
        <form className="hp-form" onSubmit={submit}>
          <label>Name<input required value={name} onChange={e => setName(e.target.value)} autoComplete="name" /></label>
          <label>Phone<input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" /></label>
          <label>Requirement<textarea required value={message} onChange={e => setMessage(e.target.value)} /></label>
          <button type="submit" className="hp-btn hp-btn-yellow">Send Request</button>
        </form>
      </div>
    </div>
  );
}
