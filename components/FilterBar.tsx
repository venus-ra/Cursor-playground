'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { FilterState, SavedFilterPreset } from '@/types';
import { FilterChip } from './FilterChip';
import { SavedFiltersDropdown } from './SavedFiltersDropdown';

const FILTER_LABELS: Record<keyof FilterState, string> = {
  contractValue: 'Contract Value',
  deadline: 'Deadline',
  status: 'Status',
  contractType: 'Contract Type',
  source: 'Source',
  country: 'Country',
  currency: 'Currency',
  language: 'Language',
};

const ALL_FILTER_KEYS: (keyof FilterState)[] = [
  'contractValue',
  'deadline',
  'status',
  'contractType',
  'source',
  'country',
  'currency',
  'language',
];

const DEFAULT_VISIBLE = 5;

interface FilterBarProps {
  activeFilters: FilterState;
  activePreset: SavedFilterPreset | null;
  hasActiveFilters: boolean;
  presets: SavedFilterPreset[];
  onToggle: (key: keyof FilterState, value: string) => void;
  onClear: () => void;
  onSave: (name: string) => void;
  onApplyPreset: (preset: SavedFilterPreset) => void;
  onDeletePreset: (id: string) => void;
  onRenamePreset: (id: string, name: string) => void;
}

export function FilterBar({
  activeFilters,
  activePreset,
  hasActiveFilters,
  presets,
  onToggle,
  onClear,
  onSave,
  onApplyPreset,
  onDeletePreset,
  onRenamePreset,
}: FilterBarProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleKeys = showAll ? ALL_FILTER_KEYS : ALL_FILTER_KEYS.slice(0, DEFAULT_VISIBLE);

  return (
    <div className="flex flex-wrap items-center gap-[8px]">
      {/* Saved filters preset button — placed first for prominence */}
      <SavedFiltersDropdown
        presets={presets}
        activePreset={activePreset}
        hasActiveFilters={hasActiveFilters}
        activeFilters={activeFilters}
        onApply={onApplyPreset}
        onSave={onSave}
        onDelete={onDeletePreset}
        onRename={onRenamePreset}
      />

      {/* Thin divider */}
      <div className="h-[20px] w-px bg-[#e3e3e3]" />

      {/* Filter chips */}
      {visibleKeys.map((key) => (
        <FilterChip
          key={key}
          filterKey={key}
          label={FILTER_LABELS[key]}
          selected={activeFilters[key] as string[]}
          onToggle={onToggle}
        />
      ))}

      {/* Show more / show less toggle */}
      <button
        onClick={() => setShowAll((s) => !s)}
        className="flex h-[32px] items-center px-[12px] text-[12px] font-medium text-[#565656] hover:text-[#1b1b1b]"
      >
        {showAll ? 'Show less' : `Show more (${ALL_FILTER_KEYS.length - DEFAULT_VISIBLE})`}
      </button>

      {/* Clear all button — only when filters are active */}
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="flex h-[32px] items-center gap-[4px] rounded-[5px] px-[8px] text-[12px] font-medium text-[#9a9a9a] hover:text-[#1b1b1b]"
        >
          <X size={13} />
          Clear all
        </button>
      )}
    </div>
  );
}
