import { ProjectItem } from '../types';

export const COMPANY_INFO = {
  name: 'ENKAY Renewables Energy',
  shortName: 'ENKAY',
  phone: '+91 63850 82822',
  phoneRaw: '+916385082822',
  email: 'enkayrenewablesenergy@gmail.com',
  address: 'No. 25, 2nd Floor, Lakshmi Talkies Road, Shenoy Nagar (East), Aminjikarai, Chennai – 600 030, Tamil Nadu, India',
  city: 'Aminjikarai, Chennai - 600 030',
  operatingHours: 'Monday – Saturday: 9:00 AM – 6:30 PM IST',
  operatingSunday: 'Sundays: Technical Consultations by Appointment',
  logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxpqVzowuj8snth0lCtzXk2eAsn08ln4dLdpKXR3TYEJ-29fmP-vaARTcx5PcTKK6GooPjXYZet-mvn9iE1jw4X49-JF0JfOLTd2N79ZEQqOt6GbYhUfC2hMrJSdiib1NmkJ23tjtaQoVPYiSMlA5NxroTf8Lm5tBqLndfO1Brq2aPI6yWbZLaedDvBiCdp6fNQR-GzkFjl5obTq557bd6XVaAeyc5dVrB0K0XeAmPcK9wwW5KGPJXZA',
  heroBannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADMda7ZxajQh894fk20-pDqUuRHvIGvl5g4AVsMwWwpA_momQBGRkUIGNvX2URP7j-tzCC6DYKIKNeVF0EujJOJztm3OzRUPIWGzmRrXJt4fXK6FGMXGr0rFErsqtLhR4pnn4N3NZrEx-zZVQKeHvC_dmB-6sjAF859SsYZA4IsDZX3XBnNcJYTaznEtm_0O-d9v3UWv6Jj8ltqJxkdYMbQGhJ2K0eJuZW73QOElz1iPgw_CAVT5Z_rQ',
  aboutBannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-6RA_bL6XZMPlw_1HHcoO9pUu2yyfYFyruEdSnN8v7pBNQMA19yh2aUWVpoGitPkliY05s--tx3h40v5XnoKHYGNGxdadyzlItMimXCTOcfrwe_mJQOw1e-5RQHJG-d063mQb6ydn_g4SQ0FgGyy3SzPETgpZZrqeTg9nzWmolBSOC_I3BbD-1SE9qUQV7DJnUjq7DVZ8EzUnOLHapVejTA-tbRs6PEYi02sbdYvhmaklK3dHC5LTxQ',
  industrialBannerUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBw3lih3j17WmpZDVH-vsbYWp4AYBjQmZzm-z2CDbK-EpRzMHEaqK2FLnje9DCUjZvfMMdtH1Z95mlyhjrTeMoFxBwn5ujEWnk5RrERuDsgWtdeHVHx4-BoZsLm5YX1laVoUFwNe6S8WkTqODbmXAFmTbftmbD2hcCpojvR0nb_S3OYGPFeRtBOdDYqi0xXC-ypsK-TkPRE8__MCiv1CoXIN3Fq5fqcjZs0oJw6Bf5qCP0USMmwGrtkzQ',
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'industrial-megawatt',
    title: 'High-Capacity Industrial Park',
    category: 'industrial',
    categoryLabel: 'Industrial Topology',
    proposedTopology: 'Megawatt Class',
    description: 'Megawatt-class metal shed rooftop system engineered for manufacturing warehouses requiring daytime continuous base-load offsetting.',
    image: COMPANY_INFO.industrialBannerUrl,
    specs: {
      capacity: '1,200 kWp (1.2 MWp)',
      moduleType: '550Wp Tier-1 Monocrystalline Bifacial',
      inverterType: 'Multi-MPPT High-Voltage String Inverters (125 kW)',
      mounting: 'Hot-Dip Galvanized Metal Roof Rail Clamps'
    }
  },
  {
    id: 'commercial-office',
    title: 'Commercial Office Complex',
    category: 'commercial',
    categoryLabel: 'Commercial Hub',
    proposedTopology: '100 kW+ Multi-Tier',
    description: 'Optimized multi-tier rooftop PV array with smart safety inverters, structural aerodynamic ballast mounts, and live yield telemetry.',
    image: COMPANY_INFO.heroBannerUrl,
    specs: {
      capacity: '120 kWp Rooftop Grid-Tie',
      moduleType: '545Wp High-Yield Half-Cut Perc',
      inverterType: 'IP66 Industrial Smart Cloud Inverters',
      mounting: 'Aerodynamic Concrete Ballasted Structure'
    }
  },
  {
    id: 'architectural-residence',
    title: 'Architectural Residence',
    category: 'residential',
    categoryLabel: 'Residential Villa',
    proposedTopology: '10 kW Hybrid Array',
    description: 'Sleek all-black monocrystalline modules seamlessly integrated into residential roof profiles, delivering silent, self-sustaining green electricity.',
    image: COMPANY_INFO.aboutBannerUrl,
    specs: {
      capacity: '10 kWp Hybrid Net-Metered Array',
      moduleType: 'All-Black N-Type TopCon 440Wp Modules',
      inverterType: 'Hybrid Bi-directional Inverter with LFP Battery Bank',
      mounting: 'Elevated Super-Structure (RCC Terrace Usable Space)'
    }
  }
];

export const FAQS = [
  {
    question: 'How does net metering work in Tamil Nadu with TANGEDCO?',
    answer: 'Under TNERC net metering guidelines, a bi-directional energy meter records both the power exported to the TANGEDCO grid during sunny daytime hours and the electricity imported at night. At the end of each billing cycle, your imported units are subtracted from your exported solar credits, and you only pay for the net residual balance.'
  },
  {
    question: 'How much rooftop space do I need per kW of solar panels?',
    answer: 'With modern high-efficiency Tier-1 monocrystalline half-cut or bifacial modules (540Wp - 580Wp), you require approximately 80 to 100 square feet of completely shadow-free rooftop space per kWp. A typical 5.0 kWp home system comfortably fits on 400 to 480 sq.ft of flat RCC roof.'
  },
  {
    question: 'Are subsidies available under PM Surya Ghar Muft Bijli Yojana?',
    answer: 'Yes! For residential installations, the Central Government offers direct Central Financial Assistance (CFA): ₹30,000 for 1 kWp, ₹60,000 for 2 kWp, and up to ₹78,000 for systems 3 kWp and above. ENKAY facilitates the complete portal registration, vendor empaneled documentation, and fast-track subsidy release.'
  },
  {
    question: 'What is the lifespan and degradation rate of Tier-1 solar modules?',
    answer: 'ENKAY deploys only Tier-1 photovoltaic modules backed by a 25-to-30-year linear performance warranty. Degradation in year one is under 2%, followed by a tiny 0.45% - 0.55% annual loss thereafter, guaranteeing that your plant will continue generating at >84% of its rated capacity even into year 25.'
  }
];
