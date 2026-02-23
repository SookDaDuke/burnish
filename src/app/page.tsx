import Link from "next/link";
import CommunityCard from "./components/CommunityCard";

export default function HomePage() {
  // Placeholder featured communities - will connect to Supabase later
  const featuredCommunities = [
    {
      name: "The Waterford",
      location: "Newark, NJ",
      careType: "Assisted Living",
      tier: "gold" as const,
      score: 82,
      amenities: ["Private Dining", "Concierge"],
      editorialLine: "Elegant grounds and a chef who trained at the CIA.",
      slug: "the-waterford",
    },
    {
      name: "Sunrise at West Essex",
      location: "Fair Lawn, NJ",
      careType: "Memory Care",
      tier: "silver" as const,
      score: 68,
      amenities: ["Transportation", "Pet-Friendly"],
      editorialLine: "Dedicated memory care with robust programming.",
      slug: "sunrise-west-essex",
    },
    {
      name: "Brighton Gardens",
      location: "Watchung, NJ",
      careType: "Assisted Living",
      tier: "gold" as const,
      score: 78,
      amenities: ["Fitness Center", "Cultural Events"],
      editorialLine: "The dining program here is genuinely exceptional.",
      slug: "brighton-gardens-mountainside",
    },
  ];

  const topCounties = [
    { name: "Bergen County", slug: "bergen", count: 45 },
    { name: "Middlesex County", slug: "middlesex", count: 32 },
    { name: "Essex County", slug: "essex", count: 28 },
    { name: "Monmouth County", slug: "monmouth", count: 24 },
    { name: "Morris County", slug: "morris", count: 21 },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="py-24"
        style={{ background: 'var(--color-background)' }}
      >
        <div className="max-content px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 
              className="text-display mb-6"
              style={{ color: 'var(--color-foreground)' }}
            >
              Senior Living, Curated
            </h1>
            <p 
              className="text-xl mb-8"
              style={{ color: 'var(--color-foreground-muted)' }}
            >
              The Mr & Mrs Smith of senior living — comprehensive coverage with a luxury editorial lens. 
              We're here for families who demand the same quality they'd expect from a fine hotel or restaurant.
            </p>
            
            {/* Search Box */}
            <div 
              className="p-4 card-shadow"
              style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
            >
              <div className="flex gap-2 max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search by location, community name..."
                  className="flex-1 px-4 py-3"
                  style={{ 
                    background: 'var(--color-background)', 
                    border: '1px solid var(--color-metadata)',
                    color: 'var(--color-foreground)',
                    borderRadius: '2px'
                  }}
                />
                <button 
                  className="btn btn-primary"
                  style={{ borderRadius: '2px' }}
                >
                  Search
                </button>
              </div>
            </div>
            
            <p className="mt-6 text-meta" style={{ color: 'var(--color-metadata)' }}>
              Browse {topCounties.reduce((a, c) => a + c.count, 0)}+ communities across New Jersey
            </p>
          </div>
        </div>
      </section>

      {/* Featured Communities */}
      <section 
        className="py-16"
        style={{ background: 'var(--color-background-secondary)' }}
      >
        <div className="max-content px-4">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-headline">Featured Communities</h2>
            <Link href="/new-jersey" className="text-label hover:text-accent-brass">
              View All →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredCommunities.map((community) => (
              <CommunityCard key={community.slug} {...community} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Counties */}
      <section className="py-16" style={{ background: 'var(--color-background)' }}>
        <div className="max-content px-4">
          <h2 className="text-headline mb-8">Local Knowledge</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {topCounties.map((county) => (
              <Link
                key={county.slug}
                href={`/local-knowledge/${county.slug}`}
                className="card-shadow p-6"
                style={{ 
                  background: 'var(--color-background-secondary)',
                  borderRadius: '2px',
                  transition: 'transform 200ms ease'
                }}
              >
                <h3 className="text-section-header mb-2">{county.name}</h3>
                <p className="text-meta" style={{ color: 'var(--color-metadata)' }}>
                  {county.count} communities
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The Edit Teaser */}
      <section 
        className="py-16"
        style={{ background: 'var(--color-background-secondary)' }}
      >
        <div className="max-content px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-headline mb-4">The Edit</h2>
            <p 
              className="text-lg mb-8"
              style={{ color: 'var(--color-foreground-muted)' }}
            >
              Curated collections from our editorial team — not filtered search results, but genuine 
              recommendations with a point of view.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                href="/the-edit/memory-care" 
                className="btn"
                style={{ 
                  background: 'var(--color-background)',
                  border: '1px solid var(--color-metadata)',
                  borderRadius: '2px'
                }}
              >
                Best Memory Care
              </Link>
              <Link 
                href="/the-edit/exceptional-dining" 
                className="btn"
                style={{ 
                  background: 'var(--color-background)',
                  border: '1px solid var(--color-metadata)',
                  borderRadius: '2px'
                }}
              >
                Exceptional Dining
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Burnish Standard Teaser */}
      <section className="py-16" style={{ background: 'var(--color-background)' }}>
        <div className="max-content px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-headline mb-4">How We Score</h2>
            <p 
              className="text-lg mb-8"
              style={{ color: 'var(--color-foreground-muted)' }}
            >
              Every community receives a Burnish Score (0–100) based on five weighted categories: 
              Care Quality, Residential Experience, Dining, Life & Community, and Family Experience.
            </p>
            <Link 
              href="/the-burnish-standard" 
              className="btn btn-primary"
            >
              Learn Our Methodology
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section 
        className="py-16"
        style={{ background: 'var(--color-background-secondary)' }}
      >
        <div className="max-content px-4 text-center">
          <h2 className="text-headline mb-4">The Burnish Dispatch</h2>
          <p 
            className="text-lg mb-8 max-w-xl mx-auto"
            style={{ color: 'var(--color-foreground-muted)' }}
          >
            New community reviews, The Mark on standout details, and curated Edits — 
            dispatched to your inbox when they're ready.
          </p>
          <form className="flex justify-center gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email"
              className="px-4 py-3 flex-1"
              style={{ 
                background: 'var(--color-background)', 
                border: '1px solid var(--color-metadata)',
                color: 'var(--color-foreground)',
                borderRadius: '2px'
              }}
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
