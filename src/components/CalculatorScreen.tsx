import React, { useState, useMemo } from 'react';
import { COMPANY_INFO, FAQS } from '../data/solarData';
import { ConnectionCategory, CalculationMode, RoofType, GridType, NavPage } from '../types';

interface CalculatorScreenProps {
  onNavigate: (page: NavPage, sectionId?: string) => void;
  onOpenQuote: () => void;
}

export const CalculatorScreen: React.FC<CalculatorScreenProps> = ({ onNavigate }) => {
  // Calculator state
  const [category, setCategory] = useState<ConnectionCategory>('residential');
  const [mode, setMode] = useState<CalculationMode>('bill');
  const [bill, setBill] = useState<number>(6500);
  const [units, setUnits] = useState<number>(750);
  const [area, setArea] = useState<number>(450);
  const [roofType, setRoofType] = useState<RoofType>('flat');
  const [gridType, setGridType] = useState<GridType>('ongrid');

  // Lead Form State
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    pincode: '',
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);

  // Tariffs and constants per category (Tamil Nadu & TANGEDCO model)
  const RATES = {
    residential: { avgPerKwh: 8.5, baseCostPerKw: 56000 },
    commercial: { avgPerKwh: 10.5, baseCostPerKw: 53000 },
    industrial: { avgPerKwh: 9.2, baseCostPerKw: 48000 },
  };

  // Perform Calculations
  const calculations = useMemo(() => {
    const tariff = RATES[category];
    let unitsNeeded = 0;

    if (mode === 'bill') {
      unitsNeeded = bill / tariff.avgPerKwh;
    } else {
      unitsNeeded = units;
    }

    // Chennai average daily sunlight yield: ~125-130 units per kWp per month
    const unitsPerKwMonth = 125;
    let systemKw = unitsNeeded / unitsPerKwMonth;

    // Standardize to increments of 0.5 kWp
    systemKw = Math.max(1.0, Math.round(systemKw * 2) / 2);
    if (category === 'industrial' && systemKw < 10) {
      systemKw = 10;
    }

    // Generation metrics
    const monthlyGenUnits = Math.round(systemKw * unitsPerKwMonth);
    const monthlyGenValue = Math.min(
      monthlyGenUnits * tariff.avgPerKwh,
      mode === 'bill' ? bill * 0.95 : monthlyGenUnits * tariff.avgPerKwh
    );
    const annualGenValue = Math.round(monthlyGenValue * 12);

    // Area Requirement (~85-95 sq.ft per kWp)
    const reqAreaMin = Math.round(systemKw * 85);
    const reqAreaMax = Math.round(systemKw * 95);

    // Capex estimation
    let systemCost = systemKw * tariff.baseCostPerKw;
    if (gridType === 'hybrid') systemCost *= 1.45;
    if (gridType === 'offgrid') systemCost *= 1.6;

    // PM Surya Ghar Subsidy (Residential On-Grid only)
    let subsidy = 0;
    if (category === 'residential' && gridType === 'ongrid') {
      if (systemKw >= 3) subsidy = 78000;
      else if (systemKw >= 2) subsidy = 60000;
      else subsidy = 30000;
    }

    const netCost = Math.max(0, systemCost - subsidy);
    const paybackYears = annualGenValue > 0 ? (netCost / annualGenValue).toFixed(1) : '3.8';
    const lifetimeSavings = Math.round(annualGenValue * 25 - netCost);

    // Environmental metrics
    const co2PerYear = (systemKw * 1.16).toFixed(1);
    const treesPlanted = Math.round(systemKw * 52);

    const billReductionPct =
      mode === 'bill' && bill > 0
        ? Math.min(95, Math.round((monthlyGenValue / bill) * 100))
        : 85;

    return {
      systemKw,
      monthlyGenUnits,
      monthlyGenValue: Math.round(monthlyGenValue),
      annualGenValue,
      reqAreaMin,
      reqAreaMax,
      systemCost,
      subsidy,
      netCost,
      paybackYears,
      lifetimeSavings,
      co2PerYear,
      treesPlanted,
      billReductionPct,
    };
  }, [category, mode, bill, units, area, gridType]);

  const handleResetDefaults = () => {
    setCategory('residential');
    setMode('bill');
    setBill(6500);
    setUnits(750);
    setArea(450);
    setRoofType('flat');
    setGridType('ongrid');
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadLoading(true);
    setTimeout(() => {
      setLeadLoading(false);
      setLeadSubmitted(true);
    }, 600);
  };

  return (
    <div className="flex flex-col w-full bg-[#faf8ff]">
      {/* ============================================================== */}
      {/* 1. TOP BANNER & BREADCRUMB HEADER                              */}
      {/* ============================================================== */}
      <section className="w-full bg-[#f2f3ff] py-10 md:py-14 border-b border-[#eaedff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-4">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 font-['Manrope'] text-[13px] text-[#414845]">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#002217] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#002217] font-bold">Solar Savings Calculator</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#febf33]/20 text-[#7b5800] w-fit font-['Manrope'] text-[11px] font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[14px]">solar_power</span>
                Financial Feasibility & Rooftop Sizing Tool
              </div>

              <h1 className="font-['Space Grotesk'] text-[34px] sm:text-[44px] md:text-[52px] font-bold tracking-tight text-[#002217] leading-tight">
                Calculate Your Solar Savings & ROI
              </h1>

              <p className="font-['Manrope'] text-[15px] sm:text-[16px] text-[#414845] leading-relaxed">
                Enter your current electricity usage or monthly bill to receive an instant estimate of recommended solar plant capacity, rooftop area requirement, monthly savings, and payback period based on Tamil Nadu solar irradiance and TANGEDCO utility tariffs.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 pt-2 lg:pt-0">
              <div className="flex items-center gap-3 px-3.5 py-2.5 bg-white rounded-xl shadow-xs border border-[#eaedff] text-[#131b2e]">
                <span className="material-symbols-outlined text-[#7b5800] text-[22px]">wb_sunny</span>
                <div className="flex flex-col">
                  <span className="font-['Manrope'] text-[10px] font-bold text-[#414845] uppercase">Irradiance</span>
                  <span className="font-['Manrope'] text-[13px] font-bold text-[#002217]">Tamil Nadu Data</span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-3.5 py-2.5 bg-white rounded-xl shadow-xs border border-[#eaedff] text-[#131b2e]">
                <span className="material-symbols-outlined text-[#00ae79] text-[22px]">bolt</span>
                <div className="flex flex-col">
                  <span className="font-['Manrope'] text-[10px] font-bold text-[#414845] uppercase">Utility</span>
                  <span className="font-['Manrope'] text-[13px] font-bold text-[#002217]">TANGEDCO Tariffs</span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-3.5 py-2.5 bg-white rounded-xl shadow-xs border border-[#eaedff] text-[#131b2e]">
                <span className="material-symbols-outlined text-[#002217] text-[22px]">verified_user</span>
                <div className="flex flex-col">
                  <span className="font-['Manrope'] text-[10px] font-bold text-[#414845] uppercase">Commitment</span>
                  <span className="font-['Manrope'] text-[13px] font-bold text-[#002217]">Zero Obligation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. INTERACTIVE CALCULATOR ARCHITECTURE                         */}
      {/* ============================================================== */}
      <section className="w-full py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* -------------------------------------------------------- */}
            {/* Left Column: User Configuration & Inputs (5 Cols)        */}
            {/* -------------------------------------------------------- */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#eaedff] flex flex-col gap-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#002217] text-[22px]">tune</span>
                  <h2 className="font-['Space Grotesk'] text-[20px] font-bold text-[#002217]">
                    System Parameters
                  </h2>
                </div>
                <button
                  onClick={handleResetDefaults}
                  type="button"
                  className="text-[#414845] hover:text-[#002217] font-['Manrope'] text-[12px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  <span>Reset Defaults</span>
                </button>
              </div>

              {/* 1. Connection Category */}
              <div className="flex flex-col gap-2">
                <label className="font-['Manrope'] text-[13px] text-[#131b2e] font-semibold">
                  Connection Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setCategory('residential')}
                    className={`py-2.5 px-2 rounded-lg text-center font-['Manrope'] text-[13px] transition-all cursor-pointer ${
                      category === 'residential'
                        ? 'bg-[#002217] text-white font-bold shadow-xs'
                        : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                    }`}
                  >
                    Residential<br />
                    <span className="font-['Manrope'] text-[10px] opacity-80">(LT-1A)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('commercial')}
                    className={`py-2.5 px-2 rounded-lg text-center font-['Manrope'] text-[13px] transition-all cursor-pointer ${
                      category === 'commercial'
                        ? 'bg-[#002217] text-white font-bold shadow-xs'
                        : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                    }`}
                  >
                    Commercial<br />
                    <span className="font-['Manrope'] text-[10px] opacity-80">(LT-3B)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('industrial')}
                    className={`py-2.5 px-2 rounded-lg text-center font-['Manrope'] text-[13px] transition-all cursor-pointer ${
                      category === 'industrial'
                        ? 'bg-[#002217] text-white font-bold shadow-xs'
                        : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                    }`}
                  >
                    Industrial<br />
                    <span className="font-['Manrope'] text-[10px] opacity-80">(HT Tier)</span>
                  </button>
                </div>
              </div>

              {/* 2. Calculation Input Mode Toggle */}
              <div className="flex flex-col gap-2">
                <label className="font-['Manrope'] text-[13px] text-[#131b2e] font-semibold">
                  Calculation Input Mode
                </label>
                <div className="flex p-1 bg-[#eaedff] rounded-lg">
                  <button
                    type="button"
                    onClick={() => setMode('bill')}
                    className={`flex-1 py-1.5 text-center font-['Manrope'] text-[13px] rounded transition-all cursor-pointer ${
                      mode === 'bill'
                        ? 'bg-white text-[#002217] shadow-xs font-bold'
                        : 'text-[#414845] hover:text-[#131b2e]'
                    }`}
                  >
                    Monthly Bill (₹)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('units')}
                    className={`flex-1 py-1.5 text-center font-['Manrope'] text-[13px] rounded transition-all cursor-pointer ${
                      mode === 'units'
                        ? 'bg-white text-[#002217] shadow-xs font-bold'
                        : 'text-[#414845] hover:text-[#131b2e]'
                    }`}
                  >
                    Units (kWh / month)
                  </button>
                </div>
              </div>

              {/* 3. Primary Value Input / Slider */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="font-['Manrope'] text-[13px] text-[#131b2e] font-semibold">
                    {mode === 'bill' ? 'Monthly Electricity Bill' : 'Units Consumed / Month (kWh)'}
                  </label>
                  <div className="flex items-center gap-1 font-['Space Grotesk'] text-[20px] text-[#002217] font-bold">
                    <span>{mode === 'bill' ? '₹' : ''}</span>
                    <input
                      type="number"
                      min={mode === 'bill' ? 1000 : 100}
                      max={mode === 'bill' ? 200000 : 25000}
                      step={mode === 'bill' ? 500 : 50}
                      value={mode === 'bill' ? bill : units}
                      onChange={(e) => {
                        const val = Math.max(1, Number(e.target.value));
                        if (mode === 'bill') setBill(val);
                        else setUnits(val);
                      }}
                      className="w-28 text-right bg-[#eaedff] px-2.5 py-1 rounded font-['Space Grotesk'] text-[18px] text-[#002217] focus:outline-none focus:ring-1 focus:ring-[#002217]"
                    />
                    <span className="text-[12px] font-normal text-[#414845]">
                      {mode === 'units' ? 'kWh' : ''}
                    </span>
                  </div>
                </div>

                {/* Range Slider */}
                <input
                  type="range"
                  min={mode === 'bill' ? 1000 : 100}
                  max={mode === 'bill' ? 100000 : 10000}
                  step={mode === 'bill' ? 500 : 50}
                  value={mode === 'bill' ? bill : units}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (mode === 'bill') setBill(val);
                    else setUnits(val);
                  }}
                  className="w-full h-2.5 bg-[#eaedff] rounded-lg appearance-none cursor-pointer accent-[#002217]"
                />

                {/* Quick Chips */}
                {mode === 'bill' ? (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[3000, 6500, 12000, 25000, 50000].map((chipVal) => (
                      <button
                        key={chipVal}
                        type="button"
                        onClick={() => setBill(chipVal)}
                        className={`px-2.5 py-1 rounded font-['Manrope'] text-[11px] transition-all cursor-pointer ${
                          bill === chipVal
                            ? 'bg-[#c0ecd9] text-[#002217] font-bold'
                            : 'bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e]'
                        }`}
                      >
                        ₹{chipVal.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[350, 750, 1500, 3000, 6000].map((chipVal) => (
                      <button
                        key={chipVal}
                        type="button"
                        onClick={() => setUnits(chipVal)}
                        className={`px-2.5 py-1 rounded font-['Manrope'] text-[11px] transition-all cursor-pointer ${
                          units === chipVal
                            ? 'bg-[#c0ecd9] text-[#002217] font-bold'
                            : 'bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e]'
                        }`}
                      >
                        {chipVal.toLocaleString('en-IN')} kWh
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Shadow-Free Rooftop Area */}
              <div className="flex flex-col gap-2 pt-1">
                <div className="flex items-center justify-between">
                  <label className="font-['Manrope'] text-[13px] text-[#131b2e] font-semibold">
                    Available Rooftop Area (Shadow-Free)
                  </label>
                  <div className="flex items-center gap-1 font-['Space Grotesk'] text-[20px] text-[#002217] font-bold">
                    <input
                      type="number"
                      min={80}
                      max={15000}
                      step={50}
                      value={area}
                      onChange={(e) => setArea(Math.max(50, Number(e.target.value)))}
                      className="w-24 text-right bg-[#eaedff] px-2.5 py-1 rounded font-['Space Grotesk'] text-[18px] text-[#002217] focus:outline-none focus:ring-1 focus:ring-[#002217]"
                    />
                    <span className="font-['Manrope'] text-[12px] text-[#414845] font-normal">sq.ft</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={100}
                  max={5000}
                  step={50}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#eaedff] rounded-lg appearance-none cursor-pointer accent-[#002217]"
                />

                <div className="flex justify-between font-['Manrope'] text-[11px] text-[#414845]">
                  <span>100 sq.ft</span>
                  <span>2,500 sq.ft</span>
                  <span>5,000+ sq.ft</span>
                </div>
              </div>

              {/* 5. Roof Construction Type */}
              <div className="flex flex-col gap-2">
                <label className="font-['Manrope'] text-[13px] text-[#131b2e] font-semibold">
                  Rooftop Construction Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRoofType('flat')}
                    className={`p-2.5 rounded-lg text-center font-['Manrope'] text-[12px] transition-all cursor-pointer ${
                      roofType === 'flat'
                        ? 'bg-[#c0ecd9] text-[#002217] font-bold shadow-xs'
                        : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                    }`}
                  >
                    RCC Flat Roof
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoofType('metal')}
                    className={`p-2.5 rounded-lg text-center font-['Manrope'] text-[12px] transition-all cursor-pointer ${
                      roofType === 'metal'
                        ? 'bg-[#c0ecd9] text-[#002217] font-bold shadow-xs'
                        : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                    }`}
                  >
                    Metal Sheet
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoofType('tiled')}
                    className={`p-2.5 rounded-lg text-center font-['Manrope'] text-[12px] transition-all cursor-pointer ${
                      roofType === 'tiled'
                        ? 'bg-[#c0ecd9] text-[#002217] font-bold shadow-xs'
                        : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                    }`}
                  >
                    Tiled / Slanted
                  </button>
                </div>
              </div>

              {/* 6. Grid Connection Architecture */}
              <div className="flex flex-col gap-2">
                <label className="font-['Manrope'] text-[13px] text-[#131b2e] font-semibold">
                  Grid Architecture
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setGridType('ongrid')}
                    className={`p-2.5 rounded-lg text-center font-['Manrope'] text-[12px] transition-all cursor-pointer ${
                      gridType === 'ongrid'
                        ? 'bg-[#002217] text-white font-bold shadow-xs'
                        : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                    }`}
                  >
                    On-Grid<br />
                    <span className="font-['Manrope'] text-[10px] opacity-80">(Net Metering)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGridType('hybrid')}
                    className={`p-2.5 rounded-lg text-center font-['Manrope'] text-[12px] transition-all cursor-pointer ${
                      gridType === 'hybrid'
                        ? 'bg-[#002217] text-white font-bold shadow-xs'
                        : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                    }`}
                  >
                    Hybrid<br />
                    <span className="font-['Manrope'] text-[10px] opacity-80">(Battery Store)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGridType('offgrid')}
                    className={`p-2.5 rounded-lg text-center font-['Manrope'] text-[12px] transition-all cursor-pointer ${
                      gridType === 'offgrid'
                        ? 'bg-[#002217] text-white font-bold shadow-xs'
                        : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                    }`}
                  >
                    Off-Grid<br />
                    <span className="font-['Manrope'] text-[10px] opacity-80">(Stand-Alone)</span>
                  </button>
                </div>
              </div>

              {/* Status Badge */}
              <div className="p-3 rounded-lg bg-[#e2e7ff]/60 border border-[#eaedff] flex items-center justify-between">
                <span className="font-['Manrope'] text-[12px] text-[#414845] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#7b5800]">bolt</span>
                  Live generation compute active
                </span>
                <span className="font-['Manrope'] text-[10px] font-bold text-[#002217] bg-[#c0ecd9] px-2 py-0.5 rounded">
                  Chennai Solar Model
                </span>
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* Right Column: Instant Results & Financial Projections    */}
            {/* -------------------------------------------------------- */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Primary Metric Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Recommended Capacity Card */}
                <div className="bg-[#002217] text-white rounded-2xl p-6 sm:p-7 shadow-md relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#0e382b] rounded-full opacity-40 pointer-events-none"></div>

                  <div className="flex items-center justify-between">
                    <span className="font-['Manrope'] text-[11px] uppercase font-bold tracking-wider text-[#a5d0bd]">
                      Recommended Capacity
                    </span>
                    <span className="material-symbols-outlined text-[#ffdea5] text-[24px]">solar_power</span>
                  </div>

                  <div className="py-4">
                    <div className="font-['Space Grotesk'] text-[48px] sm:text-[56px] leading-none font-bold text-white tracking-tight flex items-baseline gap-2">
                      <span>{calculations.systemKw.toFixed(1)}</span>
                      <span className="font-['Space Grotesk'] text-[24px] font-semibold text-[#ffdea5]">kWp</span>
                    </div>
                    <p className="font-['Manrope'] text-[13px] text-[#a5d0bd] pt-2">
                      Generates ~{calculations.monthlyGenUnits - 30} - {calculations.monthlyGenUnits + 40} units / month in Chennai sun hours.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 font-['Manrope'] text-[11px] bg-[#0e382b] border border-[#6ffbbe]/20 px-3 py-1.5 rounded-lg text-white w-fit">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#6ffbbe] animate-pulse"></span>
                    <span>Tier-1 Monocrystalline Bifacial</span>
                  </div>
                </div>

                {/* Monthly Savings Card */}
                <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-[#eaedff] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-['Manrope'] text-[11px] uppercase font-bold tracking-wider text-[#414845]">
                      Estimated Monthly Savings
                    </span>
                    <span className="material-symbols-outlined text-[#7b5800] text-[24px]">trending_down</span>
                  </div>

                  <div className="py-4">
                    <div className="font-['Space Grotesk'] text-[38px] sm:text-[46px] leading-none font-bold text-[#002217] tracking-tight">
                      ₹ {calculations.monthlyGenValue.toLocaleString('en-IN')}
                    </div>
                    <p className="font-['Manrope'] text-[13px] text-[#414845] pt-2 flex items-center gap-1.5">
                      <span className="font-bold text-[#00ae79] bg-[#00ae79]/10 px-1.5 py-0.5 rounded text-[12px]">
                        ~{calculations.billReductionPct}% bill reduction
                      </span>
                      <span>against standard TANGEDCO LT tariff.</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between font-['Manrope'] text-[13px] text-[#131b2e] bg-[#f2f3ff] px-3.5 py-2 rounded-lg border border-[#eaedff]">
                    <span>Annual Savings:</span>
                    <span className="font-bold text-[#002217]">
                      ₹ {calculations.annualGenValue.toLocaleString('en-IN')} / yr
                    </span>
                  </div>
                </div>
              </div>

              {/* Extended Feasibility & Financial Matrix */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#eaedff] flex flex-col gap-6">
                {/* Rooftop Area Feasibility Check */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#c0ecd9] text-[#002217] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">roofing</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-['Manrope'] text-[11px] uppercase font-bold tracking-wider text-[#414845]">
                        Roof Space Feasibility
                      </span>
                      <div className="font-['Space Grotesk'] text-[20px] text-[#131b2e] font-bold">
                        Required: {calculations.reqAreaMin} - {calculations.reqAreaMax} sq.ft
                      </div>
                      {area >= calculations.reqAreaMin ? (
                        <span className="font-['Manrope'] text-[12px] text-[#00ae79] font-bold flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[16px]">check_circle</span>
                          Ideal fit for your available {area} sq.ft
                        </span>
                      ) : (
                        <span className="font-['Manrope'] text-[12px] text-[#7b5800] font-bold flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[16px]">warning</span>
                          Needs ~{calculations.reqAreaMin} sq.ft. Super-structure or high-yield panel engineering required.
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-left sm:text-right flex flex-col">
                    <span className="font-['Manrope'] text-[11px] text-[#414845]">Spatial Density</span>
                    <span className="font-['Manrope'] text-[14px] font-bold text-[#002217]">~80-100 sq.ft / kWp</span>
                  </div>
                </div>

                {/* Financial Metrics 4-Box Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {/* Capex */}
                  <div className="flex flex-col p-3.5 rounded-xl bg-[#eaedff]/60 border border-[#eaedff]">
                    <span className="font-['Manrope'] text-[10px] text-[#414845] uppercase font-bold">
                      Plant Capex Range
                    </span>
                    <span className="font-['Space Grotesk'] text-[19px] sm:text-[22px] font-bold text-[#002217] mt-1">
                      ₹{(calculations.systemCost / 100000).toFixed(1)}L - {((calculations.systemCost * 1.15) / 100000).toFixed(1)}L
                    </span>
                    <span className="font-['Manrope'] text-[11px] text-[#414845] mt-0.5">Pre-subsidy estimate</span>
                  </div>

                  {/* Subsidy */}
                  <div className="flex flex-col p-3.5 rounded-xl bg-[#febf33]/20 border border-[#febf33]/30">
                    <span className="font-['Manrope'] text-[10px] text-[#7b5800] uppercase font-bold">
                      PM Surya Ghar Subsidy
                    </span>
                    <span className="font-['Space Grotesk'] text-[19px] sm:text-[22px] font-bold text-[#7b5800] mt-1">
                      {calculations.subsidy > 0 ? `₹ ${calculations.subsidy.toLocaleString('en-IN')}` : 'Tax Depr.'}
                    </span>
                    <span className="font-['Manrope'] text-[11px] text-[#414845] mt-0.5">
                      {calculations.subsidy > 0 ? 'Eligible CFA Subsidy (Residential)' : '40% Accelerated Depr.'}
                    </span>
                  </div>

                  {/* Estimated Payback */}
                  <div className="flex flex-col p-3.5 rounded-xl bg-[#eaedff]/60 border border-[#eaedff]">
                    <span className="font-['Manrope'] text-[10px] text-[#414845] uppercase font-bold">
                      Estimated Payback
                    </span>
                    <span className="font-['Space Grotesk'] text-[19px] sm:text-[22px] font-bold text-[#002217] mt-1">
                      {calculations.paybackYears} - {(parseFloat(calculations.paybackYears) + 0.4).toFixed(1)} Yrs
                    </span>
                    <span className="font-['Manrope'] text-[11px] text-[#414845] mt-0.5">Capital recovery</span>
                  </div>

                  {/* 25-Yr Net Savings */}
                  <div className="flex flex-col p-3.5 rounded-xl bg-[#c0ecd9]/40 border border-[#c0ecd9]">
                    <span className="font-['Manrope'] text-[10px] text-[#002217] uppercase font-bold">
                      25-Yr Net Savings
                    </span>
                    <span className="font-['Space Grotesk'] text-[19px] sm:text-[22px] font-bold text-[#002217] mt-1">
                      ₹ {(calculations.lifetimeSavings / 100000).toFixed(1)} Lakhs
                    </span>
                    <span className="font-['Manrope'] text-[11px] text-[#0e382b] font-semibold mt-0.5">ROI &gt; 350%</span>
                  </div>
                </div>

                {/* Environmental Offset Matrix */}
                <div className="p-4 sm:p-5 bg-[#002217] text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="material-symbols-outlined text-[#6ffbbe] text-[32px]">forest</span>
                    <div className="flex flex-col">
                      <span className="font-['Manrope'] text-[10px] text-[#a5d0bd] uppercase tracking-wider font-bold">
                        Environmental Offset Matrix
                      </span>
                      <span className="font-['Manrope'] text-[15px] text-white font-bold">
                        Clean Energy Footprint for Chennai
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-left sm:text-right">
                      <span className="font-['Space Grotesk'] text-[20px] font-bold text-[#ffdea5] block">
                        {calculations.co2PerYear} Tons
                      </span>
                      <span className="font-['Manrope'] text-[11px] text-[#a5d0bd]">CO₂ offset / year</span>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="font-['Space Grotesk'] text-[20px] font-bold text-[#6ffbbe] block">
                        ~{calculations.treesPlanted} Trees
                      </span>
                      <span className="font-['Manrope'] text-[11px] text-[#a5d0bd]">Equivalent planted</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 10-Year Cumulative Financial Outlay Chart Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#eaedff] flex flex-col gap-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex flex-col">
                    <h3 className="font-['Space Grotesk'] text-[19px] font-bold text-[#002217]">
                      10-Year Cumulative Financial Outlay
                    </h3>
                    <p className="font-['Manrope'] text-[13px] text-[#414845]">
                      Comparing escalating grid electricity costs vs. locked solar investment.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 font-['Manrope'] text-[12px] font-semibold">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-[#002217]"></span>
                      <span>Locked Solar Cost</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-[#ba1a1a]"></span>
                      <span>Grid Expense (6% Infl.)</span>
                    </div>
                  </div>
                </div>

                {/* SVG Bar Projection Visualizer */}
                <div className="w-full pt-4">
                  <div className="flex items-end justify-between h-48 w-full gap-3 px-2">
                    {/* Yr 1 */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full flex items-end justify-center gap-1 h-full">
                        <div className="w-1/2 bg-[#ba1a1a]/85 rounded-t" style={{ height: '16%' }} title="Year 1 Grid: ₹74,000"></div>
                        <div className="w-1/2 bg-[#002217] rounded-t" style={{ height: '38%' }} title="Capex Outlay"></div>
                      </div>
                      <span className="font-['Manrope'] text-[11px] font-bold text-[#414845]">Yr 1</span>
                    </div>

                    {/* Yr 3 */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full flex items-end justify-center gap-1 h-full">
                        <div className="w-1/2 bg-[#ba1a1a]/85 rounded-t" style={{ height: '30%' }} title="Year 3 Grid Cumulative: ₹2.4 Lakhs"></div>
                        <div className="w-1/2 bg-[#002217] rounded-t" style={{ height: '40%' }} title="Net Solar (Breakeven approaching)"></div>
                      </div>
                      <span className="font-['Manrope'] text-[11px] font-bold text-[#414845]">Yr 3</span>
                    </div>

                    {/* Yr 5 */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full flex items-end justify-center gap-1 h-full">
                        <div className="w-1/2 bg-[#ba1a1a]/85 rounded-t" style={{ height: '52%' }} title="Year 5 Grid: ₹4.6 Lakhs"></div>
                        <div className="w-1/2 bg-[#002217] rounded-t" style={{ height: '41%' }} title="Fully Paid Off!"></div>
                      </div>
                      <span className="font-['Manrope'] text-[11px] font-bold text-[#414845]">Yr 5</span>
                    </div>

                    {/* Yr 7 */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full flex items-end justify-center gap-1 h-full">
                        <div className="w-1/2 bg-[#ba1a1a]/85 rounded-t" style={{ height: '75%' }} title="Year 7 Grid: ₹7.2 Lakhs"></div>
                        <div className="w-1/2 bg-[#002217] rounded-t" style={{ height: '42%' }}></div>
                      </div>
                      <span className="font-['Manrope'] text-[11px] font-bold text-[#414845]">Yr 7</span>
                    </div>

                    {/* Yr 10 */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full flex items-end justify-center gap-1 h-full">
                        <div className="w-1/2 bg-[#ba1a1a]/85 rounded-t" style={{ height: '100%' }} title="Year 10 Grid: ₹11.5 Lakhs+"></div>
                        <div className="w-1/2 bg-[#002217] rounded-t" style={{ height: '43%' }}></div>
                      </div>
                      <span className="font-['Manrope'] text-[11px] font-bold text-[#414845]">Yr 10</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#eaedff] rounded-xl font-['Manrope'] text-[12px] text-[#414845] flex items-center justify-between">
                  <span>Payback breakeven reached in year 4. All solar electricity thereafter is completely free of billing.</span>
                  <span className="font-bold text-[#002217]">100% Asset Ownership</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. SIDE-BY-SIDE TARIFF COMPARISON SECTION                      */}
      {/* ============================================================== */}
      <section className="w-full bg-[#f2f3ff] py-16 border-y border-[#eaedff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-10">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
            <span className="font-['Manrope'] text-[11px] uppercase tracking-wider text-[#7b5800] font-bold">
              Tariff Mechanics
            </span>
            <h2 className="font-['Space Grotesk'] text-[32px] md:text-[38px] text-[#002217] font-bold">
              Side-by-Side Tariff Comparison
            </h2>
            <p className="font-['Manrope'] text-[15px] text-[#414845]">
              How ENKAY solar transformation hedges your household or business against rising TANGEDCO power slabs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status Quo Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#ffdad6] flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2 text-[#ba1a1a]">
                  <span className="material-symbols-outlined text-[24px]">power_off</span>
                  <h3 className="font-['Space Grotesk'] text-[19px] font-bold text-[#131b2e]">
                    Without Solar (Grid Dependent)
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#ffdad6] text-[#93000a] font-['Manrope'] text-[11px] font-bold uppercase">
                  Escalating Expense
                </span>
              </div>

              <div className="flex flex-col gap-3 font-['Manrope'] text-[14px] text-[#414845]">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">close</span>
                  <span><strong>Progressive Slabs:</strong> TANGEDCO consumption above 500 units incurs higher bimonthly bracket penalties.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">close</span>
                  <span><strong>Annual Inflation:</strong> Recurring 4-7% tariff hikes mandated periodically by regulatory commissions.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">close</span>
                  <span><strong>Power Outage Risk:</strong> Dependent entirely on diesel gen-sets (costing ₹24 - ₹30 per unit).</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">close</span>
                  <span><strong>Cumulative 25-Year Outlay:</strong> Over ₹28+ Lakhs paid out in non-recoverable operational utility bills.</span>
                </div>
              </div>
            </div>

            {/* ENKAY Solar Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#c0ecd9] flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2 text-[#002217]">
                  <span className="material-symbols-outlined text-[24px] text-[#7b5800]">solar_power</span>
                  <h3 className="font-['Space Grotesk'] text-[19px] font-bold text-[#002217]">
                    With ENKAY Solar Plant
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#c0ecd9] text-[#002217] font-['Manrope'] text-[11px] font-bold uppercase">
                  Asset Creation
                </span>
              </div>

              <div className="flex flex-col gap-3 font-['Manrope'] text-[14px] text-[#414845]">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#00ae79] text-[18px] shrink-0 mt-0.5">check</span>
                  <span><strong>Net-Metering Credits:</strong> Surplus daytime export rolls over to adjust against nighttime consumption.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#00ae79] text-[18px] shrink-0 mt-0.5">check</span>
                  <span><strong>Locked Zero Marginal Cost:</strong> Flat generation cost for 25+ years regardless of government tariff increases.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#00ae79] text-[18px] shrink-0 mt-0.5">check</span>
                  <span><strong>MNRE Subsidy Safeguard:</strong> Direct subsidy release into your linked bank account within 30-45 days.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#00ae79] text-[18px] shrink-0 mt-0.5">check</span>
                  <span><strong>Full Capital Recovery:</strong> Complete payback within ~4 years, delivering 21 years of pure financial surplus.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Engineering Feasibility Notice & Disclaimer */}
          <div className="p-5 bg-white border border-[#eaedff] rounded-2xl flex items-start gap-4">
            <span className="material-symbols-outlined text-[#002217] text-[28px] shrink-0 mt-0.5">info</span>
            <div className="flex flex-col gap-1">
              <h4 className="font-['Space Grotesk'] text-[15px] font-bold text-[#002217]">
                Engineering Transparency & Calculation Baseline Notice
              </h4>
              <p className="font-['Manrope'] text-[13px] text-[#414845] leading-relaxed">
                Figures provided by this calculator are preliminary estimates based on standard Tamil Nadu solar irradiance (~4.5 to 5.2 peak sun hours/day), typical TANGEDCO residential and commercial tariff tiers, and Tier-1 monocrystalline photovoltaic panel efficiency. Actual generation and financial savings depend on site-specific shading, azimuth, roof inclination, module cleanliness, and sanctioned load. A technical site survey and shadow profile by ENKAY engineers is required for formal engineering approval and final BOQ generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. DIRECT NEXT-STEP ASSESSMENT FORM SECTION                    */}
      {/* ============================================================== */}
      <section className="w-full py-16 bg-[#faf8ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="bg-[#002217] text-white rounded-3xl p-6 sm:p-10 md:p-14 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border border-[#a5d0bd]/20">
            <div className="lg:col-span-6 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#febf33] text-[#6e4f00] font-['Manrope'] text-[11px] font-bold uppercase w-fit">
                Lock In Your Custom Engineering Assessment
              </div>

              <h2 className="font-['Space Grotesk'] text-[32px] sm:text-[38px] font-bold tracking-tight text-white leading-tight">
                Ready to Verify Your Rooftop Sizing in Person?
              </h2>

              <p className="font-['Manrope'] text-[15px] text-[#a5d0bd] leading-relaxed">
                Our Chennai field engineering crew will visit your location, carry out precision drone or 3D shadow analysis, evaluate switchboard sanction load, and deliver a detailed Bill of Quantities (BOQ).
              </p>

              {/* Calculator Live Spec Box */}
              <div className="p-4 bg-[#0e382b] border border-[#a5d0bd]/20 rounded-2xl flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-['Manrope'] text-[11px] text-[#a5d0bd] uppercase font-semibold">
                    Current Calculator Estimate:
                  </span>
                  <span className="font-['Manrope'] text-[15px] font-bold text-[#ffdea5]">
                    {calculations.systemKw.toFixed(1)} kWp System for ~{mode === 'bill' ? `₹${bill.toLocaleString('en-IN')}` : `${units} kWh`} monthly
                  </span>
                </div>
                <span className="material-symbols-outlined text-[#ffdea5] text-[28px]">assessment</span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <a
                  className="flex items-center gap-2 text-white hover:text-[#ffdea5] transition-colors font-['Manrope'] text-[14px] font-semibold"
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                >
                  <span className="material-symbols-outlined text-[20px] text-[#febf33]">call</span>
                  <span>Direct: {COMPANY_INFO.phone}</span>
                </a>
                <a
                  className="flex items-center gap-2 text-white hover:text-[#ffdea5] transition-colors font-['Manrope'] text-[14px] font-semibold"
                  href={`mailto:${COMPANY_INFO.email}`}
                >
                  <span className="material-symbols-outlined text-[20px] text-[#febf33]">mail</span>
                  <span>{COMPANY_INFO.email}</span>
                </a>
              </div>
            </div>

            {/* Audit Form */}
            <div className="lg:col-span-6 bg-white text-[#131b2e] rounded-2xl p-6 sm:p-8 shadow-md border border-[#eaedff]">
              {!leadSubmitted ? (
                <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-['Space Grotesk'] text-[22px] font-bold text-[#002217]">
                      Request Site Feasibility Audit
                    </h3>
                    <p className="font-['Manrope'] text-[13px] text-[#414845] mt-0.5">
                      Free on-site inspection across Chennai & Tamil Nadu.
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-['Manrope'] text-[12px] font-semibold text-[#414845]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      placeholder="e.g. S. Ramanathan"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#c1c8c3] focus:border-[#002217] focus:ring-1 focus:ring-[#002217] outline-none text-[14px] font-['Manrope']"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-['Manrope'] text-[12px] font-semibold text-[#414845]">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10}"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        placeholder="+91 98400 00000"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#c1c8c3] focus:border-[#002217] focus:ring-1 focus:ring-[#002217] outline-none text-[14px] font-['Manrope']"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="font-['Manrope'] text-[12px] font-semibold text-[#414845]">
                        Pincode / Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadForm.pincode}
                        onChange={(e) => setLeadForm({ ...leadForm, pincode: e.target.value })}
                        placeholder="e.g. 600030 / Shenoy Nagar"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#c1c8c3] focus:border-[#002217] focus:ring-1 focus:ring-[#002217] outline-none text-[14px] font-['Manrope']"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-['Manrope'] text-[12px] font-semibold text-[#414845]">
                      Estimated Load / Special Requirements
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={`Calculated System: ${calculations.systemKw.toFixed(1)} kWp | ${gridType.toUpperCase()} | Roof: ${roofType.toUpperCase()}`}
                      className="w-full px-3 py-2 rounded-lg bg-[#eaedff] text-[13px] text-[#002217] font-semibold font-['Manrope'] border border-[#eaedff]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={leadLoading}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#febf33] text-[#6e4f00] font-['Manrope'] text-[14px] font-bold hover:bg-[#ffdea5] transition-all shadow-sm flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-75"
                  >
                    {leadLoading ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                        <span>Scheduling Survey...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                        <span>Request Free Technical Site Survey & Detailed BOQ</span>
                      </>
                    )}
                  </button>

                  <span className="font-['Manrope'] text-[11px] text-center text-[#414845]">
                    Zero spam promise. A senior ENKAY solar structural engineer will reach out within 2 business hours.
                  </span>
                </form>
              ) : (
                <div className="p-6 bg-[#c0ecd9]/30 rounded-xl text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#002217] text-[#6ffbbe] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[28px]">done</span>
                  </div>
                  <h4 className="font-['Space Grotesk'] text-[20px] font-bold text-[#002217]">
                    Survey Scheduled!
                  </h4>
                  <p className="font-['Manrope'] text-[13px] text-[#414845] leading-relaxed">
                    Thank you, <strong>{leadForm.name}</strong>. Our Chennai clean energy field crew is preparing your preliminary irradiance packet for {leadForm.pincode}. We will contact you at {leadForm.phone}.
                  </p>
                  <button
                    onClick={() => setLeadSubmitted(false)}
                    className="mt-2 text-[12px] font-bold text-[#002217] underline hover:no-underline"
                  >
                    Submit Another Survey
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. FREQUENTLY ASKED QUESTIONS ACCORDION GRID                   */}
      {/* ============================================================== */}
      <section className="w-full py-16 bg-[#f2f3ff] border-t border-[#eaedff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-10">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
            <span className="font-['Manrope'] text-[11px] uppercase tracking-wider text-[#7b5800] font-bold">
              Frequently Asked Questions
            </span>
            <h2 className="font-['Space Grotesk'] text-[32px] md:text-[38px] text-[#002217] font-bold">
              Rooftop Solar & Tariffs in Tamil Nadu
            </h2>
            <p className="font-['Manrope'] text-[15px] text-[#414845]">
              Everything you need to know about TANGEDCO regulations, subsidies, and maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-[#eaedff] flex flex-col gap-3"
              >
                <div className="flex items-center gap-2.5 text-[#002217]">
                  <span className="material-symbols-outlined text-[#7b5800] text-[22px] shrink-0">help</span>
                  <h3 className="font-['Space Grotesk'] text-[17px] font-bold leading-snug">
                    {faq.question}
                  </h3>
                </div>
                <p className="font-['Manrope'] text-[14px] text-[#414845] leading-relaxed pt-1">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
