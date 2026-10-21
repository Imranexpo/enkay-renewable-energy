// Pure calculation + validation for the Solar Savings Calculator.
// No tariff, generation or price values are built in: the user supplies them.

export type ProjectType = 'residential' | 'commercial';

export interface CalcInputs {
  readings: string[];
  bill: string;
  location: string;
  capacity: string;
  projectType: ProjectType;
  tariff: string;
  unitsPerKwp: string;
  costPerKwp: string;
}

export type CalcErrors = Partial<Record<'bill' | 'location' | 'capacity' | 'tariff' | 'unitsPerKwp' | 'costPerKwp', string>> & {
  readings?: (string | undefined)[];
};

/** Six bi-monthly meter readings per year; each covers two months. */
export const READING_COUNT = 6;
export const READING_LABELS = [
  'Reading 1 (Months 1–2)', 'Reading 2 (Months 3–4)', 'Reading 3 (Months 5–6)',
  'Reading 4 (Months 7–8)', 'Reading 5 (Months 9–10)', 'Reading 6 (Months 11–12)',
];
const MAX_READING = 1_000_000;
const DAYS_PER_YEAR = 365;
const PEAK_SUN_HOURS = 4.5;
const SYSTEM_EFFICIENCY = 0.8;

/** Total annual units: the six bi-monthly readings are summed directly (no x2). */
export const totalAnnualUnits = (readings: number[]) => readings.reduce((sum, u) => sum + u, 0);
export const calculatedCapacityKw = (totalUnits: number) => totalUnits / DAYS_PER_YEAR / (PEAK_SUN_HOURS * SYSTEM_EFFICIENCY);
/** Rounds UP to the next 0.5 kW. */
export const recommendedCapacityKw = (calculated: number) => Math.ceil(calculated * 2) / 2;

export interface CalcResult {
  /** null until both tariff and units / kWp / month are entered. */
  monthlySaving: number | null;
  annualSaving: number | null;
  paybackYears: number | null;
  capacityKwp: number;
  totalUnits: number;
  dailyUnits: number;
  calculatedKw: number;
  recommendedKw: number;
  capacityProvided: boolean;
  currentBill: number;
  billWithSolar: number | null;
  capped: boolean;
}

export const EMPTY_INPUTS: CalcInputs = {
  readings: Array(READING_COUNT).fill(''),
  bill: '', location: '', capacity: '', projectType: 'residential', tariff: '', unitsPerKwp: '', costPerKwp: '',
};

const MAX_BILL = 10_000_000;
const MAX_CAPACITY = 10_000;
const MAX_TARIFF = 100;
const MAX_UNITS_PER_KWP = 300;
const MAX_COST = 1_000_000;

/** Parses "3,500" style input. Returns NaN for empty / non-numeric. */
export const parseNum = (v: string): number => {
  const t = v.replace(/,/g, '').trim();
  return t === '' || !/^\d*\.?\d+$|^\d+\.$/.test(t) ? NaN : Number(t);
};

export function validate(i: CalcInputs): CalcErrors {
  const e: CalcErrors = {};
  const rErr = i.readings.map(r => {
    const v = parseNum(r);
    if (r.trim() === '') return i.readings.every(x => x.trim() === '') ? 'Enter at least one reading' : undefined;
    if (!(v >= 0)) return 'Enter units';
    if (v > MAX_READING) return 'Too large';
    return undefined;
  });
  if (rErr.some(Boolean)) e.readings = rErr;
  const bill = parseNum(i.bill);
  if (i.bill.trim() === '') e.bill = 'Enter your average monthly electricity bill.';
  else if (!(bill > 0)) e.bill = 'Enter a valid amount greater than 0.';
  else if (bill > MAX_BILL) e.bill = 'Please enter a bill below ₹1,00,00,000.';

  if (i.location.trim().length < 2) e.location = 'Enter your city or area.';

  if (i.capacity.trim() !== '') {
    const c = parseNum(i.capacity);
    if (!(c > 0)) e.capacity = 'Enter a capacity greater than 0, or leave blank.';
    else if (c > MAX_CAPACITY) e.capacity = 'Capacity looks too large. Enter a value up to 10,000 kWp.';
  }

  const tariff = parseNum(i.tariff);
  if (i.tariff.trim() !== '' && (!(tariff > 0) || tariff > MAX_TARIFF)) e.tariff = 'Enter ₹ 0–100';

  const gen = parseNum(i.unitsPerKwp);
  if (i.unitsPerKwp.trim() !== '' && (!(gen > 0) || gen > MAX_UNITS_PER_KWP)) e.unitsPerKwp = 'Enter 1–300';

  if (i.costPerKwp.trim() !== '') {
    const cost = parseNum(i.costPerKwp);
    if (!(cost > 0) || cost > MAX_COST) e.costPerKwp = 'Enter a valid cost';
  }
  return e;
}

/**
 * Model (all inputs from the user):
 *  units used / month      = sum of six bi-monthly readings ÷ 12
 *  capacity (kWp)          = entered, else recommended (daily units ÷ (4.5 × 0.8), rounded up to 0.5)
 *  solar units / month     = capacity × units-per-kWp
 *  units offset            = min(solar units, units used)  (no export credit assumed)
 *  monthly saving          = units offset × tariff
 *  annual saving           = monthly saving × 12  (flat; no degradation / tariff change)
 *  payback (years)         = capacity × cost-per-kWp ÷ annual saving  (only if cost given)
 * Fixed charges, taxes, subsidy and financing are not modelled.
 */
export function calculate(i: CalcInputs): CalcResult {
  const bill = parseNum(i.bill);
  const tariff = parseNum(i.tariff);
  const gen = parseNum(i.unitsPerKwp);
  const totalUnits = totalAnnualUnits(i.readings.map(r => parseNum(r) || 0));
  const dailyUnits = totalUnits / DAYS_PER_YEAR;
  const calculatedKw = calculatedCapacityKw(totalUnits);
  const recommendedKw = recommendedCapacityKw(calculatedKw);
  const unitsUsed = totalUnits / 12;

  const capacityProvided = i.capacity.trim() !== '';
  const capacityKwp = capacityProvided ? parseNum(i.capacity) : recommendedKw;

  const canSave = tariff > 0 && gen > 0;
  const solarUnits = capacityKwp * gen;
  const offset = Math.min(solarUnits, unitsUsed);
  const monthlySaving = canSave ? offset * tariff : null;
  const annualSaving = monthlySaving === null ? null : monthlySaving * 12;

  const cost = i.costPerKwp.trim() === '' ? NaN : parseNum(i.costPerKwp);
  const paybackYears = cost > 0 && annualSaving !== null && annualSaving > 0 ? (capacityKwp * cost) / annualSaving : null;

  return {
    monthlySaving,
    annualSaving,
    paybackYears,
    capacityKwp,
    totalUnits,
    dailyUnits,
    calculatedKw,
    recommendedKw,
    capacityProvided,
    currentBill: bill,
    billWithSolar: monthlySaving === null ? null : Math.max(bill - monthlySaving, 0),
    capped: canSave && solarUnits > unitsUsed,
  };
}

export const inr = (n: number) => '₹ ' + Math.round(n).toLocaleString('en-IN');
export const oneDecimal = (n: number) =>
  n.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
