"use client";

import { useState, useEffect } from "react";

interface FilterState {
  county: string;
  careType: string;
  tier: string;
  scoreMin: number;
  amenities: string[];
}

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

const counties = [
  { name: "All Counties", slug: "" },
  { name: "Bergen", slug: "bergen" },
  { name: "Middlesex", slug: "middlesex" },
  { name: "Essex", slug: "essex" },
  { name: "Monmouth", slug: "monmouth" },
  { name: "Morris", slug: "morris" },
  { name: "Union", slug: "union" },
];

const careTypes = [
  { name: "All Care Types", slug: "" },
  { name: "Assisted Living", slug: "assisted-living" },
  { name: "Memory Care", slug: "memory-care" },
  { name: "Independent Living", slug: "independent-living" },
  { name: "Skilled Nursing", slug: "skilled-nursing" },
];

const tiers = [
  { name: "All Tiers", slug: "" },
  { name: "Platinum", slug: "platinum" },
  { name: "Gold", slug: "gold" },
  { name: "Silver", slug: "silver" },
  { name: "Bronze", slug: "bronze" },
  { name: "In Assay", slug: "in-assay" },
];

const amenitiesList = [
  "Private Dining",
  "Concierge",
  "Fitness Center",
  "Pool",
  "Pet-Friendly",
  "Transportation",
  "Art Studio",
  "Library",
];

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    county: "",
    careType: "",
    tier: "",
    scoreMin: 0,
    amenities: [],
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (key: keyof FilterState, value: string | number | string[]) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    handleChange("amenities", newAmenities);
  };

  const clearFilters = () => {
    const empty = { county: "", careType: "", tier: "", scoreMin: 0, amenities: [] };
    setFilters(empty);
    onFilterChange(empty);
  };

  const activeCount = [
    filters.county,
    filters.careType,
    filters.tier,
    filters.scoreMin > 0 ? "score" : "",
    ...filters.amenities,
  ].filter(Boolean).length;

  return (
    <div 
      className="p-6 mb-8"
      style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
    >
      {/* Top Row - Always Visible */}
      <div className="flex flex-wrap items-center gap-4">
        <select
          value={filters.county}
          onChange={(e) => handleChange("county", e.target.value)}
          className="px-4 py-2 text-sm"
          style={{ 
            background: 'var(--color-background)', 
            border: '1px solid var(--color-metadata)',
            color: 'var(--color-foreground)',
            borderRadius: '2px'
          }}
        >
          {counties.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>

        <select
          value={filters.careType}
          onChange={(e) => handleChange("careType", e.target.value)}
          className="px-4 py-2 text-sm"
          style={{ 
            background: 'var(--color-background)', 
            border: '1px solid var(--color-metadata)',
            color: 'var(--color-foreground)',
            borderRadius: '2px'
          }}
        >
          {careTypes.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>

        <select
          value={filters.tier}
          onChange={(e) => handleChange("tier", e.target.value)}
          className="px-4 py-2 text-sm"
          style={{ 
            background: 'var(--color-background)', 
            border: '1px solid var(--color-metadata)',
            color: 'var(--color-foreground)',
            borderRadius: '2px'
          }}
        >
          {tiers.map((t) => (
            <option key={t.slug} value={t.slug}>{t.name}</option>
          ))}
        </select>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm px-4 py-2"
          style={{ 
            border: '1px solid var(--color-metadata)',
            color: isOpen ? 'var(--color-accent-brass)' : 'var(--color-foreground-muted)',
            borderRadius: '2px'
          }}
        >
          {filters.amenities.length > 0 
            ? `Amenities (${filters.amenities.length})` 
            : "Amenities"}
        </button>

        {activeCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm px-4 py-2"
            style={{ color: 'var(--color-accent-brass)' }}
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {isOpen && (
        <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--color-metadata)' }}>
          {/* Score Range */}
          <div className="mb-6">
            <label className="text-label block mb-3" style={{ color: 'var(--color-metadata)' }}>
              Minimum Score: {filters.scoreMin}+
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={filters.scoreMin}
              onChange={(e) => handleChange("scoreMin", parseInt(e.target.value))}
              className="w-full"
              style={{ accentColor: 'var(--color-accent-brass)' }}
            />
            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--color-metadata)' }}>
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="text-label block mb-3" style={{ color: 'var(--color-metadata)' }}>
              Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map((amenity) => (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className="text-sm px-3 py-1"
                  style={{ 
                    background: filters.amenities.includes(amenity) 
                      ? 'var(--color-accent-brass)' 
                      : 'var(--color-background)',
                    color: filters.amenities.includes(amenity) 
                      ? 'var(--color-background)' 
                      : 'var(--color-foreground-muted)',
                    border: '1px solid var(--color-metadata)',
                    borderRadius: '2px'
                  }}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
