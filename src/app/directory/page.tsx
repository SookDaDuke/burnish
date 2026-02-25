"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import CommunityCard from "../components/CommunityCard";
import FilterBar from "../components/FilterBar";
import CompareBar from "../components/CompareBar";

const MapView = dynamic(() => import("../components/MapView"), { 
  ssr: false,
  loading: () => <div className="h-[600px]" style={{ background: 'var(--color-background-secondary)' }}>Loading map...</div>
});

interface Facility {
  name: string;
  slug: string;
  city: string;
  county: string;
  state: string;
  zip: string;
  phone: string;
  website_url: string;
  rating_avg: number;
  review_count: number;
  facility_type: string[];
}

export default function DirectoryPage() {
  const [communities, setCommunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [sortBy, setSortBy] = useState("score");
  const [selectedCounty, setSelectedCounty] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  useEffect(() => {
    async function fetchFacilities() {
      const res = await fetch(
        "https://cfgffbqwtrpnhwjsuued.supabase.co/rest/v1/facilities?select=*",
        {
          headers: {
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZ2ZmYnF3dHJwbmh3anN1dWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MTI4NTksImV4cCI6MjA4NzE4ODg1OX0.OfNTgzQRMwUAa0r0XVD-iRarxMVNKeVEVdrEtkJUlZY"
          }
        }
      );
      const data = await res.json();
      
      const formatted = data.map((f: Facility) => ({
        name: f.name,
        location: `${f.city}, ${f.state}`,
        county: f.county?.toLowerCase() || "",
        careType: f.facility_type?.[0] || "assisted-living",
        tier: f.rating_avg >= 4.5 ? "gold" as const : f.rating_avg >= 4.0 ? "silver" as const : "bronze" as const,
        score: Math.round((f.rating_avg || 0) * 20) || 75,
        lat: 40.7 + Math.random() * 0.2,
        lng: -74.3 + Math.random() * 0.2,
        amenities: [],
        editorialLine: "View community details and photos.",
        slug: f.slug,
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
        phone: f.phone,
        website: f.website_url,
      }));
      
      setCommunities(formatted);
      setLoading(false);
    }
    fetchFacilities();
  }, []);

  const filtered = communities.filter(c => 
    (selectedCounty === "all" || c.county === selectedCounty) &&
    (selectedType === "all" || c.careType === selectedType)
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "score") return b.score - a.score;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const counties = [...new Set(communities.map(c => c.county))];

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p style={{ color: 'var(--color-foreground-muted)' }}>Loading communities...</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-content px-4">
        <h1 className="text-display mb-4" style={{ color: 'var(--color-foreground)' }}>
          New Jersey Senior Living Directory
        </h1>
        <p className="text-lg mb-8" style={{ color: 'var(--color-foreground-muted)' }}>
          Browse {communities.length} assisted living communities across New Jersey
        </p>

        <div className="flex gap-4 mb-8 flex-wrap">
          <select 
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
            className="px-4 py-2"
            style={{ 
              background: 'var(--color-background-secondary)', 
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              color: 'var(--color-foreground)'
            }}
          >
            <option value="all">All Counties</option>
            {counties.map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)} County</option>
            ))}
          </select>

          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2"
            style={{ 
              background: 'var(--color-background-secondary)', 
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              color: 'var(--color-foreground)'
            }}
          >
            <option value="score">Burnish Score (High to Low)</option>
            <option value="name">Alphabetical</option>
          </select>

          <div className="flex gap-2 ml-auto">
            <button 
              onClick={() => setViewMode("grid")}
              className="px-4 py-2"
              style={{ 
                background: viewMode === "grid" ? 'var(--color-accent-brass)' : 'var(--color-background-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                color: viewMode === "grid" ? '#000' : 'var(--color-foreground)'
              }}
            >
              Grid
            </button>
            <button 
              onClick={() => setViewMode("map")}
              className="px-4 py-2"
              style={{ 
                background: viewMode === "map" ? 'var(--color-accent-brass)' : 'var(--color-background-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                color: viewMode === "map" ? '#000' : 'var(--color-foreground)'
              }}
            >
              Map
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {sorted.map((community) => (
              <CommunityCard key={community.slug} {...community} />
            ))}
          </div>
        ) : (
          <div className="mb-16">
            <MapView communities={sorted} />
          </div>
        )}

        {sorted.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg" style={{ color: 'var(--color-foreground-muted)' }}>
              No communities match your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
