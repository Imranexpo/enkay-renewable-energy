import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/solarData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSystemNote?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialSystemNote = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'residential',
    pincode: '',
    notes: initialSystemNote,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-[#0f172a]/10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-lg text-[#414845] hover:bg-[#eaedff] transition-colors"
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {!submitted ? (
          <>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#febf33]/20 text-[#7b5800] text-[11px] font-bold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-[14px]">solar_power</span>
                Official Site Feasibility Survey
              </div>
              <h3 className="font-['Space Grotesk'] text-[24px] font-bold text-[#002217] tracking-tight">
                Request a Site Survey & Quote
              </h3>
              <p className="font-['Manrope'] text-[13px] text-[#414845] mt-1">
                ENKAY engineering specialists evaluate your rooftop irradiance, shadow profile, and switchboard capacity.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-[#131b2e] mb-1 font-['Manrope']">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#c1c8c3] focus:border-[#002217] focus:ring-2 focus:ring-[#002217]/20 outline-none text-[14px]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#131b2e] mb-1 font-['Manrope']">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9876543210"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c1c8c3] focus:border-[#002217] focus:ring-2 focus:ring-[#002217]/20 outline-none text-[14px]"
                  />
                  <span className="text-[10px] text-[#414845]">10-digit number for survey dispatch</span>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#131b2e] mb-1 font-['Manrope']">
                    Pincode / City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="e.g. 600030 / Chennai"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c1c8c3] focus:border-[#002217] focus:ring-2 focus:ring-[#002217]/20 outline-none text-[14px]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#131b2e] mb-1 font-['Manrope']">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c1c8c3] focus:border-[#002217] focus:ring-2 focus:ring-[#002217]/20 outline-none text-[14px]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-[#131b2e] mb-1 font-['Manrope']">
                    System Category *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c1c8c3] focus:border-[#002217] focus:ring-2 focus:ring-[#002217]/20 outline-none text-[14px] bg-white cursor-pointer"
                  >
                    <option value="residential">Residential Solar (3 - 15 kW)</option>
                    <option value="commercial">Commercial Rooftop (20 - 250 kW)</option>
                    <option value="industrial">Industrial Megawatt (250 kW+)</option>
                    <option value="advisory">Solar Advisory & Technical Audit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#131b2e] mb-1 font-['Manrope']">
                  Site Irradiance & Roof Details
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Mention available shadow-free area (sq.ft), monthly electricity bill in INR, or property location in Tamil Nadu..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#c1c8c3] focus:border-[#002217] focus:ring-2 focus:ring-[#002217]/20 outline-none text-[14px]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#002217] hover:bg-[#0e382b] text-white font-['Manrope'] text-[15px] font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                      <span>Processing Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Survey Inquiry</span>
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-[#414845] text-center">
                Direct hotline: <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="font-bold text-[#002217] hover:underline">{COMPANY_INFO.phone}</a> | {COMPANY_INFO.operatingHours}
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#c0ecd9] text-[#002217] flex items-center justify-center mb-4 shadow-sm">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 className="font-['Space Grotesk'] text-[24px] font-bold text-[#002217] mb-2">
              Inquiry Successfully Submitted!
            </h3>
            <p className="font-['Manrope'] text-[14px] text-[#414845] leading-relaxed max-w-sm mb-6">
              Thank you, <strong>{formData.name}</strong>. Our Chennai clean energy engineering team has logged your site feasibility assessment. An engineer will reach out via phone ({formData.phone}) within 2 business hours.
            </p>
            <div className="p-4 bg-[#f2f3ff] rounded-xl text-left w-full text-[13px] text-[#414845] mb-6">
              <div className="font-semibold text-[#002217] mb-1">Direct Verification Summary:</div>
              <div>• Category: {formData.type.toUpperCase()}</div>
              <div>• Target Location: {formData.pincode}</div>
              <div>• Official Dispatch Email: {COMPANY_INFO.email}</div>
            </div>
            <button
              onClick={handleReset}
              className="py-3 px-8 rounded-xl bg-[#febf33] text-[#6e4f00] font-['Manrope'] text-[14px] font-bold hover:bg-[#ffdea5] transition-all cursor-pointer shadow-sm"
            >
              Back to Exploration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
