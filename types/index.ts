export interface FilterState {
  contractValue: string[];
  deadline: string[];
  status: string[];
  contractType: string[];
  source: string[];
  country: string[];
  currency: string[];
  language: string[];
}

export interface SavedFilterPreset {
  id: string;
  name: string;
  filters: FilterState;
  createdAt: string;
}

export interface Opportunity {
  id: string;
  title: string;
  buyer: string;
  deadline: string;
  contractValue: string;
  country: string;
  currency: string;
  language: string;
  status: 'open' | 'closing-soon' | 'closed' | 'awarded';
  contractType: string;
  source: string;
  description: string;
  hasProject: boolean;
}

export const FILTER_OPTIONS = {
  contractValue: ['Under £1M', '£1M – £5M', '£5M – £10M', 'Over £10M'],
  deadline: ['Next 7 days', 'Next 30 days', 'Next 90 days'],
  status: ['Open', 'Closing Soon', 'Closed', 'Awarded'],
  contractType: ['Fixed Price', 'Time & Materials', 'Framework', 'Consultancy'],
  source: ['Find a Tender', 'Contracts Finder', 'G-Cloud', 'DOS'],
  country: ['United Kingdom', 'France', 'Germany', 'United States'],
  currency: ['GBP (£)', 'EUR (€)', 'USD ($)'],
  language: ['English', 'French', 'German', 'Spanish'],
} as const;

export const EMPTY_FILTERS: FilterState = {
  contractValue: [],
  deadline: [],
  status: [],
  contractType: [],
  source: [],
  country: [],
  currency: [],
  language: [],
};
