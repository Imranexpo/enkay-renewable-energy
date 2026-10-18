import {
  ArrowDownToLine, AudioWaveform, BatteryCharging, Cable, CloudLightning, Hash, LayoutGrid, Plug, PlugZap, Sun, Unplug, type LucideIcon,
} from 'lucide-react';

const P = '/assets/products';

// Hero / CTA backdrops and two category photos could not be pulled from Figma (MCP call limit),
// so they reuse the closest photos already shipped with the project.
export const PRODUCTS_HERO_IMAGE = '/assets/about/hero-solar-farm.jpg';
export const PRODUCTS_CTA_BG = '/assets/services/process-bg.jpg';

export interface Category {
  icon: LucideIcon;
  img: string;
  title: string;
  side?: 'dc' | 'ac';
}

export const CATEGORIES: Category[] = [
  { icon: LayoutGrid, img: `${P}/cat-modules.png`, title: 'Solar PV Modules' },
  { icon: PlugZap, img: `${P}/cat-ongrid.png`, title: 'On-Grid Solar Inverters' },
  { icon: BatteryCharging, img: `${P}/cat-offgrid.jpg`, title: 'Off-Grid Solar Inverters' },
  { icon: Sun, img: `${P}/cat-dcdb.jpg`, title: 'DCDB', side: 'dc' },
  { icon: AudioWaveform, img: `${P}/cat-acdb.jpg`, title: 'ACDB', side: 'ac' },
  { icon: Cable, img: `${P}/cat-dc-cables.jpg`, title: 'Solar DC Cables' },
  { icon: Unplug, img: `${P}/cat-ac-cables.jpg`, title: 'Solar AC Cables' },
  { icon: Hash, img: `${P}/cat-mounting.png`, title: 'Mounting Structures' },
  { icon: ArrowDownToLine, img: `${P}/cat-earthing-system.jpg`, title: 'Earthing System' },
  { icon: CloudLightning, img: `${P}/cat-lightning.jpg`, title: 'Lightning Protection' },
  { icon: Plug, img: `${P}/cat-accessories.jpg`, title: 'Electrical Accessories' },
];

export const MODULE_SPEC = {
  range: '3 – 880',
  unit: 'Wp',
  text: 'Full range of solar photovoltaic modules from automatic production lines, manufactured in India.',
  rows: [
    ['Quoted module', 'DCR 550 Wp'],
    ['Technology', 'TOPCon / Bifacial'],
    ['Quoted brands', 'Rayzon / Vikram'],
  ],
};

export const CERT_SPEC = {
  note: 'All modules of 10 Wp and above.',
  rows: [
    ['TUV certified', 'IEC 61215'],
    ['TUV certified', 'IEC 61730-2'],
    ['ETL Intertek', 'UL 1703'],
  ],
  badges: ['TUV', 'ETL Intertek'],
};

// export const INVERTER_SPEC = {
//   rows: [
//     ['Quoted inverter', 'VSole / Polycab'],
//     ['Rating', '5 kWp, single phase'],
//     ['Type', 'Grid-tied, on-grid'],
//     ['Monitoring', 'Cloud RMS'],
//     ['Compliance', 'BIS certified'],
//     ['Also available', 'On-grid & off-grid inverters'],
//   ],
// };

interface BomRow { item: string; brand: string | null; spec: string | null; unit: string; qty: number }

