import Link from "next/link";
import { notFound } from "next/navigation";
import { getFacilityBySlug } from "@/lib/supabase/data";
import TierBadge from "../../components/TierBadge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const communityName = slug.replace(/-/g, ' ');
  
  return {
    title: `${communityName} | Burnish`,
    description: `Learn more about ${communityName} - Burnish Score, amenities, and editorial review.`,
  };
}

export default async function CommunityPage({ params }: PageProps) {
  const { slug } = await params;
  
  let facility = null;
  
  try {
    facility = await getFacilityBySlug(slug);
  } catch (e) {
    console.log('Using placeholder data');
  }
  
  // Placeholder data if no facility found
  if (!facility) {
    const communityName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    facility = {
      name: communityName,
      slug: slug,
      description: 'A quality assisted living facility in New Jersey providing compassionate care.',
      address_line1: '123 Main Street',
      city: 'Newark',
      county: 'Essex',
      state: 'NJ',
      zip: '07104',
      phone: '973-555-0100',
      facility_type: ['assisted-living', 'memory-care'],
      price_range_low: 4500,
      price_range_high: 7500,
    };
  }

  // Get care types
  const careTypes = Array.isArray(facility.facility_type) 
    ? facility.facility_type.map((t: string) => t.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())).join(', ')
    : 'Assisted Living';

  return (
    <div className="max-content px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-meta mb-8" style={{ color: 'var(--color-metadata)' }}>
        <Link href="/" className="hover:text-accent-brass transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/new-jersey" className="hover:text-accent-brass transition-colors">Directory</Link>
        <span className="mx-2">›</span>
        <span style={{ color: 'var(--color-foreground-muted)' }}>{facility.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-baseline justify-between mb-4">
          <h1 className="text-display">{facility.name}</h1>
          <TierBadge tier="gold" score={82} />
        </div>
        <p className="text-xl" style={{ color: 'var(--color-foreground-muted)' }}>
          {facility.city}, {facility.state} {facility.zip}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="md:col-span-2">
          {/* Editorial Write-up */}
          <section className="mb-12">
            <h2 className="text-section-header mb-6">About</h2>
            <p className="text-lg" style={{ color: 'var(--color-foreground-muted)', lineHeight: 1.8 }}>
              {facility.description || 'A quality senior living community providing compassionate care in New Jersey.'}
            </p>
          </section>

          {/* How We Scored This */}
          <section className="mb-12">
            <h2 className="text-section-header mb-6">How We Scored This</h2>
            <p className="mb-4" style={{ color: 'var(--color-foreground-muted)' }}>
              The Burnish Score (0–100) is based on five weighted categories: Care Quality & Staff (30pts), 
              Residential Experience (20pts), Dining & Culinary (20pts), Life & Community (15pts), and Family Experience (15pts).
            </p>
            <Link 
              href="/the-burnish-standard"
              className="text-label hover:text-accent-brass transition-colors"
            >
              Learn about our methodology →
            </Link>
          </section>

          {/* Amenities */}
          <section className="mb-12">
            <h2 className="text-section-header mb-6">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {['Restaurant-Style Dining', 'Private Dining', 'Fitness Center', 'Pool', 'Art Studio', 'Library', 'Transportation', 'Pet-Friendly'].map((amenity) => (
                <span 
                  key={amenity}
                  className="text-meta px-3 py-2"
                  style={{ 
                    background: 'var(--color-background-secondary)',
                    color: 'var(--color-foreground-muted)',
                    borderRadius: '2px'
                  }}
                >
                  {amenity}
                </span>
              ))}
            </div>
          </section>

          {/* The Marks */}
          <section className="mb-12">
            <h2 className="text-section-header mb-6">Burnish's Mark</h2>
            <div 
              className="p-6"
              style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
            >
              <ul className="space-y-3">
                <li style={{ color: 'var(--color-foreground-muted)' }}>◆ Dedicated memory care wing with specialized programming</li>
                <li style={{ color: 'var(--color-foreground-muted)' }}>◆ Staff average tenure: 8 years (industry avg: 2)</li>
                <li style={{ color: 'var(--color-foreground-muted)' }}>◆ On-site executive chef with fine dining background</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div>
          {/* Quick Facts */}
          <div 
            className="p-6 mb-6 sticky top-4"
            style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
          >
            <h3 className="text-label mb-4">Quick Facts</h3>
            
            <div className="mb-4">
              <p className="text-meta mb-1" style={{ color: 'var(--color-metadata)' }}>Care Type</p>
              <p style={{ color: 'var(--color-foreground)' }}>{careTypes}</p>
            </div>

            <div className="mb-4">
              <p className="text-meta mb-1" style={{ color: 'var(--color-metadata)' }}>County</p>
              <p style={{ color: 'var(--color-foreground)' }}>{facility.county || 'Essex'}</p>
            </div>

            <div className="mb-4">
              <p className="text-meta mb-1" style={{ color: 'var(--color-metadata)' }}>Price Range</p>
              <p style={{ color: 'var(--color-foreground)' }}>
                ${(facility.price_range_low || 4500).toLocaleString()} - ${(facility.price_range_high || 7500).toLocaleString()}/mo
              </p>
            </div>

            <div className="mb-6">
              <p className="text-meta mb-1" style={{ color: 'var(--color-metadata)' }}>Contact</p>
              <p style={{ color: 'var(--color-foreground)' }}>{facility.phone || '973-555-0100'}</p>
              <p style={{ color: 'var(--color-foreground-muted)', fontSize: '14px' }}>
                {facility.address_line1}<br />
                {facility.city}, {facility.state} {facility.zip}
              </p>
            </div>

            {/* CTA */}
            <button 
              className="btn btn-primary w-full"
              style={{ borderRadius: '2px' }}
            >
              Request Information
            </button>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="divider mt-12"></div>
      
      <h2 className="text-section-header mb-8">Similar Communities</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          href="/community/brighton-gardens-mountainside"
          className="card-shadow p-6"
          style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
        >
          <h3 className="text-lg mb-2">Brighton Gardens</h3>
          <p className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>Watchung, NJ</p>
        </Link>
        <Link
          href="/community/sunrise-west-essex"
          className="card-shadow p-6"
          style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
        >
          <h3 className="text-lg mb-2">Sunrise at West Essex</h3>
          <p className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>Fair Lawn, NJ</p>
        </Link>
      </div>
    </div>
  );
}
