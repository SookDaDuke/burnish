import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import CommunityCard from "./components/CommunityCard";

const supabase = createClient(
  "https://cfgffbqwtrpnhwjsuued.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZ2ZmYnF3dHJwbmh3anN1dWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MTI4NTksImV4cCI6MjA4NzE4ODg1OX0.OfNTgzQRMwUAa0r0XVD-iRarxMVNKeVEVdrEtkJUlZY"
);

async function getFeaturedCommunities() {
  const { data } = await supabase
    .from("facilities")
    .select("name, city, county, slug, rating_avg, review_count, phone, website_url, address_line1, zip, price_range_low, price_range_high, accepts_medicaid, accepts_medicare")
    .eq("county", "Essex")
    .limit(6);
  return data || [];
}

export default async function HomePage() {
  const facilities = await getFeaturedCommunities();

  const featuredCommunities = facilities.slice(0, 6).map((f: any) => ({
    name: f.name,
    location: `${f.city}, NJ`,
    careType: "Assisted Living",
    tier: "gold" as const,
    score: Math.round((f.rating_avg || 0) * 20) || 75,
    reviewCount: f.review_count,
    priceRange: f.price_range_low && f.price_range_high ? `$${f.price_range_low.toLocaleString()} - $${f.price_range_high.toLocaleString()}` : null,
    acceptsMedicaid: f.accepts_medicaid,
    acceptsMedicare: f.accepts_medicare,
    amenities: [],
    editorialLine: "View community details and photos.",
    slug: f.slug,
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    phone: f.phone,
    website: f.website_url,
    address: f.address_line1,
    zip: f.zip,
  }));

  const topCounties = [
    { name: "Bergen County", slug: "bergen", count: 45 },
    { name: "Essex County", slug: "essex", count: facilities.length },
    { name: "Middlesex County", slug: "middlesex", count: 32 },
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
              The Mr & Mrs Smith of senior living — comprehensive coverage with a luxury editorial lens. We're here for families who demand the same quality they'd expect from a fine hotel or restaurant.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/directory"
                className="btn-primary"
              >
                Browse 150+ communities across New Jersey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-12" style={{ background: 'var(--color-background-secondary)' }}>
        <div className="max-content px-4">
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="Search by location, community name..."
                className="flex-1 px-4 py-3"
                style={{ 
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  background: 'var(--color-background)'
                }}
              />
              <button 
                className="btn-primary"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Communities */}
      <section className="py-16">
        <div className="max-content px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-section-header" style={{ color: 'var(--color-foreground)' }}>
              Featured Communities
            </h2>
            <Link href="/directory" className="text-link">
              View All →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCommunities.map((community: any) => (
              <CommunityCard key={community.slug} {...community} />
            ))}
          </div>
        </div>
      </section>

      {/* Local Knowledge */}
      <section className="py-16" style={{ background: 'var(--color-background-secondary)' }}>
        <div className="max-content px-4">
          <h2 className="text-section-header mb-8" style={{ color: 'var(--color-foreground)' }}>
            Local Knowledge
          </h2>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {topCounties.map((county) => (
              <Link 
                key={county.slug}
                href={`/local-knowledge/${county.slug}`}
                className="block p-6"
                style={{ 
                  background: 'var(--color-background)',
                  borderRadius: '2px',
                  border: '1px solid var(--color-border)'
                }}
              >
                <h3 className="text-headline mb-2" style={{ color: 'var(--color-foreground)' }}>
                  {county.name}
                </h3>
                <p className="text-meta" style={{ color: 'var(--color-foreground-muted)' }}>
                  {county.count} communities
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The Edit */}
      <section className="py-16">
        <div className="max-content px-4">
          <h2 className="text-section-header mb-4" style={{ color: 'var(--color-foreground)' }}>
            The Edit
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--color-foreground-muted)' }}>
            Curated collections from our editorial team — not filtered search results, but genuine recommendations with a point of view.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link 
              href="/the-edit/memory-care"
              className="block p-8"
              style={{ 
                background: 'var(--color-background-secondary)',
                borderRadius: '2px',
                border: '1px solid var(--color-border)'
              }}
            >
              <h3 className="text-headline mb-2" style={{ color: 'var(--color-foreground)' }}>
                Best Memory Care
              </h3>
            </Link>
            <Link 
              href="/the-edit/exceptional-dining"
              className="block p-8"
              style={{ 
                background: 'var(--color-background-secondary)',
                borderRadius: '2px',
                border: '1px solid var(--color-border)'
              }}
            >
              <h3 className="text-headline mb-2" style={{ color: 'var(--color-foreground)' }}>
                Exceptional Dining
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* How We Score */}
      <section className="py-16" style={{ background: 'var(--color-background-secondary)' }}>
        <div className="max-content px-4">
          <h2 className="text-section-header mb-4" style={{ color: 'var(--color-foreground)' }}>
            How We Score
          </h2>
          <p className="text-lg mb-8 max-w-2xl" style={{ color: 'var(--color-foreground-muted)' }}>
            Every community receives a Burnish Score (0–100) based on five weighted categories: Care Quality, Residential Experience, Dining, Life & Community, and Family Experience.
          </p>
          <Link href="/the-burnish-standard" className="text-link">
            Learn Our Methodology →
          </Link>
        </div>
      </section>

      {/* The Burnish Dispatch */}
      <section className="py-16">
        <div className="max-content px-4">
          <h2 className="text-section-header mb-4" style={{ color: 'var(--color-foreground)' }}>
            The Burnish Dispatch
          </h2>
          <p className="text-lg mb-8" style={{ color: 'var(--color-foreground-muted)' }}>
            New community reviews, The Mark on standout details, and curated Edits — dispatched to your inbox when they're ready.
          </p>
          
          <form className="flex gap-2 max-w-md">
            <input 
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3"
              style={{ 
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                background: 'var(--color-background)'
              }}
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
