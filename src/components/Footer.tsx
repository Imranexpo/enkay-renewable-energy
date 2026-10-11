import React from 'react';
import { COMPANY_INFO } from '../data/solarData';
import { NavPage } from '../types';

interface FooterProps {
  onNavigate: (page: NavPage, sectionId?: string) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuote }) => {
  return (
    <footer className="w-full bg-[#002217] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src={COMPANY_INFO.logoUrl}
                alt="ENKAY Renewables Logo"
                className="h-8 w-auto object-contain bg-white p-1 rounded"
              />
              <span className="font-['Space Grotesk'] text-[24px] font-bold tracking-tight text-white">
                ENKAY
              </span>
            </div>
            <p className="font-['Manrope'] text-[13px] text-[#a5d0bd] leading-relaxed">
              Pioneering industrial and utility-scale solar generation infrastructure in Tamil Nadu. Engineered for enduring reliability and high-yield returns.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="font-['Manrope'] text-[11px] font-semibold px-2.5 py-1 bg-[#0e382b] text-[#c0ecd9] rounded-md border border-[#c0ecd9]/10">
                Sustainability
              </span>
              <span className="font-['Manrope'] text-[11px] font-semibold px-2.5 py-1 bg-[#0e382b] text-[#c0ecd9] rounded-md border border-[#c0ecd9]/10">
                Reliability
              </span>
              <span className="font-['Manrope'] text-[11px] font-semibold px-2.5 py-1 bg-[#0e382b] text-[#c0ecd9] rounded-md border border-[#c0ecd9]/10">
                Progress
              </span>
              <span className="font-['Manrope'] text-[11px] font-semibold px-2.5 py-1 bg-[#0e382b] text-[#c0ecd9] rounded-md border border-[#c0ecd9]/10">
                Clean Energy
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="font-['Space Grotesk'] text-[18px] font-semibold text-white tracking-tight">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2.5 font-['Manrope'] text-[14px] text-[#a5d0bd]">
              <button
                onClick={() => onNavigate('home')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('home', 'about')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                About Corporate
              </button>
              <button
                onClick={() => onNavigate('home', 'solutions')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Energy Solutions
              </button>
              <button
                onClick={() => onNavigate('savings-calculator')}
                className="text-left font-bold text-[#ffdea5] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Savings Calculator</span>
                <span className="text-[9px] bg-[#febf33] text-[#6e4f00] px-1.5 py-0.5 rounded uppercase font-bold">
                  ROI Tool
                </span>
              </button>
              <button
                onClick={() => onNavigate('home', 'why-choose-us')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Why Choose Us
              </button>
              <button
                onClick={() => onNavigate('home', 'projects-showcase')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Projects Showcase
              </button>
              <button
                onClick={() => onNavigate('home', 'contact')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Contact & Inquiries
              </button>
            </nav>
          </div>

          {/* Registered Office */}
          <div className="flex flex-col gap-4">
            <h4 className="font-['Space Grotesk'] text-[18px] font-semibold text-white tracking-tight">
              Registered Office
            </h4>
            <div className="flex items-start gap-3 font-['Manrope'] text-[13px] text-[#a5d0bd] leading-relaxed">
              <span className="material-symbols-outlined text-[20px] text-[#ffdea5] shrink-0 mt-0.5">
                location_on
              </span>
              <span>
                {COMPANY_INFO.address}
              </span>
            </div>
            <div className="flex items-center gap-3 font-['Manrope'] text-[13px] text-[#a5d0bd]">
              <span className="material-symbols-outlined text-[18px] text-[#ffdea5] shrink-0">
                call
              </span>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="hover:text-white transition-colors"
              >
                {COMPANY_INFO.phone}
              </a>
            </div>
            <div className="flex items-center gap-3 font-['Manrope'] text-[13px] text-[#a5d0bd] break-all">
              <span className="material-symbols-outlined text-[18px] text-[#ffdea5] shrink-0">
                mail
              </span>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="hover:text-white transition-colors"
              >
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>

          {/* Consultation Desk */}
          <div className="flex flex-col gap-4">
            <h4 className="font-['Space Grotesk'] text-[18px] font-semibold text-white tracking-tight">
              Consultation Desk
            </h4>
            <p className="font-['Manrope'] text-[13px] text-[#a5d0bd] leading-relaxed">
              Connect directly with our engineering consultants to evaluate on-grid, off-grid, and rooftop solar installations.
            </p>
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center bg-[#febf33] text-[#6e4f00] font-['Manrope'] text-[14px] font-bold px-4 py-2.5 rounded-xl hover:bg-[#ffdea5] transition-all shadow-[0_2px_4px_rgba(14,56,43,0.06)] cursor-pointer mt-1"
            >
              Request Site Survey
            </button>
            <div className="text-[11px] text-[#a5d0bd]/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4edea3]"></span>
              <span>Available Mon - Sat (9:00 AM – 6:30 PM)</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-['Manrope'] text-[13px] text-[#a5d0bd]">
          <p>© 2025 ENKAY Renewables Energy. All rights reserved.</p>
          <p className="text-[11px] text-[#a5d0bd]/70 text-center md:text-right max-w-xl">
            Disclaimer: Service scopes, asset capacities, and projects represent proposed categories pending client verification.
          </p>
        </div>
      </div>
    </footer>
  );
};
