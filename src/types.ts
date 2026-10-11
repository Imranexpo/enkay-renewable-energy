export type NavPage = 'home' | 'savings-calculator' | 'about' | 'solutions' | 'why-choose-us' | 'projects-showcase' | 'contact';

export type ConnectionCategory = 'residential' | 'commercial' | 'industrial';
export type CalculationMode = 'bill' | 'units';
export type RoofType = 'flat' | 'metal' | 'tiled';
export type GridType = 'ongrid' | 'hybrid' | 'offgrid';

export interface CalculatorState {
  category: ConnectionCategory;
  mode: CalculationMode;
  bill: number;
  units: number;
  area: number;
  roofType: RoofType;
  gridType: GridType;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'industrial' | 'commercial' | 'residential';
  categoryLabel: string;
  proposedTopology: string;
  description: string;
  image: string;
  specs: {
    capacity: string;
    moduleType: string;
    inverterType: string;
    mounting: string;
  };
}
