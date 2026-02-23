import Link from "next/link";
import TierBadge from "./TierBadge";

interface CommunityCardProps {
  name: string;
  location: string;
  careType: string;
  tier?: "platinum" | "gold" | "silver" | "bronze" | "in-assay" | "listed-only";
  score?: number;
  amenities?: string[];
  editorialLine?: string;
  slug: string;
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
}: CommunityCardProps) {
  return (
    <Link 
      href={`/community/${slug}`}
      className="card-shadow block"
      style={{ 
        background: 'var(--color-background-secondary)',
        borderRadius: '2px',
        padding: '24px',
        transition: 'transform 200ms ease, box-shadow 200ms ease'
      }}
    >
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
        <div className="flex flex-wrap gap-2">
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
    </Link>
  );
}
