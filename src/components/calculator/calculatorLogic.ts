// Pure calculation + validation for the Solar Savings Calculator.
// No tariff, generation or price values are built in: the user supplies them.

export type ProjectType = 'residential' | 'commercial';

export interface CalcInputs {
  bill: string;
  location: string;
  capacity: string;
  projectType: ProjectType;
  tariff: string;
  unitsPerKwp: string;
  costPerKwp: string;
}

export type CalcErrors = Partial<Record<'bill' | 'location' | 'capacity' | 'tariff' | 'unitsPerKwp' | 'costPerKwp', string>>;

export interface CalcResult {
  monthlySaving: number;
  annualSaving: number;
  paybackYears: number | null;
  capacityKwp: number;
  capacityProvided: boolean;
  currentBill: number;
  billWithSolar: number;
  capped: boolean;
}

export const EMPTY_INPUTS: CalcInputs = {
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
  if (i.tariff.trim() === '') e.tariff = 'Required';
  else if (!(tariff > 0) || tariff > MAX_TARIFF) e.tariff = 'Enter ₹ 0–100';

  const gen = parseNum(i.unitsPerKwp);
  if (i.unitsPerKwp.trim() === '') e.unitsPerKwp = 'Required';
  else if (!(gen > 0) || gen > MAX_UNITS_PER_KWP) e.unitsPerKwp = 'Enter 1–300';

  if (i.costPerKwp.trim() !== '') {
    const cost = parseNum(i.costPerKwp);
    if (!(cost > 0) || cost > MAX_COST) e.costPerKwp = 'Enter a valid cost';
  }
  return e;
}

/**
 * Model (all inputs from the user):
 *  units used / month      = bill ÷ tariff
 *  capacity (kWp)          = entered, else units used ÷ units-per-kWp
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
  const unitsUsed = bill / tariff;

  const capacityProvided = i.capacity.trim() !== '';
  const capacityKwp = capacityProvided ? parseNum(i.capacity) : unitsUsed / gen;

  const solarUnits = capacityKwp * gen;
  const offset = Math.min(solarUnits, unitsUsed);
  const monthlySaving = offset * tariff;
  const annualSaving = monthlySaving * 12;

  const cost = i.costPerKwp.trim() === '' ? NaN : parseNum(i.costPerKwp);
  const paybackYears = cost > 0 && annualSaving > 0 ? (capacityKwp * cost) / annualSaving : null;

  return {
    monthlySaving,
    annualSaving,
    paybackYears,
    capacityKwp,
    capacityProvided,
    currentBill: bill,
    billWithSolar: Math.max(bill - monthlySaving, 0),
    capped: solarUnits > unitsUsed,
  };
}

export const inr = (n: number) => '₹ ' + Math.round(n).toLocaleString('en-IN');
export const oneDecimal = (n: number) =>
  n.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 1 });
