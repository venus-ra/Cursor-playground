'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Bookmark, BookmarkCheck, ChevronDown, Trash2, Check, Plus } from 'lucide-react';
import { SavedFilterPreset, FilterState } from '@/types';

interface SavedFiltersDropdownProps {
  presets: SavedFilterPreset[];
  activePreset: SavedFilterPreset | null;
  hasActiveFilters: boolean;
  onApply: (preset: SavedFilterPreset) => void;
  onSave: (name: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, name: string) => void;
  activeFilters: FilterState;
}

function countActiveFilters(filters: FilterState): number {
  return Object.values(filters).reduce((n, v) => n + (Array.isArray(v) ? v.length : v ? 1 : 0), 0);
}

function PresetFilterSummary({ filters }: { filters: FilterState }) {
  const parts: string[] = [];
  (Object.entries(filters) as [keyof FilterState, string[]][]).forEach(([, v]) => {
    if (v.length > 0) parts.push(...v);
  });
  if (parts.length === 0) return <span className="text-[11px] text-[#9a9a9a]">No filters</span>;
  const shown = parts.slice(0, 3);
  const rest = parts.length - shown.length;
  return (
    <span className="text-[11px] text-[#565656]">
      {shown.join(', ')}
      {rest > 0 && ` +${rest} more`}
    </span>
  );
}