export const BOM: BomRow[] = [
  { item: 'Solar Panel – DCR', brand: 'Rayzon / Vikram', spec: 'DCR 550 Wp, TOPCon / Bifacial', unit: 'Nos.', qty: 9 },
  { item: 'Solar Inverter', brand: 'VSole / Polycab', spec: '5 kWp grid-tied, on-grid inverter, single phase, with cloud RMS, BIS certified', unit: 'Nos.', qty: 1 },
  { item: 'DCDB – 1 In / 1 Out', brand: 'Sundrop', spec: '5 kWp', unit: 'Nos.', qty: 1 },
  { item: 'ACDB – Single Phase', brand: 'Sundrop', spec: '5 kWp', unit: 'Nos.', qty: 1 },
  { item: 'Earthing Rod', brand: 'Sundrop', spec: '17.2 mm diameter, 1 metre long, copper bonded', unit: 'Nos.', qty: 3 },
  { item: 'Earthing Backfill Compound', brand: 'Sundrop', spec: 'Chemical compound, 15 kg each', unit: 'Nos.', qty: 3 },
  { item: 'Earthing Chamber', brand: null, spec: null, unit: 'Nos.', qty: 3 },
  { item: 'Lightning Arrestor – Conventional Spike Type', brand: 'Sundrop', spec: '16 mm diameter, 1.2 metres long, conventional type with 5 spikes, copper banded', unit: 'Nos.', qty: 1 },
  { item: 'MC4 Connector', brand: 'Ningbo', spec: 'UV-resistant connectors suitable for up to 4 sq. mm, compatible with 1000 V / 30 A, UV sustainable as per IEC 62930', unit: 'Pairs (+ve and -ve)', qty: 4 },
  { item: 'Aluminium Ring-Type Lugs', brand: 'Reputed brand', spec: '10 sq. mm, suitable for earthing and module-to-module connections', unit: 'Nos.', qty: 10 },
  { item: 'Copper Ring-Type Lugs', brand: 'Reputed brand', spec: 'Suitable for 1C × 16 sq. mm cable', unit: 'Nos.', qty: 10 },
  { item: 'Electrical Tape', brand: 'Reputed brand', spec: 'Red × 1, Black × 1, Green × 1', unit: 'Set', qty: 1 },
  { item: 'Cable Ties', brand: 'Reputed brand', spec: 'Black, UV-protected', unit: 'Set', qty: 1 },
  { item: 'Earthing Nut-Bolt Set', brand: 'Reputed brand', spec: 'GI earthing nut-bolt set', unit: 'Set', qty: 1 },
  { item: 'DC Cable – Black', brand: 'Polycab / Microtek', spec: '1C solar-grade XLPO-insulated cable, FRLS, PV outer sheath, UV-resistant, 1.5 kV DC grade, heavy-duty PVC inner sheath, conforming to IS 1554, temperature range −40°C to +90°C', unit: 'Metres', qty: 30 },
  { item: 'DC Cable – Red', brand: 'Polycab / Microtek', spec: '1C solar-grade XLPO-insulated cable, FRLS, PV outer sheath, UV-resistant, 1.5 kV DC grade, heavy-duty PVC inner sheath, conforming to IS 1554, temperature range −40°C to +90°C', unit: 'Metres', qty: 30 },
  { item: 'Earthing Cable – Green', brand: 'Polycab / Microtek', spec: '1C × 16 sq. mm aluminium flexible cable for ACDB, DCDB and inverter', unit: 'Metres', qty: 50 },
  { item: 'Solar Panel Mounting Structures', brand: null, spec: 'GI, pre-galvanized / post-galvanized hot-dip type', unit: 'Set', qty: 1 },
  { item: 'AC Cable – Inverter to ACDB to Distribution Panel', brand: 'Polycab / Havells', spec: '2C × 4 sq. mm copper flexible cable, heavy-duty, UV-resistant PVC Type A, FRLS', unit: 'Metres', qty: 10 },
];

export const OTHER_OPTIONS = [
  'Amaze or Eastman and Polycab / Microtek on-grid inverter',
  'Microtek, UTL and Eastman panels',
  '6 sq. mm DC cable — 100 m',
  '4 sq. mm AC cable — 90 m',
  'Earth rod — 2',
  'Lightning arrestor — 1',
  'Net meter, AE and associated fee',
  'GI structure',
  'Chemical bag — 1',
  'ACDB / DCDB — 1 set',
  'Earthing chamber — 2',
  'Installation',
  'Electrical accessories',
  'Civil work',
];
