import {
  Building2, Factory, HardHat, House, Leaf, PackageCheck, DraftingCompass, Shield, Tag, Wrench, Zap,
  type LucideIcon,
} from 'lucide-react';
import type { NavSection } from '../Navbar';

const A = '/assets/home';

export const HERO_PILLS = ['Authorized Dealer', 'Residential · Commercial · Others', 'Subsidy Assistance'];

export const STEPS = ['Concept', 'Design', 'Procure', 'Build', 'Commission'];

export const BRANDS = [
  { name: 'Adani', src: `${A}/brand-adani.png`, w: 125, h: 43 },
  { name: 'TATA Power Solar', src: `${A}/brand-tata.png`, w: 116, h: 77 },
  { name: 'Waaree', src: `${A}/brand-waaree.png`, w: 185, h: 51 },
  { name: 'Luminous', src: `${A}/brand-luminous.svg`, w: 183, h: 38 },
];

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
