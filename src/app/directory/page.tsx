"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import CommunityCard from "../components/CommunityCard";
import FilterBar from "../components/FilterBar";
import CompareBar from "../components/CompareBar";

// Dynamic import for MapView (SSR = false)
const MapView = dynamic(() => import("../components/MapView"), { 
  ssr: false,
  loading: () => <div className="h-[600px]" style={{ background: 'var(--color-background-secondary)' }}>Loading map...</div>
});

const allCommunities = [
  {
    name: "The Waterford",
    location: "Newark, NJ",
    county: "essex",
    careType: "assisted-living",
    tier: "platinum" as const,
    score: 92,
    lat: 40.7357,
    lng: -74.1724,
    amenities: ["Private Dining", "Concierge", "Fitness", "Pool"],
    editorialLine: "A chef who trained at the CIA runs this kitchen.",
    slug: "the-waterford",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  },
  {
    name: "Brighton Gardens",
    location: "Watchung, NJ",
    county: "union",
    careType: "assisted-living",
    tier: "gold" as const,
    score: 78,
    lat: 40.6471,
    lng: -74.4379,
    amenities: ["Pool", "Art Studio", "Fitness"],
    editorialLine: "The dining program here is genuinely exceptional.",
    slug: "brighton-gardens-mountainside",
    imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
  },
  {
    name: "Sunrise at West Essex",
    location: "Fair Lawn, NJ",
    county: "bergen",
    careType: "memory-care",
    tier: "silver" as const,
    score: 71,
    lat: 40.9404,
    lng: -74.1318,
    amenities: ["24-Hour Care", "Transportation"],
    editorialLine: "Strong staff-to-resident ratios and thoughtful family communication.",
    slug: "sunrise-west-essex",
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    name: "The Chelsea at Bridgewater",
    location: "Bridgewater, NJ",
    county: "somerset",
    careType: "assisted-living",
    tier: "gold" as const,
    score: 82,
    lat: 40.5956,
    lng: -74.6279,
    amenities: ["Pool", "Fitness Center", "Pet-Friendly"],
    editorialLine: "A welcoming community with strong programming.",
    slug: "the-chelsea-bridgewater",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    name: "Arbor Terrace",
    location: "Morris Plains, NJ",
    county: "morris",
    careType: "assisted-living",
    tier: "gold" as const,
    score: 85,
    lat: 40.8212,
    lng: -74.4404,
    amenities: ["Private Dining", "Transportation", "Fitness"],
    editorialLine: "Excellent staff retention and genuine community feel.",
    slug: "arbor-terrace-morris-plains",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
  {
    name: "The Fremont",
    location: "Edison, NJ",
    county: "middlesex",
    careType: "independent-living",
    tier: "silver" as const,
    score: 68,
    lat: 40.5187,
    lng: -74.4121,
    amenities: ["Library", "Fitness Center", "Pet-Friendly"],
    editorialLine: "Great value for independent living with strong amenities.",
    slug: "the-fremont-edison",
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  },
];

export default function DirectoryPage() {
  const [communities, setCommunities] = useState(allCommunities);
  const [sortBy, setSortBy] = useState("score");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  const handleFilterChange = (filters: any) => {
    let filtered = [...allCommunities];
    
    if (filters.county) {
      filtered = filtered.filter(c => c.county === filters.county);
    }
    if (filters.careType) {
      filtered = filtered.filter(c => c.careType === filters.careType);
    }
    if (filters.tier) {
      filtered = filtered.filter(c => c.tier === filters.tier);
    }
    if (filters.scoreMin > 0) {
      filtered = filtered.filter(c => c.score >= filters.scoreMin);
    }
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(c => 
        filters.amenities.every((a: string) => c.amenities.includes(a))
      );
    }
    
    setCommunities(filtered);
  };

  const sortedCommunities = [...communities].sort((a, b) => {
    if (sortBy === "score") return b.score - a.score;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const counties = [
    { name: "Bergen County", slug: "bergen", count: 45 },
    { name: "Middlesex County", slug: "middlesex", count: 32 },
    { name: "Essex County", slug: "essex", count: 28 },
    { name: "Monmouth County", slug: "monmouth", count: 24 },
    { name: "Morris County", slug: "morris", count: 21 },
    { name: "Union County", slug: "union", count: 18 },
  ];

  return (
    <div className="max-content px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-meta mb-8" style={{ color: 'var(--color-metadata)' }}>
        <Link href="/" className="hover:text-accent-brass transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <span style={{ color: 'var(--color-foreground-muted)' }}>Directory</span>
      </nav>

      <h1 className="text-display mb-6">Browse Communities</h1>
      <p className="text-xl mb-8 max-w-2xl" style={{ color: 'var(--color-foreground-muted)' }}>
        {sortedCommunities.length} communities across New Jersey
      </p>

      {/* Filters */}
      <FilterBar onFilterChange={handleFilterChange} />

      {/* View Toggle & Sort */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setViewMode("grid")}
            className="text-sm px-3 py-2"
            style={{ 
              background: viewMode === "grid" ? 'var(--color-accent-brass)' : 'transparent',
              color: viewMode === "grid" ? 'var(--color-background)' : 'var(--color-foreground-muted)',
              border: '1px solid var(--color-metadata)',
              borderRadius: '2px'
            }}
          >
            Grid
          </button>
          <button 
            onClick={() => setViewMode("map")}
            className="text-sm px-3 py-2"
            style={{ 
              background: viewMode === "map" ? 'var(--color-accent-brass)' : 'transparent',
              color: viewMode === "map" ? 'var(--color-background)' : 'var(--color-foreground-muted)',
              border: '1px solid var(--color-metadata)',
              borderRadius: '2px'
            }}
          >
            Map
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 text-sm"
            style={{ 
              background: 'var(--color-background-secondary)', 
              border: '1px solid var(--color-metadata)',
              color: 'var(--color-foreground)',
              borderRadius: '2px'
            }}
          >
            <option value="score">Burnish Score (High to Low)</option>
            <option value="name">Alphabetical</option>
            <option value="newest">Recently Added</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {viewMode === "grid" ? (
        <>
          {/* Community Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {sortedCommunities.map((community) => (
              <CommunityCard key={community.slug} {...community} />
            ))}
          </div>

          {sortedCommunities.length === 0 && (
            <div className="text-center py-12" style={{ color: 'var(--color-foreground-muted)' }}>
              <p className="text-lg">No communities match your filters.</p>
              <p className="mt-2">Try adjusting your criteria.</p>
            </div>
          )}
        </>
      ) : (
        /* Map View */
        <div className="mb-16">
          <MapView communities={sortedCommunities} />
        </div>
      )}

      {/* Local Knowledge Teaser */}
      <div className="divider mb-12"></div>
      
      <h2 className="text-headline mb-8">Local Knowledge</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {counties.slice(0, 6).map((county) => (
          <Link
            key={county.slug}
            href={`/local-knowledge/${county.slug}`}
            className="card-shadow p-6"
            style={{ 
              background: 'var(--color-background-secondary)',
              borderRadius: '2px'
            }}
          >
            <h3 className="text-lg mb-2">{county.name.replace(' County', '')}</h3>
            <span className="text-meta" style={{ color: 'var(--color-metadata)' }}>
              {county.count} communities
            </span>
          </Link>
        ))}
      </div>

      <CompareBar />
    </div>
  );
}