export function SavedFiltersDropdown({
  presets,
  activePreset,
  hasActiveFilters,
  onApply,
  onSave,
  onDelete,
  onRename,
  activeFilters,
}: SavedFiltersDropdownProps) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const saveInputRef = useRef<HTMLInputElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSaving(false);
        setRenamingId(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (saving && saveInputRef.current) saveInputRef.current.focus();
  }, [saving]);

  useEffect(() => {
    if (renamingId && renameInputRef.current) renameInputRef.current.focus();
  }, [renamingId]);

  const handleSave = useCallback(() => {
    const name = saveName.trim();
    if (!name) return;
    onSave(name);
    setSaveName('');
    setSaving(false);
    setOpen(false);
  }, [saveName, onSave]);

  const handleRename = useCallback(
    (id: string) => {
      if (renameValue.trim()) onRename(id, renameValue);
      setRenamingId(null);
    },
    [renameValue, onRename],
  );

  const activeCount = countActiveFilters(activeFilters);
  const isActive = !!activePreset || hasActiveFilters;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={[
          'flex h-[32px] items-center gap-[6px] rounded-[5px] border px-[10px] text-[12px] font-medium transition-colors select-none',
          activePreset
            ? 'border-[#3B5BDB] bg-[#3B5BDB] text-white'
            : hasActiveFilters
              ? 'border-[#3B5BDB] bg-[#EEF2FF] text-[#3B5BDB]'
              : 'border-[#e3e3e3] bg-white text-[#1b1b1b] hover:border-[#c0c0c0]',
        ].join(' ')}
        title="Saved filter presets"
      >
        {activePreset ? (
          <BookmarkCheck size={13} className="shrink-0" />
        ) : (
          <Bookmark size={13} className="shrink-0 text-[#565656]" style={activePreset ? {} : hasActiveFilters ? { color: '#3B5BDB' } : {}} />
        )}
        <span className="whitespace-nowrap max-w-[120px] truncate">
          {activePreset ? activePreset.name : 'Saved filters'}
        </span>
        {!activePreset && activeCount > 0 && (
          <span className="flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#3B5BDB] px-[4px] text-[10px] font-semibold text-white">
            {activeCount}
          </span>
        )}
        {presets.length > 0 && <ChevronDown size={13} className={`shrink-0 ${activePreset ? 'text-white' : 'text-[#565656]'}`} />}
      </button>

      {open && (
        <div className="absolute left-0 top-[38px] z-50 w-[280px] rounded-[8px] border border-[#e3e3e3] bg-white shadow-[0_8px_24px_rgba(0,0,0,0.10)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#f0f0f0] px-[14px] py-[10px]">
            <span className="text-[12px] font-semibold text-[#1b1b1b]">Filter presets</span>
            <span className="text-[11px] text-[#9a9a9a]">{presets.length} saved</span>
          </div>

          {/* Preset list */}
          <div className="max-h-[260px] overflow-y-auto">
            {presets.length === 0 ? (
              <div className="flex flex-col items-center gap-[6px] px-[14px] py-[20px] text-center">
                <Bookmark size={20} className="text-[#c0c0c0]" />
                <p className="text-[12px] text-[#9a9a9a]">No saved presets yet.</p>
                <p className="text-[11px] text-[#b0b0b0]">Apply filters then save them for quick reuse.</p>
              </div>
            ) : (
              presets.map((preset) => (
                <div
                  key={preset.id}
                  className={[
                    'group relative flex cursor-pointer flex-col gap-[2px] px-[14px] py-[9px] transition-colors',
                    activePreset?.id === preset.id
                      ? 'bg-[#EEF2FF]'
                      : 'hover:bg-[#f9f9f9]',
                  ].join(' ')}
                  onMouseEnter={() => setHoveredId(preset.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => {
                    if (renamingId !== preset.id) {
                      onApply(preset);
                      setOpen(false);
                    }
                  }}
                >
                  <div className="flex items-center gap-[6px]">
                    {activePreset?.id === preset.id && (
                      <Check size={12} className="shrink-0 text-[#3B5BDB]" />
                    )}
                    {renamingId === preset.id ? (
                      <input
                        ref={renameInputRef}
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleRename(preset.id);
                          if (e.key === 'Escape') setRenamingId(null);
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 rounded border border-[#3B5BDB] bg-white px-[6px] py-[2px] text-[12px] outline-none"
                      />
                    ) : (
                      <span
                        className={`flex-1 truncate text-[12px] font-medium ${
                          activePreset?.id === preset.id ? 'text-[#3B5BDB]' : 'text-[#1b1b1b]'
                        }`}
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          setRenamingId(preset.id);
                          setRenameValue(preset.name);
                        }}
                        title="Double-click to rename"
                      >
                        {preset.name}
                      </span>
                    )}

                    {hoveredId === preset.id && renamingId !== preset.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(preset.id);
                        }}
                        className="ml-auto shrink-0 rounded p-[3px] text-[#9a9a9a] hover:bg-red-50 hover:text-red-500"
                        title="Delete preset"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                  <PresetFilterSummary filters={preset.filters} />
                </div>
              ))
            )}
          </div>

          {/* Save current filters section */}
          {hasActiveFilters && (
            <>
              <div className="border-t border-[#f0f0f0]" />
              {saving ? (
                <div className="flex items-center gap-[8px] px-[14px] py-[10px]">
                  <input
                    ref={saveInputRef}
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSave();
                      if (e.key === 'Escape') {
                        setSaving(false);
                        setSaveName('');
                      }
                    }}
                    placeholder="Preset name…"
                    className="flex-1 rounded-[5px] border border-[#e3e3e3] px-[8px] py-[5px] text-[12px] outline-none placeholder:text-[#b0b0b0] focus:border-[#3B5BDB]"
                  />
                  <button
                    onClick={handleSave}
                    disabled={!saveName.trim()}
                    className="flex h-[28px] items-center justify-center rounded-[5px] bg-[#3B5BDB] px-[10px] text-[11px] font-semibold text-white disabled:opacity-40"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSaving(true);
                  }}
                  className="flex w-full items-center gap-[8px] px-[14px] py-[10px] text-left text-[12px] font-medium text-[#3B5BDB] hover:bg-[#f5f7ff]"
                >
                  <Plus size={14} />
                  Save current filters as preset
                  {activeCount > 0 && (
                    <span className="ml-auto text-[11px] text-[#9a9a9a]">{activeCount} active</span>
                  )}
                </button>
              )}
            </>
          )}

          {/* Footer hint */}
          {!hasActiveFilters && presets.length > 0 && (
            <div className="border-t border-[#f0f0f0] px-[14px] py-[8px]">
              <p className="text-[11px] text-[#b0b0b0]">Apply filters above to save a new preset.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
