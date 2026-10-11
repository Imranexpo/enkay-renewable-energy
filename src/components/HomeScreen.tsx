import React, { useState } from 'react';
import { COMPANY_INFO, PROJECTS } from '../data/solarData';
import { NavPage, ProjectItem } from '../types';

interface HomeScreenProps {
  onNavigate: (page: NavPage, sectionId?: string) => void;
  onOpenQuote: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onOpenQuote,
  onSelectProject,
}) => {
  // 1. In-page Preliminary Estimator state
  const [billValue, setBillValue] = useState<number>(15000);

  // Math for preview estimator
  // Average unit cost ~8 INR/kWh, 1 kW generates approx 120 kWh/month
  const kwRequired = (billValue / 960);
  const kwFormatted = kwRequired.toFixed(1);
  const sqftRequired = Math.round(kwRequired * 100);
  const carbonOffset = (kwRequired * 1.18).toFixed(1);

  // 2. Portfolio Showcase Filter state
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'industrial' | 'commercial' | 'residential'>('all');

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  // 3. Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    category: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
      setContactForm({
        name: '',
        phone: '',
        email: '',
        category: '',
        message: '',
      });
    }, 700);
  };

  return (
    <div className="flex flex-col w-full bg-[#faf8ff]">
      {/* ============================================================== */}
      {/* 1. HERO SECTION                                                */}
      {/* ============================================================== */}
      <section className="relative w-full -mt-20 overflow-hidden bg-[#002217] text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={COMPANY_INFO.heroBannerUrl}
            alt="ENKAY Utility Scale Solar Installation"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002217]/95 via-[#002217]/80 to-[#002217]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#002217] via-transparent to-[#002217]/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-36 pb-20 md:pt-44 md:pb-28 min-h-[640px] flex flex-col justify-between">
          <div className="max-w-3xl flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#febf33]/20 backdrop-blur-md border border-[#febf33]/30">
              <span className="w-2 h-2 rounded-full bg-[#febf33] animate-pulse"></span>
              <span className="font-['Manrope'] text-[11px] font-bold uppercase tracking-wider text-[#ffdea5]">
                Clean Power Infrastructure • Tamil Nadu
              </span>
            </div>

            <h1 className="font-['Space Grotesk'] text-[38px] sm:text-[52px] md:text-[64px] font-bold text-white tracking-tight leading-[1.1]">
              Powering Today.<br />
              <span className="text-[#ffdea5]">Sustaining Tomorrow.</span>
            </h1>

            <p className="font-['Manrope'] text-[16px] sm:text-[18px] text-[#a5d0bd] max-w-2xl leading-relaxed">
              Explore smarter energy solutions for a cleaner, more sustainable future. High-performance photovoltaic infrastructure engineered for industrial endurance and commercial viability.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#solutions"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#febf33] text-[#6e4f00] font-['Manrope'] text-[14px] font-bold shadow-lg hover:bg-[#ffdea5] transition-all duration-200 cursor-pointer"
              >
                <span>Explore Our Solutions</span>
                <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
              </a>

              <button
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm text-white font-['Manrope'] text-[14px] font-bold hover:bg-white/20 transition-all duration-200 cursor-pointer border border-white/15"
              >
                <span>Get a Quote</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                onClick={() => onNavigate('savings-calculator')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0e382b] text-[#c0ecd9] font-['Manrope'] text-[14px] font-bold hover:bg-[#1a4e3e] transition-all duration-200 cursor-pointer border border-[#c0ecd9]/20"
              >
                <span className="material-symbols-outlined text-[18px] text-[#febf33]">calculate</span>
                <span>Open Solar ROI Calculator</span>
              </button>
            </div>
          </div>

          {/* Trust stats / metrics strip */}
          <div className="mt-16 pt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#003925] flex items-center justify-center text-[#6ffbbe] shrink-0 border border-[#6ffbbe]/20">
                  <span className="material-symbols-outlined text-[24px]">energy_savings_leaf</span>
                </div>
                <div>
                  <div className="font-['Space Grotesk'] text-[20px] font-semibold text-white">Zero-Carbon</div>
                  <div className="font-['Manrope'] text-[12px] font-semibold text-[#a5d0bd]">Footprint Vision Architecture</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#003925] flex items-center justify-center text-[#6ffbbe] shrink-0 border border-[#6ffbbe]/20">
                  <span className="material-symbols-outlined text-[24px]">map</span>
                </div>
                <div>
                  <div className="font-['Space Grotesk'] text-[20px] font-semibold text-white">Tamil Nadu • Pan-India</div>
                  <div className="font-['Manrope'] text-[12px] font-semibold text-[#a5d0bd]">Comprehensive Engineering Reach</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#003925] flex items-center justify-center text-[#6ffbbe] shrink-0 border border-[#6ffbbe]/20">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <div>
                  <div className="font-['Space Grotesk'] text-[20px] font-semibold text-white">Tier-1 Components</div>
                  <div className="font-['Manrope'] text-[12px] font-semibold text-[#a5d0bd]">Industrial Photovoltaic Standards</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. ABOUT SECTION                                               */}
      {/* ============================================================== */}
      <section className="w-full py-20 md:py-28 bg-[#faf8ff]" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-[#eaedff]">
                <img
                  src={COMPANY_INFO.aboutBannerUrl}
                  alt="ENKAY Sustainable Residential and Commercial Architecture"
                  className="w-full h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002217]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#faf8ff]/95 backdrop-blur-md shadow-md text-[#131b2e]">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#7b5800] text-[28px]">solar_power</span>
                    <div>
                      <h4 className="font-['Space Grotesk'] text-[18px] font-semibold text-[#002217]">Regional Focus</h4>
                      <p className="font-['Manrope'] text-[12px] text-[#414845]">Deploying decentralized clean energy across Tamil Nadu</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Pattern Badge */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-[#002217] text-white px-5 py-3 rounded-xl shadow-xl flex-col items-center border border-white/10">
                <span className="font-['Space Grotesk'] text-[28px] font-bold text-[#ffdea5] leading-none">25+</span>
                <span className="font-['Manrope'] text-[10px] font-bold uppercase tracking-wider text-[#a5d0bd] mt-1">Year Module Life</span>
              </div>
            </div>

            {/* Editorial Content Column */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 text-[#7b5800] font-['Manrope'] text-[12px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7b5800]"></span>
                About Corporate
              </div>

              <h2 className="font-['Space Grotesk'] text-[30px] sm:text-[38px] text-[#002217] tracking-tight font-bold leading-tight">
                Pioneering Clean Power with Technical Integrity
              </h2>

              <p className="font-['Manrope'] text-[16px] text-[#414845] leading-relaxed">
                ENKAY Renewables Energy is an engineering-driven clean energy consultancy and systems provider established in Chennai. We structure resilient solar generation assets customized for residences, institutional complexes, and industrial production facilities throughout Tamil Nadu.
              </p>

              {/* Core Values */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-xl bg-white shadow-sm border border-[#eaedff] flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#0e382b] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">wb_sunny</span>
                  </div>
                  <h3 className="font-['Space Grotesk'] text-[18px] font-semibold text-[#002217] pt-1">Solar Power</h3>
                  <p className="font-['Manrope'] text-[12px] text-[#414845] leading-relaxed">
                    Harnessing clean solar irradiance with advanced, high-yield photovoltaic arrays tailored to local shading and geography.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white shadow-sm border border-[#eaedff] flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#0e382b] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">trending_up</span>
                  </div>
                  <h3 className="font-['Space Grotesk'] text-[18px] font-semibold text-[#002217] pt-1">Progress</h3>
                  <p className="font-['Manrope'] text-[12px] text-[#414845] leading-relaxed">
                    Continual adoption of next-generation renewable technology, bifacial PV modules, and smart string inverter architecture.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white shadow-sm border border-[#eaedff] flex flex-col gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[#0e382b] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  </div>
                  <h3 className="font-['Space Grotesk'] text-[18px] font-semibold text-[#002217] pt-1">Reliability</h3>
                  <p className="font-['Manrope'] text-[12px] text-[#414845] leading-relaxed">
                    Uncompromising durability and continuous performance monitoring across structural mounts and electrical distribution.
                  </p>
                </div>
              </div>

              {/* Strictly Factual Verification Notice */}
              <div className="mt-2 p-4 rounded-xl bg-[#e2e7ff]/60 border border-[#c1c8c3]/30 flex items-start gap-3">
                <span className="material-symbols-outlined text-[#414845] text-[20px] shrink-0 mt-0.5">info</span>
                <p className="font-['Manrope'] text-[12px] text-[#414845] leading-relaxed">
                  <strong className="font-semibold text-[#131b2e]">Factual Verification Notice:</strong> Established in Chennai, Tamil Nadu. Detailed historical milestones, verified operational track records, and formal statutory certifications will be updated upon client verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. RENEWABLE ENERGY SOLUTIONS                                  */}
      {/* ============================================================== */}
      <section className="w-full py-20 md:py-28 bg-[#f2f3ff]" id="solutions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[#7b5800] font-['Manrope'] text-[12px] font-bold uppercase tracking-wider mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7b5800]"></span>
                Comprehensive Generation Systems
              </div>
              <h2 className="font-['Space Grotesk'] text-[32px] md:text-[38px] text-[#002217] tracking-tight font-bold">
                Proposed Service Categories
              </h2>
              <p className="font-['Manrope'] text-[16px] text-[#414845] mt-2">
                Customizable for your site requirements, electrical load characteristics, and structural constraints.
              </p>
            </div>
            <div className="px-4 py-2 rounded-lg bg-[#dae2fd] text-[#131b2e] font-['Manrope'] text-[11px] font-bold uppercase tracking-wide self-start md:self-auto">
              Tailored System Architecture
            </div>
          </div>

          {/* Solutions Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Solar Energy Solutions */}
            <div
              onClick={() => onOpenQuote()}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group border border-[#eaedff] cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0e382b] text-white flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[24px]">solar_power</span>
                </div>
                <div className="font-['Manrope'] text-[11px] text-[#7b5800] uppercase font-bold tracking-wider mb-1">
                  Architecture 01
                </div>
                <h3 className="font-['Space Grotesk'] text-[22px] font-semibold text-[#002217] mb-3">
                  Solar Energy Solutions
                </h3>
                <p className="font-['Manrope'] text-[14px] text-[#414845] leading-relaxed">
                  Comprehensive grid-tie, off-grid, and hybrid rooftop solutions designed to stabilize voltage variations and safeguard critical local operations.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#eaedff] flex items-center justify-between text-[#414845]">
                <span className="font-['Manrope'] text-[13px] font-semibold">On-Grid • Hybrid</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform text-[#7b5800]">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* 2. Residential Solar */}
            <div
              onClick={() => onOpenQuote()}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group border border-[#eaedff] cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0e382b] text-white flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[24px]">roofing</span>
                </div>
                <div className="font-['Manrope'] text-[11px] text-[#7b5800] uppercase font-bold tracking-wider mb-1">
                  Architecture 02
                </div>
                <h3 className="font-['Space Grotesk'] text-[22px] font-semibold text-[#002217] mb-3">
                  Residential Solar
                </h3>
                <p className="font-['Manrope'] text-[14px] text-[#414845] leading-relaxed">
                  Tailored rooftop installations for individual homes and villas. Dramatically offset high bi-monthly domestic utility tariffs with clean self-generation.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#eaedff] flex items-center justify-between text-[#414845]">
                <span className="font-['Manrope'] text-[13px] font-semibold">3 kW – 15 kW Systems</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform text-[#7b5800]">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* 3. Commercial Solar */}
            <div
              onClick={() => onOpenQuote()}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group border border-[#eaedff] cursor-pointer"
            >
              <div className="relative h-40 -mx-6 -mt-6 mb-6">
                <img
                  src={COMPANY_INFO.heroBannerUrl}
                  alt="Commercial Solar Rooftop Arrays"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#002217]/20"></div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#002217] px-2.5 py-1 rounded text-[11px] font-bold font-['Manrope']">
                  Commercial
                </div>
              </div>
              <div className="flex flex-col flex-1 px-6">
                <div className="font-['Manrope'] text-[11px] text-[#7b5800] uppercase font-bold tracking-wider mb-1">
                  Architecture 03
                </div>
                <h3 className="font-['Space Grotesk'] text-[22px] font-semibold text-[#002217] mb-3">
                  Commercial Solar
                </h3>
                <p className="font-['Manrope'] text-[14px] text-[#414845] leading-relaxed">
                  Optimized rooftop solar arrays for corporate office parks, institutions, schools, and healthcare hospitals to lower operational overheads.
                </p>
              </div>
              <div className="pt-6 mt-6 px-6 pb-6 border-t border-[#eaedff] flex items-center justify-between text-[#414845]">
                <span className="font-['Manrope'] text-[13px] font-semibold">20 kW – 250 kW Arrays</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform text-[#7b5800]">
                  arrow_forward
                </span>
              </div>
            </div>

            {/* 4. Industrial Solar */}
            <div
              onClick={() => onOpenQuote()}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group border border-[#eaedff] cursor-pointer"
            >
              <div className="relative h-40 -mx-6 -mt-6 mb-6">
                <img
                  src={COMPANY_INFO.industrialBannerUrl}
                  alt="Utility & Megawatt Industrial Solar Logistics Array"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#002217]/20"></div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#002217] px-2.5 py-1 rounded text-[11px] font-bold font-['Manrope']">
                  Megawatt Scale
                </div>
              </div>
              <div className="flex flex-col flex-1 px-6">
                <div className="font-['Manrope'] text-[11px] text-[#7b5800] uppercase font-bold tracking-wider mb-1">
                  Architecture 04
                </div>
                <h3 className="font-['Space Grotesk'] text-[22px] font-semibold text-[#002217] mb-3">
                  Industrial Solar
                </h3>
                <p className="font-['Manrope'] text-[14px] text-[#414845] leading-relaxed">
                  High-capacity megawatt-scale deployments engineered for heavy manufacturing units, logistics warehouses, and cold chain distribution centers.
                </p>
              </div>
              <div className="pt-6 mt-6 px-6 pb-6 border-t border-[#eaedff] flex items-center justify-between text-[#414845]">
                <span className="font-['Manrope'] text-[13px] font-semibold">250 kW+ High-Voltage</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform text-[#7b5800]">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Solar Savings & Capacity Estimator Slider Card */}
          <div className="mt-16 bg-white rounded-2xl p-6 md:p-10 shadow-md border border-[#eaedff]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 text-[#7b5800] font-['Manrope'] text-[11px] font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px]">calculate</span>
                  Preliminary Solar Sizing Estimator
                </div>

                <h3 className="font-['Space Grotesk'] text-[26px] md:text-[30px] text-[#002217] font-bold leading-tight">
                  Estimate Your Ideal Capacity & Carbon Offset
                </h3>

                <p className="font-['Manrope'] text-[14px] text-[#414845]">
                  Adjust the slider based on your monthly electricity bill to calculate typical system sizing, required rooftop surface, and annual clean emissions offset.
                </p>

                <div className="mt-2">
                  <div className="flex justify-between font-['Manrope'] text-[13px] text-[#131b2e] mb-2 font-semibold">
                    <span>Monthly Electricity Bill (INR)</span>
                    <span className="text-[#7b5800] font-bold font-['Space Grotesk'] text-[20px]">
                      ₹{billValue.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={3000}
                    max={150000}
                    step={1000}
                    value={billValue}
                    onChange={(e) => setBillValue(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#eaedff] rounded-lg appearance-none cursor-pointer accent-[#7b5800]"
                  />

                  <div className="flex justify-between text-[11px] text-[#414845] mt-1.5 font-['Manrope']">
                    <span>₹3,000 (Domestic)</span>
                    <span>₹75,000 (Commercial)</span>
                    <span>₹150,000+ (Industrial)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('savings-calculator')}
                    className="inline-flex items-center gap-2 text-[13px] font-bold text-[#002217] hover:text-[#7b5800] transition-colors"
                  >
                    <span>Need detailed TANGEDCO net-metering & PM Surya Ghar subsidy breakdown?</span>
                    <span className="material-symbols-outlined text-[16px]">east</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#f2f3ff] p-6 rounded-xl border border-[#eaedff]">
                {/* Metric 1: Capacity */}
                <div className="bg-white p-5 rounded-lg flex flex-col justify-between shadow-sm border border-[#eaedff]">
                  <div>
                    <span className="font-['Manrope'] text-[10px] uppercase font-bold text-[#414845] tracking-wider">
                      Suggested Capacity
                    </span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="font-['Space Grotesk'] text-[32px] text-[#002217] font-bold">
                        {kwFormatted}
                      </span>
                      <span className="font-['Manrope'] text-[14px] text-[#7b5800] font-bold">kWp</span>
                    </div>
                  </div>
                  <p className="font-['Manrope'] text-[12px] text-[#414845] mt-3">Calculated for standard daily sunlight yield</p>
                </div>

                {/* Metric 2: Rooftop Area */}
                <div className="bg-white p-5 rounded-lg flex flex-col justify-between shadow-sm border border-[#eaedff]">
                  <div>
                    <span className="font-['Manrope'] text-[10px] uppercase font-bold text-[#414845] tracking-wider">
                      Shadow-Free Area
                    </span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="font-['Space Grotesk'] text-[32px] text-[#002217] font-bold">
                        {sqftRequired.toLocaleString('en-IN')}
                      </span>
                      <span className="font-['Manrope'] text-[14px] text-[#7b5800] font-bold">sq.ft</span>
                    </div>
                  </div>
                  <p className="font-['Manrope'] text-[12px] text-[#414845] mt-3">Estimated panel surface footprint required</p>
                </div>

                {/* Metric 3: Carbon Offset */}
                <div className="bg-white p-5 rounded-lg flex flex-col justify-between shadow-sm border border-[#eaedff]">
                  <div>
                    <span className="font-['Manrope'] text-[10px] uppercase font-bold text-[#414845] tracking-wider">
                      Est. Carbon Offset
                    </span>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="font-['Space Grotesk'] text-[32px] text-[#002217] font-bold">
                        {carbonOffset}
                      </span>
                      <span className="font-['Manrope'] text-[14px] text-[#7b5800] font-bold">Tons/yr</span>
                    </div>
                  </div>
                  <p className="font-['Manrope'] text-[12px] text-[#414845] mt-3">Greenhouse gas emission avoidance per year</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. WHY CHOOSE ENKAY                                            */}
      {/* ============================================================== */}
      <section className="w-full py-20 md:py-28 bg-[#faf8ff]" id="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-3 mb-16">
            <div className="inline-flex items-center gap-2 text-[#7b5800] font-['Manrope'] text-[12px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7b5800]"></span>
              Engineering Rigor
            </div>
            <h2 className="font-['Space Grotesk'] text-[32px] md:text-[38px] text-[#002217] tracking-tight font-bold">
              Why Choose ENKAY Renewables Energy
            </h2>
            <p className="font-['Manrope'] text-[16px] text-[#414845] leading-relaxed">
              Grounding renewable installations in verifiable physics, high-efficiency equipment specifications, and durable structural design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-[#eaedff]">
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#003925] text-[#6ffbbe] flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[28px]">eco</span>
                </div>
                <h3 className="font-['Space Grotesk'] text-[22px] font-semibold text-[#002217] mb-3">
                  Sustainable Energy
                </h3>
                <p className="font-['Manrope'] text-[14px] text-[#414845] leading-relaxed">
                  Clean, zero-emission photovoltaic generation minimizing environmental footprint while reducing reliance on fossil-fuel utility grids.
                </p>
              </div>
              <div className="mt-8 pt-4 bg-[#f2f3ff]/60 -mx-8 -mb-8 p-4 rounded-b-2xl border-t border-[#eaedff]">
                <span className="font-['Manrope'] text-[10px] text-[#131b2e] font-bold uppercase tracking-wider">
                  Zero Tailpipe Emissions
                </span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-[#eaedff]">
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#0e382b] text-white flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[28px]">handshake</span>
                </div>
                <h3 className="font-['Space Grotesk'] text-[22px] font-semibold text-[#002217] mb-3">
                  Reliable Solutions
                </h3>
                <p className="font-['Manrope'] text-[14px] text-[#414845] leading-relaxed">
                  Built exclusively with Tier-1 modules, certified surge protection, and hot-dip galvanized mounting structures designed for high wind resilience.
                </p>
              </div>
              <div className="mt-8 pt-4 bg-[#f2f3ff]/60 -mx-8 -mb-8 p-4 rounded-b-2xl border-t border-[#eaedff]">
                <span className="font-['Manrope'] text-[10px] text-[#131b2e] font-bold uppercase tracking-wider">
                  Climatic Durability
                </span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-[#eaedff]">
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#febf33]/20 text-[#6e4f00] flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[28px]">bolt</span>
                </div>
                <h3 className="font-['Space Grotesk'] text-[22px] font-semibold text-[#002217] mb-3">
                  Energy Efficiency
                </h3>
                <p className="font-['Manrope'] text-[14px] text-[#414845] leading-relaxed">
                  Optimized string-level layout designs, microinverter compatibility, and high irradiance capture for peak kilowatt-hour yield throughout Tamil Nadu.
                </p>
              </div>
              <div className="mt-8 pt-4 bg-[#f2f3ff]/60 -mx-8 -mb-8 p-4 rounded-b-2xl border-t border-[#eaedff]">
                <span className="font-['Manrope'] text-[10px] text-[#131b2e] font-bold uppercase tracking-wider">
                  Yield Optimization
                </span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-[#eaedff]">
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#002217] text-white flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[28px]">account_balance</span>
                </div>
                <h3 className="font-['Space Grotesk'] text-[22px] font-semibold text-[#002217] mb-3">
                  Long-Term Value
                </h3>
                <p className="font-['Manrope'] text-[14px] text-[#414845] leading-relaxed">
                  A durable capital asset providing predictable energy costs and protecting your business or household against future utility tariff inflation.
                </p>
              </div>
              <div className="mt-8 pt-4 bg-[#f2f3ff]/60 -mx-8 -mb-8 p-4 rounded-b-2xl border-t border-[#eaedff]">
                <span className="font-['Manrope'] text-[10px] text-[#131b2e] font-bold uppercase tracking-wider">
                  Predictable Tariffs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. PROJECTS SHOWCASE                                            */}
      {/* ============================================================== */}
      <section className="w-full py-20 md:py-28 bg-[#f2f3ff]" id="projects-showcase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-[#7b5800] font-['Manrope'] text-[12px] font-bold uppercase tracking-wider mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7b5800]"></span>
                Technical Portfolio
              </div>
              <h2 className="font-['Space Grotesk'] text-[32px] md:text-[38px] text-[#002217] tracking-tight font-bold">
                Projects Showcase
              </h2>
              <p className="font-['Manrope'] text-[16px] text-[#414845] mt-2 max-w-2xl">
                Visual representations of engineering categories and installation topologies across industrial, commercial, and residential sectors.
              </p>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-xl shadow-sm self-start md:self-auto border border-[#eaedff]">
              {(['all', 'industrial', 'commercial', 'residential'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-['Manrope'] text-[12px] font-semibold transition-all cursor-pointer capitalize ${
                    selectedCategory === cat
                      ? 'bg-[#002217] text-white shadow-xs'
                      : 'text-[#414845] hover:text-[#131b2e]'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sample Notice Banner */}
          <div className="mb-8 p-4 rounded-xl bg-white border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#7b5800] text-[22px] shrink-0">policy</span>
              <span className="font-['Manrope'] text-[12px] text-[#414845]">
                <strong className="text-[#131b2e]">Transparency Notice:</strong> All imagery displayed represents sample installation topology previews. Verified client case studies and site performance sheets are undergoing client nondisclosure validation.
              </span>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 bg-[#eaedff] text-[#131b2e] rounded-md text-[11px] font-bold uppercase shrink-0 font-['Manrope']">
              Client Confidentiality Respected
            </span>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col border border-[#eaedff] cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002217]/85 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-[#002217]/90 backdrop-blur-md text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                    {project.categoryLabel}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="inline-block text-[#ffdea5] text-[10px] font-semibold bg-[#002217]/80 px-2 py-0.5 rounded backdrop-blur-sm">
                      [Sample Installation Preview]
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-['Space Grotesk'] text-[20px] font-semibold text-[#002217] mb-2 group-hover:text-[#7b5800] transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-['Manrope'] text-[14px] text-[#414845] leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 bg-[#f2f3ff]/50 -mx-6 -mb-6 px-6 py-3 border-t border-[#eaedff]">
                    <span className="font-['Manrope'] text-[10px] text-[#414845] font-bold uppercase">
                      Proposed Topology
                    </span>
                    <span className="font-['Manrope'] text-[13px] font-bold text-[#002217] flex items-center gap-1">
                      <span>{project.proposedTopology}</span>
                      <span className="material-symbols-outlined text-[16px] text-[#7b5800]">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. IMMERSIVE CALL-TO-ACTION (CTA) SECTION                      */}
      {/* ============================================================== */}
      <section className="w-full py-20 bg-[#002217] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="bg-[#0e382b] border border-[#a5d0bd]/20 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="max-w-2xl flex flex-col gap-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 self-center md:self-start px-3 py-1 rounded-full bg-[#febf33]/20 text-[#ffdea5] font-['Manrope'] text-[11px] font-bold uppercase tracking-wider">
                Initiate Your Transition
              </div>
              <h2 className="font-['Space Grotesk'] text-[32px] sm:text-[40px] md:text-[44px] text-white font-bold tracking-tight leading-tight">
                Ready to Make the Switch to Solar?
              </h2>
              <p className="font-['Manrope'] text-[16px] sm:text-[18px] text-[#a5d0bd] leading-relaxed">
                Let's discuss an energy solution that fits your requirements. Our solar engineers evaluate site irradiance, rooftop strength, and load requirements to prepare a detailed structural recommendation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#febf33] text-[#6e4f00] font-['Manrope'] text-[14px] shadow-md hover:bg-[#ffdea5] transition-all font-bold cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                <span>{COMPANY_INFO.phone}</span>
              </a>

              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md text-white font-['Manrope'] text-[14px] hover:bg-white/20 transition-all font-semibold border border-white/20 cursor-pointer"
              >
                <span>Request a Quote</span>
                <span className="material-symbols-outlined text-[18px]">east</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. CONTACT SECTION & INQUIRY FORM                              */}
      {/* ============================================================== */}
      <section className="w-full py-20 md:py-28 bg-[#faf8ff]" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Information Details */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 text-[#7b5800] font-['Manrope'] text-[12px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7b5800]"></span>
                  Direct Communication Desk
                </div>

                <h2 className="font-['Space Grotesk'] text-[32px] md:text-[38px] text-[#002217] tracking-tight font-bold">
                  Connect With Our Engineering Team
                </h2>

                <p className="font-['Manrope'] text-[15px] text-[#414845] leading-relaxed">
                  Reach out directly to schedule a technical site evaluation or speak with our renewable systems engineers regarding on-grid, off-grid, and rooftop solar implementations.
                </p>

                <div className="flex flex-col gap-6 pt-2">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#eaedff] text-[#002217] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">location_on</span>
                    </div>
                    <div>
                      <h4 className="font-['Space Grotesk'] text-[18px] font-semibold text-[#002217] mb-1">
                        Corporate Office
                      </h4>
                      <p className="font-['Manrope'] text-[14px] text-[#414845] leading-relaxed">
                        {COMPANY_INFO.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#eaedff] text-[#002217] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">call</span>
                    </div>
                    <div>
                      <h4 className="font-['Space Grotesk'] text-[18px] font-semibold text-[#002217] mb-1">
                        Direct Phone
                      </h4>
                      <p className="font-['Manrope'] text-[14px] text-[#414845]">
                        <a
                          className="hover:text-[#7b5800] text-[#002217] font-semibold transition-colors"
                          href={`tel:${COMPANY_INFO.phoneRaw}`}
                        >
                          {COMPANY_INFO.phone}
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#eaedff] text-[#002217] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">mail</span>
                    </div>
                    <div>
                      <h4 className="font-['Space Grotesk'] text-[18px] font-semibold text-[#002217] mb-1">
                        Official Email
                      </h4>
                      <p className="font-['Manrope'] text-[14px] text-[#414845]">
                        <a
                          className="hover:text-[#7b5800] text-[#002217] font-semibold transition-colors"
                          href={`mailto:${COMPANY_INFO.email}`}
                        >
                          {COMPANY_INFO.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#eaedff] text-[#002217] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">schedule</span>
                    </div>
                    <div>
                      <h4 className="font-['Space Grotesk'] text-[18px] font-semibold text-[#002217] mb-1">
                        Operational Hours
                      </h4>
                      <p className="font-['Manrope'] text-[14px] text-[#414845]">
                        {COMPANY_INFO.operatingHours}
                        <br />
                        <span className="text-[12px] text-[#414845]/80">
                          {COMPANY_INFO.operatingSunday}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-[#f2f3ff] text-[#414845] font-['Manrope'] text-[13px] flex items-center gap-3 border border-[#eaedff]">
                <span className="material-symbols-outlined text-[#7b5800] text-[20px] shrink-0">mark_email_read</span>
                <span>
                  Direct inquiries are monitored and processed via <strong className="text-[#002217]">{COMPANY_INFO.email}</strong>
                </span>
              </div>
            </div>

            {/* Interactive Inquiry Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-[#eaedff]">
              <div className="mb-6">
                <h3 className="font-['Space Grotesk'] text-[24px] text-[#002217] font-bold">
                  Request a Site Survey & Quote
                </h3>
                <p className="font-['Manrope'] text-[14px] text-[#414845] mt-1">
                  Fill out the details below to receive a customized solar feasibility assessment.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-['Manrope'] text-[13px] text-[#131b2e] font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-[#c1c8c3] text-[#131b2e] font-['Manrope'] text-[14px] placeholder:text-[#c1c8c3] focus:outline-none focus:ring-2 focus:ring-[#002217]"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-['Manrope'] text-[13px] text-[#131b2e] font-semibold">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-[#c1c8c3] text-[#131b2e] font-['Manrope'] text-[14px] placeholder:text-[#c1c8c3] focus:outline-none focus:ring-2 focus:ring-[#002217]"
                    />
                    <span className="text-[11px] text-[#414845]">10-digit mobile number for WhatsApp & SMS updates</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Email Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-['Manrope'] text-[13px] text-[#131b2e] font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-lg bg-white border border-[#c1c8c3] text-[#131b2e] font-['Manrope'] text-[14px] placeholder:text-[#c1c8c3] focus:outline-none focus:ring-2 focus:ring-[#002217]"
                    />
                  </div>

                  {/* Type of Enquiry */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-['Manrope'] text-[13px] text-[#131b2e] font-semibold">
                      Type of Enquiry *
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={contactForm.category}
                        onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-[#c1c8c3] text-[#131b2e] font-['Manrope'] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#002217] appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select system category</option>
                        <option value="residential">Residential Solar (3 - 15 kW)</option>
                        <option value="commercial">Commercial Rooftop (20 - 250 kW)</option>
                        <option value="industrial">Industrial Scale (250 kW+)</option>
                        <option value="advisory">General Solar Advisory & Audit</option>
                      </select>
                      <span className="material-symbols-outlined text-[20px] text-[#414845] absolute right-3 top-3.5 pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-['Manrope'] text-[13px] text-[#131b2e] font-semibold">
                    Site Location & Energy Needs
                  </label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Briefly describe your property location in Tamil Nadu, monthly electric usage, or shadow-free area available..."
                    className="w-full px-4 py-3 rounded-lg bg-white border border-[#c1c8c3] text-[#131b2e] font-['Manrope'] text-[14px] placeholder:text-[#c1c8c3] focus:outline-none focus:ring-2 focus:ring-[#002217]"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full py-4 px-6 rounded-xl bg-[#002217] text-white font-['Manrope'] text-[14px] font-bold hover:bg-[#0e382b] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-75"
                  >
                    {formLoading ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                        <span>Validating & Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Solar Inquiry</span>
                        <span className="material-symbols-outlined text-[18px]">send</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Feedback Toast Notification */}
                {formSubmitted && (
                  <div className="p-4 rounded-xl bg-[#003925] text-white flex items-center gap-3 animate-in fade-in duration-300">
                    <span className="material-symbols-outlined text-[#6ffbbe] text-[24px] shrink-0">check_circle</span>
                    <div className="font-['Manrope'] text-[14px]">
                      <strong>Inquiry details validated!</strong> A renewable energy specialist from ENKAY Renewables Energy will contact you shortly via call or email.
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
