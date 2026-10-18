import { useCallback, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import {
  AlertTriangle, ArrowRight, Building2, Calculator, FileText, Home, IndianRupee, Info, LineChart, MapPin,
  PiggyBank, Receipt, Settings2, SlidersHorizontal, Sun, Timer, Wallet,
} from 'lucide-react';
import type { NavSection } from '../Navbar';
import SiteFooter from '../home/SiteFooter';
import QuoteModal from '../home/QuoteModal';
import {
  EMPTY_INPUTS, calculate, inr, oneDecimal, validate,
} from './calculatorLogic';
import type { CalcErrors, CalcInputs, CalcResult, ProjectType } from './calculatorLogic';
import '../home/home.css';
import './calculator.css';

interface Props {
  onNavigate: (section: NavSection, anchorId?: string) => void;
  quoteOpen: boolean;
  onQuoteOpen: () => void;
  onQuoteClose: () => void;
}

const MONTHS = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
const IDLE_MSG = 'Enter your details and assumptions, then select Calculate Savings to view your estimate.';
const DONE_MSG = 'Estimate based only on the values you entered. Fixed charges, taxes, subsidy, financing and panel degradation are not included.';
const CAPPED_MSG = 'Your system would generate more than you use. Savings are capped at your current bill — no export credit is assumed.';

const STEPS = [
  { icon: Receipt, title: '1. Share your bill', text: 'Enter your average monthly electricity bill and location.', tone: '' },
  { icon: Calculator, title: '2. Explore your estimate', text: 'See estimated savings based on the assumptions you provide.', tone: '' },
  { icon: FileText, title: '3. Get a personalized quote', text: 'Our team prepares a detailed quotation for your site.', tone: 'is-yellow' },
];

const SUBSIDIES = [
  { who: 'Central Government', name: 'PM Surya Ghar: Muft Bijli Yojana', amount: '₹78,000' },
  { who: 'State Government', name: 'State Government Subsidy', amount: '₹22,000' },
];

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  small?: boolean;
  children: ReactNode;
}

