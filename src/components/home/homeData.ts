import {
  Building2, Factory, HardHat, House, Leaf, PackageCheck, DraftingCompass, Shield, Tag, Wrench, Zap,
  type LucideIcon,
} from 'lucide-react';
import type { NavSection } from '../Navbar';

const A = '/assets/home';

export const HERO_PILLS = ['Authorized Dealer', 'Residential · Commercial · Others', 'Subsidy Assistance'];

export const STEPS = ['Concept', 'Design', 'Procure', 'Build', 'Commission'];

export type Brand = {
  name: string;
  slug: string;
  /** Logo file exported from the Figma design (public/assets/brands). */
  src?: string;
  /** Wordmark lines, used only while a brand has no logo file. */
  mark?: [string, string?];
};

const L = '/assets/brands';

const ADANI: Brand = { name: 'Adani Solar', slug: 'adani', src: `${L}/adani.png` };
const TATA: Brand = { name: 'Tata Power Solaroof', slug: 'tata', src: `${L}/tata.png` };
const VIKRAM: Brand = { name: 'Vikram Solar', slug: 'vikram', src: `${L}/vikram.png` };
const UTL: Brand = { name: 'UTL Solar', slug: 'utl', src: `${L}/utl.png` };
const MICROTEK: Brand = { name: 'Microtek', slug: 'microtek', src: `${L}/microtek.png` };
const AVAADA: Brand = { name: 'Avaada', slug: 'avaada', src: `${L}/avaada.png` };
const AMAZE: Brand = { name: 'Amaze Solar', slug: 'amaze', src: `${L}/amaze.png` };
const PREMIER: Brand = { name: 'Premier Energies', slug: 'premier', src: `${L}/premier.png` };
const DEYE: Brand = { name: 'Deye', slug: 'deye', src: `${L}/deye.png` };
const WAAREE: Brand = { name: 'Waaree', slug: 'waaree', src: `${L}/waaree.png` };
const POLYCAB: Brand = { name: 'Polycab', slug: 'polycab', mark: ['POLYCAB'] };
const LUMINOUS: Brand = { name: 'Luminous', slug: 'luminous', src: `${A}/brand-luminous.svg` };

export const PANEL_BRANDS: Brand[] = [ADANI, TATA, VIKRAM, UTL, MICROTEK, AVAADA, AMAZE, PREMIER, WAAREE];
export const INVERTER_BRANDS: Brand[] = [AMAZE, DEYE, MICROTEK, POLYCAB, LUMINOUS];

export const WHY_POINTS: { icon: LucideIcon; yellow?: boolean; title: string; text: string }[] = [
  { icon: Tag, yellow: true, title: 'Affordable & Cost-Effective Solutions', text: 'Reduce your electricity bills and get the best value.' },
  { icon: Shield, title: 'High-Quality Products with Warranty', text: 'Only top-grade solar panels, inverters, cables and accessories.' },
  { icon: Wrench, title: 'Expert Installation & Timely Service', text: 'Professional installation and reliable after-sales support.' },
  { icon: Zap, yellow: true, title: 'Helps You Save Up to 90% on Electricity Bills', text: 'Significant savings for homes, businesses and industries.' },
  { icon: Leaf, title: 'One-Step Towards a Green Future', text: 'Clean energy for a sustainable tomorrow.' },
];

export const SOLUTIONS: { icon: LucideIcon; img: string; title: string; text: string }[] = [
  { icon: House, img: `${A}/sol-residential.jpg`, title: 'Residential Solar', text: 'Clean, cost-effective solar energy for your home.' },
  { icon: Building2, img: `${A}/sol-commercial.jpg`, title: 'Commercial Solar', text: 'Power your business with sustainable energy.' },
  { icon: Factory, img: `${A}/sol-industrial.jpg`, title: 'Industrial Solar', text: 'High-performance solar solutions for large-scale operations.' },
  { icon: DraftingCompass, img: `${A}/sol-design.jpg`, title: 'Design & Engineering', text: 'Customized and efficient solar system designs.' },
  { icon: PackageCheck, img: `${A}/sol-procurement.jpg`, title: 'Procurement', text: 'High-quality products from trusted brands.' },
  { icon: HardHat, img: `${A}/sol-epc.jpg`, title: 'EPC & Commissioning', text: 'End-to-end project execution and support.' },
];

export const PRODUCTS = [
  { img: `${A}/prod-panels.jpg`, title: 'Solar Panels' },
  { img: `${A}/prod-inverters.jpg`, title: 'On-Grid Inverters' },
  { img: `${A}/prod-cables.jpg`, title: 'Solar Cables' },
  { img: `${A}/prod-mounting.jpg`, title: 'Mounting Structures' },
  { img: `${A}/prod-bos.jpg`, title: 'Balance of System Components' },
];

export const FOOTER_LINKS: { label: string; section?: NavSection; quote?: boolean }[] = [
  { label: 'Home', section: 'home' },
  { label: 'About Us', section: 'about' },
  { label: 'Services & Solutions', section: 'services' },
  { label: 'Products & Brands', section: 'products' },
  { label: 'Solar Savings Calculator', section: 'calculator' },
  { label: 'Contact Us', section: 'contact' },
  { label: 'Get a Quote', quote: true },
];

/** Page anchor each navbar section scrolls to (home scrolls to top). */
export const SECTION_ANCHORS: Partial<Record<NavSection, string>> = {
  about: 'about',
  services: 'services',
  products: 'products',
  calculator: 'calculator',
  contact: 'contact',
};
