'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { FilterState, FILTER_OPTIONS } from '@/types';

interface FilterChipProps {
  filterKey: keyof FilterState;
  label: string;
  selected: string[];
  onToggle: (key: keyof FilterState, value: string) => void;
}

const KEY_TO_OPTIONS: Record<keyof FilterState, readonly string[]> = FILTER_OPTIONS;

export function FilterChip({ filterKey, label, selected, onToggle }: FilterChipProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const options = KEY_TO_OPTIONS[filterKey];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isActive = selected.length > 0;

  const displayLabel = isActive
    ? selected.length === 1
      ? selected[0]
      : `${selected[0]} +${selected.length - 1}`
    : label;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={[
          'flex h-[32px] items-center gap-[2px] overflow-hidden rounded-[5px] border px-[8px] text-[12px] font-medium transition-colors select-none',
          isActive
            ? 'border-[#3B5BDB] bg-[#EEF2FF] text-[#3B5BDB]'
            : 'border-[#e3e3e3] bg-white text-[#1b1b1b] hover:border-[#c0c0c0]',
        ].join(' ')}
      >
        <span className="whitespace-nowrap">{displayLabel}</span>
        {isActive ? (
          <X
            size={14}
            className="ml-1 shrink-0 cursor-pointer text-[#3B5BDB]"
            onClick={(e) => {
              e.stopPropagation();
              selected.forEach((v) => onToggle(filterKey, v));
            }}
          />
        ) : (
          <ChevronDown size={14} className="ml-0.5 shrink-0 text-[#565656]" />
        )}
      </button>

      {open && (
        <div className="absolute left-0 top-[36px] z-50 min-w-[180px] rounded-[6px] border border-[#e3e3e3] bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-[8px] px-[12px] py-[7px] hover:bg-[#f5f5f5]"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onToggle(filterKey, opt)}
                className="h-[14px] w-[14px] accent-[#3B5BDB]"
              />
              <span className="text-[12px] text-[#1b1b1b]">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