function Field({ id, label, required, error, hint, small, children }: FieldProps) {
  return (
    <div className={`sc-field${small ? ' is-small' : ''}`}>
      <label htmlFor={id}>{label}{required && <b aria-hidden="true"> *</b>}</label>
      {children}
      {hint && !error && <p className="sc-hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="sc-error" id={`${id}-err`} role="alert">{error}</p>}
    </div>
  );
}

export default function CalculatorPage({ onNavigate, quoteOpen, onQuoteOpen, onQuoteClose }: Props) {
  const openQuote = useCallback(() => onNavigate('quote'), [onNavigate]);
  const [inputs, setInputs] = useState<CalcInputs>(EMPTY_INPUTS);
  const [errors, setErrors] = useState<CalcErrors>({});
  const [result, setResult] = useState<CalcResult | null>(null);

  const set = <K extends keyof CalcInputs>(key: K, value: CalcInputs[K]) => {
    setInputs(p => ({ ...p, [key]: value }));
    if (key in errors) setErrors(p => ({ ...p, [key]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(inputs);
    setErrors(found);
    if (Object.keys(found).length) {
      setResult(null);
      const first = ['bill', 'location', 'capacity', 'tariff', 'unitsPerKwp', 'costPerKwp'].find(k => k in found);
      if (first) document.getElementById(`sc-${first}`)?.focus();
      return;
    }
    setResult(calculate(inputs));
  };

  const ariaFor = (k: keyof CalcErrors, hasHint = false) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `sc-${k}-err` : hasHint ? `sc-${k}-hint` : undefined,
  });

  const billH = result ? Math.max((result.billWithSolar / result.currentBill) * 100, 2) : 100;

  return (
    <div className="hp sc">
      {/* ── Hero ── */}
      <section className="sc-hero" aria-labelledby="sc-title">
        <img className="sc-hero-img" src="/assets/calculator/hero.jpg" alt="" fetchPriority="high" />
        <div className="hp-wrap sc-hero-inner">
          <div className="sc-eyebrow">Solar Savings Calculator</div>
          <h1 id="sc-title">Calculate Your Solar Savings</h1>
          <p>Find out how much you can save with solar energy. Enter a few details to explore your estimated savings.</p>
        </div>
      </section>

      {/* ── Calculator ── */}
      <section className="sc-calc-sec" aria-label="Solar savings calculator">
        <div className="hp-wrap sc-calc-grid">
          <form className="sc-card" onSubmit={submit} noValidate>
            <header className="sc-card-hd">
              <span className="sc-badge"><SlidersHorizontal size={24} /></span>
              <div>
                <h2>Enter Your Details</h2>
                <p>All fields help us estimate your potential savings.</p>
              </div>
            </header>

            <Field id="sc-bill" label="Monthly Electricity Bill (₹)" required error={errors.bill}>
              <div className="sc-input is-focusable">
                <IndianRupee size={16} aria-hidden="true" />
                <input id="sc-bill" inputMode="decimal" autoComplete="off" placeholder="e.g. 3,500"
                  value={inputs.bill} onChange={e => set('bill', e.target.value)} {...ariaFor('bill')} />
                <span>/ month</span>
              </div>
            </Field>

            <Field id="sc-location" label="Installation Location" required error={errors.location}>
              <div className="sc-input is-focusable">
                <MapPin size={16} aria-hidden="true" />
                <input id="sc-location" autoComplete="address-level2" placeholder="City / area, e.g. Chennai"
                  value={inputs.location} onChange={e => set('location', e.target.value)} {...ariaFor('location')} />
              </div>
            </Field>

            <Field id="sc-capacity" label="System Capacity (kWp)" error={errors.capacity}
              hint="Leave blank and we will suggest a capacity based on your assumptions.">
              <div className="sc-input is-focusable">
                <Sun size={16} aria-hidden="true" />
                <input id="sc-capacity" inputMode="decimal" autoComplete="off" placeholder="e.g. 3, 5 — leave blank if unsure"
                  value={inputs.capacity} onChange={e => set('capacity', e.target.value)} {...ariaFor('capacity', true)} />
                <span>kWp</span>
              </div>
            </Field>

            <div className="sc-field">
              <span className="sc-label" id="sc-type-label">Project Type<b aria-hidden="true"> *</b></span>
              <div className="sc-seg" role="radiogroup" aria-labelledby="sc-type-label">
                {([['residential', 'Residential', Home], ['commercial', 'Commercial', Building2]] as [ProjectType, string, typeof Home][])
                  .map(([val, text, Icon]) => (
                    <button key={val} type="button" role="radio" aria-checked={inputs.projectType === val}
                      className={inputs.projectType === val ? 'is-on' : ''} onClick={() => set('projectType', val)}>
                      <Icon size={16} aria-hidden="true" />{text}
                    </button>
                  ))}
              </div>
            </div>

            <fieldset className="sc-assump">
              <legend><Settings2 size={16} aria-hidden="true" /> Calculation assumptions (editable)</legend>
              <p>No tariff or generation values are assumed. Enter the figures applicable to your connection to calculate an estimate.</p>
              <div className="sc-assump-row">
                <Field id="sc-tariff" label="Tariff (₹ / unit)" small error={errors.tariff}>
                  <input className="sc-plain" id="sc-tariff" inputMode="decimal" autoComplete="off" placeholder="Your tariff"
                    value={inputs.tariff} onChange={e => set('tariff', e.target.value)} {...ariaFor('tariff')} />
                </Field>
                <Field id="sc-unitsPerKwp" label="Units / kWp / month" small error={errors.unitsPerKwp}>
                  <input className="sc-plain" id="sc-unitsPerKwp" inputMode="decimal" autoComplete="off" placeholder="Site estimate"
                    value={inputs.unitsPerKwp} onChange={e => set('unitsPerKwp', e.target.value)} {...ariaFor('unitsPerKwp')} />
                </Field>
                <Field id="sc-costPerKwp" label="System cost (₹ / kWp)" small error={errors.costPerKwp}>
                  <input className="sc-plain" id="sc-costPerKwp" inputMode="decimal" autoComplete="off" placeholder="As quoted"
                    value={inputs.costPerKwp} onChange={e => set('costPerKwp', e.target.value)} {...ariaFor('costPerKwp')} />
                </Field>
              </div>
            </fieldset>

            <button type="submit" className="sc-go"><Calculator size={20} /> Calculate Savings <ArrowRight size={20} /></button>
          </form>

          {/* ── Results ── */}
          <section className="sc-results" aria-label="Estimated savings" aria-live="polite">
            <header className="sc-card-hd">
              <span className="sc-badge is-yellow"><LineChart size={24} /></span>
              <div>
                <h2>Estimated Savings</h2>
                <p>{result ? 'Based on the values and assumptions you entered.' : 'Your results will appear here after you calculate.'}</p>
              </div>
            </header>

            <div className="sc-kpis">
              <div className="sc-kpi is-hl">
                <div className="sc-kpi-top"><i><Wallet size={18} /></i>Estimated Monthly Savings</div>
                <strong>{result ? inr(result.monthlySaving) : '₹ —'}</strong>
                <small>per month</small>
              </div>
              <div className="sc-kpi">
                <div className="sc-kpi-top"><i><PiggyBank size={18} /></i>Estimated Annual Savings</div>
                <strong>{result ? inr(result.annualSaving) : '₹ —'}</strong>
                <small>per year</small>
              </div>
              <div className="sc-kpi">
                <div className="sc-kpi-top"><i><Timer size={18} /></i>Estimated Payback Period</div>
                <strong>{result?.paybackYears != null ? oneDecimal(result.paybackYears) : '—'}<em>years</em></strong>
                <small>{result && result.paybackYears == null ? 'add a system cost to estimate' : 'based on your cost input'}</small>
              </div>
              <div className="sc-kpi">
                <div className="sc-kpi-top"><i><Sun size={18} /></i>Recommended Solar System Capacity</div>
                <strong>{result ? oneDecimal(result.capacityKwp) : '—'}<em>kWp</em></strong>
                <small>{result?.capacityProvided ? 'as entered' : 'based on your usage'}</small>
              </div>
            </div>

            <div className="sc-chart">
              <div className="sc-chart-hd">
                <h3>Monthly bill vs. bill with solar</h3>
                <ul>
                  <li><i />Current bill</li>
                  <li><i className="is-solar" />With solar</li>
                </ul>
              </div>
              <div
                className="sc-bars"
                role="img"
                aria-label={result
                  ? `Monthly bill ${inr(result.currentBill)} drops to ${inr(result.billWithSolar)} with solar, shown for six months.`
                  : 'Chart placeholder. Results appear after you calculate.'}
              >
                {MONTHS.map(m => (
                  <div key={m} className="sc-bar-group">
                    <div className="sc-bar-pair">
                      <span className={`sc-bar${result ? ' is-filled' : ''}`} style={{ height: '100%' }} />
                      <span className={`sc-bar is-solar${result ? ' is-filled' : ''}`} style={{ height: `${billH}%` }} />
                    </div>
                    <small>{m}</small>
                  </div>
                ))}
              </div>
              {result && (
                <p className="sc-bars-values">Current bill {inr(result.currentBill)} · With solar {inr(result.billWithSolar)}</p>
              )}
              <div className="sc-msg"><Info size={18} aria-hidden="true" />{!result ? IDLE_MSG : result.capped ? `${CAPPED_MSG} ${DONE_MSG}` : DONE_MSG}</div>
            </div>
          </section>
        </div>
      </section>

      {/* ── Subsidy ── */}
      <section className="sc-sub" aria-labelledby="sc-sub-title">
        <div className="hp-wrap">
          <div className="sc-sub-grid">
            <div className="sc-sub-intro">
              <div className="sc-eyebrow">Subsidy Information</div>
              <h2 id="sc-sub-title">Solar subsidy eligibility</h2>
              <p>Client-provided subsidy figures for eligible residential rooftop solar installations. Our team can guide you through the application process.</p>
            </div>
            {SUBSIDIES.map(s => (
              <article key={s.who} className="sc-sub-card">
                <small>{s.who}</small>
                <h3>{s.name}</h3>
                <div className="sc-amt">{s.amount}</div>
                <p>Subsidy eligibility</p>
                <span className="sc-tag"><Info size={14} aria-hidden="true" />Subject to scheme eligibility</span>
              </article>
            ))}
          </div>
          <div className="sc-note" role="note">
            <AlertTriangle size={20} aria-hidden="true" />
            <p><b>Please note:</b> These are client-provided subsidy figures and not an unconditional guarantee. Actual subsidy approval and amount depend on the applicable scheme requirements. Please verify your eligibility under the applicable scheme. Calculator results are estimates based only on the values you enter.</p>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="sc-steps" aria-label="How it works">
        <div className="hp-wrap sc-steps-grid">
          {STEPS.map(({ icon: Icon, title, text, tone }) => (
            <article key={title} className="sc-step">
              <span className={`sc-badge is-soft ${tone}`}><Icon size={24} /></span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sc-cta-sec" aria-labelledby="sc-cta-title">
        <div className="hp-wrap">
          <div className="sc-cta" style={{ backgroundImage: 'url(/assets/calculator/cta-bg.jpg)' }}>
            <div>
              <div className="sc-eyebrow is-lime">Ready for accurate numbers?</div>
              <h2 id="sc-cta-title">Get a Personalized Solar Quote</h2>
              <p>Our team will assess your requirements and share a detailed quotation for your solar installation.</p>
            </div>
            <button className="hp-btn hp-btn-yellow" onClick={openQuote}><Sun size={20} /> Get a Personalized Solar Quote <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

      <SiteFooter onNavigate={onNavigate} onQuote={openQuote} />
      <QuoteModal open={quoteOpen} topic="" onClose={onQuoteClose} />
    </div>
  );
}
