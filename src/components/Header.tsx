import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/solarData';
import { NavPage } from '../types';

interface HeaderProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage, sectionId?: string) => void;
  onOpenQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: NavPage, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigate(page, sectionId);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf8ff]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#0f172a]/5 transition-all">
        {/* Top Info Bar */}
        <div className="hidden md:block bg-[#002217] text-white py-2 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-[12px] font-semibold">
            <div className="flex items-center gap-6">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center gap-1.5 hover:text-[#ffdea5] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-1.5 hover:text-[#ffdea5] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">mail</span>
                <span>{COMPANY_INFO.email}</span>
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-white/90">
              <span className="material-symbols-outlined text-[16px] text-[#ffdea5]">location_on</span>
              <span>{COMPANY_INFO.city}</span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <img
              src={COMPANY_INFO.logoUrl}
              alt="ENKAY Renewables Logo"
              className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-['Space Grotesk'] text-[24px] font-bold tracking-tight text-[#002217] leading-none">
                ENKAY
              </span>
              <span className="font-['Manrope'] text-[10px] font-bold uppercase tracking-widest text-[#414845] mt-0.5">
                Renewables Energy
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 font-['Manrope'] text-[14px] font-semibold rounded-lg transition-all ${
                currentPage === 'home'
                  ? 'text-[#002217] font-bold bg-[#eaedff]'
                  : 'text-[#414845] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('home', 'about')}
              className="px-3.5 py-2 font-['Manrope'] text-[14px] font-semibold text-[#414845] hover:text-[#131b2e] hover:bg-[#f2f3ff] rounded-lg transition-all"
            >
              About
            </button>

            <button
              onClick={() => handleNavClick('home', 'solutions')}
              className="px-3.5 py-2 font-['Manrope'] text-[14px] font-semibold text-[#414845] hover:text-[#131b2e] hover:bg-[#f2f3ff] rounded-lg transition-all"
            >
              Solutions
            </button>

            <button
              onClick={() => handleNavClick('savings-calculator')}
              className={`px-3.5 py-2 font-['Manrope'] text-[14px] font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                currentPage === 'savings-calculator'
                  ? 'text-[#002217] font-bold bg-[#eaedff]'
                  : 'text-[#414845] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              <span className="material-symbols-outlined text-[17px] text-[#7b5800]">calculate</span>
              Solar Calculator
            </button>

            <button
              onClick={() => handleNavClick('home', 'why-choose-us')}
              className="px-3.5 py-2 font-['Manrope'] text-[14px] font-semibold text-[#414845] hover:text-[#131b2e] hover:bg-[#f2f3ff] rounded-lg transition-all"
            >
              Why Choose Us
            </button>

            <button
              onClick={() => handleNavClick('home', 'projects-showcase')}
              className="px-3.5 py-2 font-['Manrope'] text-[14px] font-semibold text-[#414845] hover:text-[#131b2e] hover:bg-[#f2f3ff] rounded-lg transition-all"
            >
              Projects Showcase
            </button>

            <button
              onClick={() => handleNavClick('home', 'contact')}
              className="px-3.5 py-2 font-['Manrope'] text-[14px] font-semibold text-[#414845] hover:text-[#131b2e] hover:bg-[#f2f3ff] rounded-lg transition-all"
            >
              Contact
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenQuote}
              className="hidden sm:inline-flex items-center justify-center bg-[#febf33] text-[#6e4f00] font-['Manrope'] text-[14px] font-bold px-5 py-2.5 rounded-xl hover:bg-[#ffdea5] transition-all shadow-[0_2px_4px_rgba(14,56,43,0.06)] hover:shadow-md cursor-pointer"
            >
              Get a Quote
            </button>

            <div
              title="ENKAY Technical Consultation Desk"
              className="w-9 h-9 rounded-full bg-[#002217] flex items-center justify-center text-white cursor-pointer hover:bg-[#0e382b] transition-colors"
              onClick={onOpenQuote}
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>

            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              aria-label="Toggle Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#131b2e] hover:bg-[#eaedff] transition-colors"
            >
              <span className="material-symbols-outlined text-[26px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col p-6 lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <img src={COMPANY_INFO.logoUrl} alt="ENKAY" className="h-7 w-auto" />
            <span className="font-['Space Grotesk'] text-[20px] font-bold text-[#002217]">ENKAY</span>
          </div>
          <button
            type="button"
            aria-label="Close Menu"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg text-[#131b2e] hover:bg-[#f2f3ff]"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <nav className="flex flex-col gap-1.5 mt-6">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-3 rounded-lg font-['Manrope'] text-[15px] font-semibold transition-colors ${
              currentPage === 'home'
                ? 'bg-[#eaedff] text-[#002217] font-bold'
                : 'text-[#414845] hover:bg-[#f2f3ff]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('home', 'about')}
            className="w-full text-left px-4 py-3 rounded-lg font-['Manrope'] text-[15px] font-semibold text-[#414845] hover:bg-[#f2f3ff]"
          >
            About Corporate
          </button>
          <button
            onClick={() => handleNavClick('home', 'solutions')}
            className="w-full text-left px-4 py-3 rounded-lg font-['Manrope'] text-[15px] font-semibold text-[#414845] hover:bg-[#f2f3ff]"
          >
            Energy Solutions
          </button>
          <button
            onClick={() => handleNavClick('savings-calculator')}
            className={`w-full text-left px-4 py-3 rounded-lg font-['Manrope'] text-[15px] font-semibold transition-colors flex items-center justify-between ${
              currentPage === 'savings-calculator'
                ? 'bg-[#eaedff] text-[#002217] font-bold'
                : 'text-[#414845] hover:bg-[#f2f3ff]'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#7b5800]">calculate</span>
              Solar Calculator
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-[#febf33] text-[#6e4f00] rounded">
              Interactive
            </span>
          </button>
          <button
            onClick={() => handleNavClick('home', 'why-choose-us')}
            className="w-full text-left px-4 py-3 rounded-lg font-['Manrope'] text-[15px] font-semibold text-[#414845] hover:bg-[#f2f3ff]"
          >
            Why Choose Us
          </button>
          <button
            onClick={() => handleNavClick('home', 'projects-showcase')}
            className="w-full text-left px-4 py-3 rounded-lg font-['Manrope'] text-[15px] font-semibold text-[#414845] hover:bg-[#f2f3ff]"
          >
            Projects Showcase
          </button>
          <button
            onClick={() => handleNavClick('home', 'contact')}
            className="w-full text-left px-4 py-3 rounded-lg font-['Manrope'] text-[15px] font-semibold text-[#414845] hover:bg-[#f2f3ff]"
          >
            Contact & Inquiries
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-[#eaedff] flex flex-col gap-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuote();
            }}
            className="w-full py-3.5 text-center bg-[#febf33] text-[#6e4f00] font-['Manrope'] text-[15px] font-bold rounded-xl shadow-md hover:bg-[#ffdea5]"
          >
            Get a Quote / Free Survey
          </button>
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#002217] text-white font-['Manrope'] text-[14px] font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>{COMPANY_INFO.phone}</span>
          </a>
        </div>
      </div>
    </>
  );
};
