'use client';

import { useState, useEffect, useCallback } from 'react';
import { FilterState, SavedFilterPreset, EMPTY_FILTERS } from '@/types';

const STORAGE_KEY = 'opportunity-filter-presets';

function isEmptyFilters(filters: FilterState): boolean {
  return Object.values(filters).every((v) => (Array.isArray(v) ? v.length === 0 : !v));
}

export function useSavedFilters() {
  const [presets, setPresets] = useState<SavedFilterPreset[]>([]);
  const [activeFilters, setActiveFilters] = useState<FilterState>(EMPTY_FILTERS);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setPresets(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
  }, []);

  const persistPresets = useCallback((updated: SavedFilterPreset[]) => {
    setPresets(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const savePreset = useCallback(
    (name: string) => {
      const preset: SavedFilterPreset = {
        id: crypto.randomUUID(),
        name: name.trim(),
        filters: { ...activeFilters },
        createdAt: new Date().toISOString(),
      };
      persistPresets([...presets, preset]);
      setActivePresetId(preset.id);
      return preset;
    },
    [activeFilters, presets, persistPresets],
  );

  const applyPreset = useCallback((preset: SavedFilterPreset) => {
    setActiveFilters({ ...preset.filters });
    setActivePresetId(preset.id);
  }, []);

  const deletePreset = useCallback(
    (id: string) => {
      persistPresets(presets.filter((p) => p.id !== id));
      if (activePresetId === id) setActivePresetId(null);
    },
    [presets, activePresetId, persistPresets],
  );

  const renamePreset = useCallback(
    (id: string, name: string) => {
      persistPresets(presets.map((p) => (p.id === id ? { ...p, name: name.trim() } : p)));
    },
    [presets, persistPresets],
  );

  const clearFilters = useCallback(() => {
    setActiveFilters(EMPTY_FILTERS);
    setActivePresetId(null);
  }, []);

  const toggleFilterValue = useCallback((key: keyof FilterState, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[key] as string[];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      return { ...prev, [key]: next };
    });
    setActivePresetId(null);
  }, []);

  const hasActiveFilters = !isEmptyFilters(activeFilters);
  const activePreset = presets.find((p) => p.id === activePresetId) ?? null;

  return {
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
    setActiveFilters,
  };
}
