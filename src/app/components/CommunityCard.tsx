"use client";

import Link from "next/link";
import { useState } from "react";
import TierBadge from "./TierBadge";
import { useCompare } from "./CompareBar";

interface CommunityCardProps {
  name: string;
  location: string;
  careType: string;
  tier?: "platinum" | "gold" | "silver" | "bronze" | "in-assay" | "listed-only";
  score?: number;
  amenities?: string[];
  editorialLine?: string;
  slug: string;
  imageUrl?: string;
}

export default function CommunityCard({
  name,
  location,
  careType,
  tier = "listed-only",
  score,
  amenities = [],
  editorialLine,
  slug,
  imageUrl,
}: CommunityCardProps) {
  const { addToCompare, removeFromCompare, isSaved, maxItems } = useCompare();
  const [saved, setSaved] = useState(isSaved(slug));

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (saved) {
      removeFromCompare(slug);
      setSaved(false);
    } else {
      const added = addToCompare(slug);
      if (added) {
        setSaved(true);
      }
    }
  };

  return (
    <Link 
      href={`/community/${slug}`}
      className="card-shadow block"
      style={{ 
        background: 'var(--color-background-secondary)',
        borderRadius: '2px',
        overflow: 'hidden',
        transition: 'transform 200ms ease, box-shadow 200ms ease'
      }}
    >
      {/* Image */}
      <div 
        style={{ 
          height: '180px', 
          overflow: 'hidden',
          background: 'var(--color-background)'
        }}
      >
        <img 
          src={imageUrl || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"} 
          alt={name}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }}
        />
      </div>
      
      <div style={{ padding: '24px' }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 
              className="text-section-header"
              style={{ color: 'var(--color-foreground)' }}
            >
              {name}
            </h3>
            <p className="text-meta" style={{ color: 'var(--color-metadata)' }}>
              {location}
            </p>
          </div>
          <TierBadge tier={tier} score={score} />
        </div>
        
        <p className="text-sm mb-4" style={{ color: 'var(--color-foreground-muted)' }}>
          {careType}
        </p>
        
        {editorialLine && (
          <p 
            className="text-sm italic mb-4" 
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-foreground)' }}
          >
            "{editorialLine}"
          </p>
        )}
        
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {amenities.slice(0, 4).map((amenity) => (
              <span 
                key={amenity}
                className="text-meta px-2 py-1"
                style={{ 
                  background: 'var(--color-background)',
                  color: 'var(--color-foreground-muted)'
                }}
              >
                {amenity}
              </span>
            ))}
          </div>
        )}

        {/* Save to Compare */}
        <button
          onClick={handleSaveClick}
          className="text-sm mt-2 flex items-center gap-2"
          style={{ 
            color: saved ? 'var(--color-accent-brass)' : 'var(--color-metadata)'
          }}
        >
          <span>{saved ? '✓' : '+'}</span>
          <span>{saved ? 'Saved' : 'Save to Compare'}</span>
        </button>
      </div>
    </Link>
  );
}
