import {
  Building2, DraftingCompass, Factory, HardHat, House, Lightbulb, PackageCheck, PlugZap,
  BatteryCharging, Wrench, Zap, type LucideIcon,
} from 'lucide-react';

const A = '/assets/services';

export const SERVICES_HERO_IMAGE = `${A}/hero-technician.jpg`;

export const HERO_SERVICES: { icon: LucideIcon; label: string }[] = [
  { icon: DraftingCompass, label: 'Design Engineering' },
  { icon: PackageCheck, label: 'Procurement' },
  { icon: HardHat, label: 'EPC & Commissioning' },
];

/** The three segment tiles overlapping the hero; `target` is the service card they scroll to. */
export const SEGMENT_TILES: { icon: LucideIcon; title: string; text: string; target: string }[] = [
  { icon: House, title: 'Residential', text: 'Rooftop solar power plants for homes', target: 'svc-01' },
  { icon: Building2, title: 'Commercial', text: 'Solar power plants for businesses', target: 'svc-02' },
  { icon: Factory, title: 'Industrial', text: 'Solar power plants for large-scale operations', target: 'svc-03' },
];

export const SERVICE_CARDS: { icon: LucideIcon; img: string; title: string; text: string }[] = [
  { icon: House, img: `${A}/card-residential-home.jpg`, title: 'Residential Solar Solutions', text: 'Clean, cost-effective solar energy for your home.' },
  { icon: Building2, img: `${A}/card-commercial-rooftop.jpg`, title: 'Commercial Solar Solutions', text: 'Power your business with sustainable energy.' },
  { icon: Factory, img: `${A}/card-industrial.jpg`, title: 'Industrial Solar Solutions', text: 'High-performance solar solutions for large-scale operations.' },
  { icon: DraftingCompass, img: `${A}/card-design-engineers.jpg`, title: 'Design & Engineering', text: 'Customized and efficient solar system designs.' },
  { icon: PackageCheck, img: `${A}/card-procurement.jpg`, title: 'Procurement', text: 'High-quality products from trusted brands.' },
  { icon: HardHat, img: `${A}/card-epc.jpg`, title: 'EPC & Commissioning', text: 'End-to-end project execution and support.' },
  { icon: PlugZap, img: `${A}/card-ongrid-neighbourhood.jpg`, title: 'On-Grid Solar Systems', text: 'Solar power solutions connected to the electricity grid.' },
  { icon: BatteryCharging, img: `${A}/card-offgrid-hut.jpg`, title: 'Off-Grid Solar Systems', text: 'Solar solutions designed for off-grid requirements.' },
  { icon: Wrench, img: `${A}/card-maintenance.jpg`, title: 'Maintenance & Support', text: 'Reliable maintenance and ongoing technical support.' },
];

export const PROCESS_BG = `${A}/process-bg.jpg`;

export const PROCESS_STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Lightbulb, title: 'Concept', text: 'Understanding your site and energy requirements' },
  { icon: DraftingCompass, title: 'Design Engineering', text: 'Customized and efficient solar system design' },
  { icon: PackageCheck, title: 'Procurement', text: 'Quality products from trusted brands' },
  { icon: HardHat, title: 'Construction', text: 'Professional installation of the solar plant' },
  { icon: Zap, title: 'Commissioning', text: 'System commissioning and handover' },
];

export const SERVE_CARDS: { icon: LucideIcon; img: string; title: string; text: string }[] = [
  { icon: House, img: `${A}/card-residential-home.jpg`, title: 'Residential', text: 'Rooftop solar for homes, on-grid and off-grid.' },
  { icon: Building2, img: `${A}/card-commercial-rooftop.jpg`, title: 'Commercial', text: 'Sustainable energy for businesses and commercial buildings.' },
  { icon: Factory, img: `${A}/serve-industrial.jpg`, title: 'Industrial', text: 'Solar PV power plants of any capacity for export to the grid.' },
];

export const CTA_BG = `${A}/cta-bg.jpg`;

