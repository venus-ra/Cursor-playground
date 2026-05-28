'use client';

import { useMemo } from 'react';
import { Opportunity, FilterState, FILTER_OPTIONS } from '@/types';
import { useSavedFilters } from '@/hooks/useSavedFilters';
import { FilterBar } from './FilterBar';
import { OpportunityCard } from './OpportunityCard';
import { Sidebar } from './Sidebar';

const SAMPLE_OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'AI-Driven Education Platform',
    buyer: 'Department of Education',
    deadline: '15th of July 2025 at 11:59 PM',
    contractValue: '£1,500,000.00',
    country: 'United Kingdom',
    currency: 'GBP (£)',
    language: 'English',
    status: 'open',
    contractType: 'Fixed Price',
    source: 'Contracts Finder',
    description:
      'This initiative focuses on creating an innovative e-learning platform designed to improve accessibility and inclusivity in education. The platform will use AI to personalise learning paths for students across all key stages.',
    hasProject: false,
  },
  {
    id: '2',
    title: 'Smart Traffic Management System',
    buyer: 'Ministry of Transport',
    deadline: '10th of August 2025 at 4:00 PM',
    contractValue: '£4,750,000.00',
    country: 'United Kingdom',
    currency: 'GBP (£)',
    language: 'English',
    status: 'open',
    contractType: 'Time & Materials',
    source: 'Find a Tender',
    description:
      'The contract seeks development and deployment of a smart traffic management system utilising AI and IoT sensors to reduce urban congestion. The system will integrate with existing infrastructure across 12 major city centres.',
    hasProject: true,
  },
  {
    id: '3',
    title: 'Environmental Monitoring System',
    buyer: 'Environment Agency',
    deadline: '30th of June 2025 at 3:00 PM',
    contractValue: '£2,100,000.00',
    country: 'United Kingdom',
    currency: 'GBP (£)',
    language: 'English',
    status: 'closing-soon',
    contractType: 'Framework',
    source: 'Contracts Finder',
    description:
      'This project involves creating a comprehensive environmental monitoring and reporting system that leverages satellite imagery, IoT sensors, and machine learning to track air quality, water contamination, and biodiversity metrics.',
    hasProject: false,
  },
  {
    id: '4',
    title: 'National Cybersecurity Operations Centre',
    buyer: 'Cabinet Office',
    deadline: '22nd of September 2025 at 12:00 PM',
    contractValue: '£9,200,000.00',
    country: 'United Kingdom',
    currency: 'GBP (£)',
    language: 'English',
    status: 'open',
    contractType: 'Framework',
    source: 'Find a Tender',
    description:
      'Establishment of a 24/7 national cybersecurity operations centre providing threat intelligence, incident response, and coordinated defence across critical national infrastructure and government departments.',
    hasProject: false,
  },
  {
    id: '5',
    title: 'Automated Border Control Infrastructure',
    buyer: 'Home Office',
    deadline: '5th of December 2025 at 9:00 AM',
    contractValue: '£12,800,000.00',
    country: 'United Kingdom',
    currency: 'GBP (£)',
    language: 'English',
    status: 'open',
    contractType: 'Fixed Price',
    source: 'Find a Tender',
    description:
      'Procurement of AI-powered biometric border control systems to be deployed at 8 major ports of entry. Includes facial recognition, document verification, and real-time risk assessment capabilities.',
    hasProject: false,
  },
  {
    id: '6',
    title: 'Digital Health Records Integration Platform',
    buyer: 'NHS England',
    deadline: '18th of March 2025 at 5:00 PM',
    contractValue: '£3,400,000.00',
    country: 'United Kingdom',
    currency: 'GBP (£)',
    language: 'English',
    status: 'closed',
    contractType: 'Time & Materials',
    source: 'G-Cloud',
    description:
      'Unified digital health records platform enabling seamless data sharing between NHS trusts, GP surgeries, and specialist clinics. Must comply with NHS Data Security and Protection Toolkit standards.',
    hasProject: true,
  },
  {
    id: '7',
    title: 'Renewable Energy Grid Optimisation',
    buyer: 'Department for Energy Security',
    deadline: '14th of November 2025 at 2:00 PM',
    contractValue: '£6,900,000.00',
    country: 'United Kingdom',
    currency: 'GBP (£)',
    language: 'English',
    status: 'open',
    contractType: 'Consultancy',
    source: 'Find a Tender',
    description:
      'Development of an AI-based grid management platform to optimise distribution of renewable energy from offshore wind and solar farms. The solution will predict demand fluctuations and automate load balancing.',
    hasProject: false,
  },
  {
    id: '8',
    title: 'Plateforme de Formation Numérique',
    buyer: 'Ministère de l\'Éducation Nationale',
    deadline: '28th of August 2025 at 6:00 PM',
    contractValue: '€2,300,000.00',
    country: 'France',
    currency: 'EUR (€)',
    language: 'French',
    status: 'open',
    contractType: 'Fixed Price',
    source: 'Find a Tender',
    description:
      'Développement d\'une plateforme nationale de formation numérique pour les enseignants du secondaire. La plateforme intégrera des outils d\'IA pour adapter les parcours de formation aux besoins individuels.',
    hasProject: false,
  },
];

function valueToRange(val: string): [number, number] {
  if (val === 'Under £1M') return [0, 1_000_000];
  if (val === '£1M – £5M') return [1_000_000, 5_000_000];
  if (val === '£5M – £10M') return [5_000_000, 10_000_000];
  if (val === 'Over £10M') return [10_000_000, Infinity];
  return [0, Infinity];
}

function parseContractValue(str: string): number {
  return parseFloat(str.replace(/[^0-9.]/g, '')) * (str.includes(',') ? 1 : 1_000_000);
}

function matchesContractValue(opp: Opportunity, filters: string[]): boolean {
  if (filters.length === 0) return true;
  const raw = parseFloat(opp.contractValue.replace(/[^0-9.]/g, ''));
  return filters.some((f) => {
    const [min, max] = valueToRange(f);
    return raw >= min / 1_000_000 && raw < max / 1_000_000;
  });
}

function applyFilters(opps: Opportunity[], filters: FilterState): Opportunity[] {
  return opps.filter((opp) => {
    if (!matchesContractValue(opp, filters.contractValue)) return false;
    if (filters.status.length > 0) {
      const statusLabel = {
        open: 'Open',
        'closing-soon': 'Closing Soon',
        closed: 'Closed',
        awarded: 'Awarded',
      }[opp.status];
      if (!filters.status.includes(statusLabel)) return false;
    }
    if (filters.contractType.length > 0 && !filters.contractType.includes(opp.contractType)) return false;
    if (filters.source.length > 0 && !filters.source.includes(opp.source)) return false;
    if (filters.country.length > 0 && !filters.country.includes(opp.country)) return false;
    if (filters.currency.length > 0 && !filters.currency.includes(opp.currency)) return false;
    if (filters.language.length > 0 && !filters.language.includes(opp.language)) return false;
    return true;
  });
}

export function OpportunityPage() {
  const {
    presets,
    activeFilters,
    activePreset,
    hasActiveFilters,
    savePreset,
    applyPreset,
    deletePreset,
    renamePreset,
    clearFilters,
    toggleFilterValue,
  } = useSavedFilters();

  const filtered = useMemo(() => applyFilters(SAMPLE_OPPORTUNITIES, activeFilters), [activeFilters]);

  return (
    <div className="flex h-screen overflow-hidden bg-white font-[Inter,_sans-serif]">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top breadcrumb bar */}
        <header className="flex h-[48px] shrink-0 items-center border-b border-[#e3e3e3] px-[24px]">
          <span className="text-[12px] font-medium text-[#9a9a9a]">Projects</span>
        </header>

        {/* Scrollable main content */}
        <main className="flex-1 overflow-y-auto px-[24px] py-[24px]">
          {/* Page heading */}
          <div className="mb-[24px]">
            <h1 className="mb-[4px] text-[20px] font-medium leading-[22px] text-[#1b1b1b]">Opportunities</h1>
            <p className="text-[13px] text-[#565656]">
              Find and qualify high-value RFPs matched to your win profile
            </p>
          </div>

          {/* Filter bar */}
          <div className="mb-[24px]">
            <FilterBar
              activeFilters={activeFilters}
              activePreset={activePreset}
              hasActiveFilters={hasActiveFilters}
              presets={presets}
              onToggle={toggleFilterValue}
              onClear={clearFilters}
              onSave={savePreset}
              onApplyPreset={applyPreset}
              onDeletePreset={deletePreset}
              onRenamePreset={renamePreset}
            />
          </div>

          {/* Results count */}
          <div className="mb-[4px] flex items-center justify-between">
            <p className="text-[12px] text-[#9a9a9a]">
              {filtered.length} opportunit{filtered.length !== 1 ? 'ies' : 'y'}
              {activePreset && (
                <span className="ml-[6px] rounded-full bg-[#EEF2FF] px-[8px] py-[1px] text-[11px] font-medium text-[#3B5BDB]">
                  {activePreset.name}
                </span>
              )}
            </p>
          </div>

          {/* Opportunity list */}
          <div className="rounded-[8px] border border-[#e7e7e7] bg-white">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center gap-[8px] py-[60px] text-center">
                <p className="text-[14px] font-medium text-[#1b1b1b]">No opportunities match your filters</p>
                <p className="text-[12px] text-[#9a9a9a]">Try adjusting or clearing your active filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-[8px] rounded-[5px] border border-[#e3e3e3] px-[14px] py-[6px] text-[12px] font-medium text-[#565656] hover:border-[#c0c0c0]"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filtered.map((opp) => <OpportunityCard key={opp.id} opportunity={opp} />)
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
