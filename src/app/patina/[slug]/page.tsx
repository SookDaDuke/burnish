import Link from "next/link";
import TierBadge from "../../components/TierBadge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  
  return {
    title: `Patina Profile | Burnish`,
    description: "A deep-dive narrative feature on this community.",
  };
}

export default async function PatinaProfilePage({ params }: PageProps) {
  const { slug } = await params;

  // Placeholder - this would come from a CMS/database
  const community = {
    name: "The Waterford",
    location: "Newark, NJ",
    tier: "platinum" as const,
    score: 92,
    editorial: `
      The first thing you notice when you walk into The Waterford isn't the marble floors or the carefully curated artwork in the lobby — it's the light. Floor-to-ceiling windows run the length of the building, flooding the space with natural warmth that sets the tone for everything that follows.
      
      This is a community that understands what it is. It's not trying to be a resort, or a medical facility, or a luxury hotel. It's a place where someone with taste can actually want to live.
      
      The dining program here is the real differentiator. The executive chef, trained at the Culinary Institute of America, brings a level of care to each meal that's rare in this space. It's not about plating techniques or molecular gastronomy — it's about understanding that for residents, these meals might be the highlight of their day.
      
      What impressed us most was the staff tenure. Many have been here for a decade or more. In an industry plagued by turnover, that consistency matters. The residents know the staff, and the staff knows the residents — not just their names, but their histories, their preferences, their families.
    `.trim(),
    marks: [
      "Executive Chef Maria Santos trained at CIA — previously at The Waldorf",
      "Staff average tenure: 9 years (industry avg: 2)",
      "Private dining room available for family events",
    ],
    amenities: ["Restaurant-Style Dining", "Private Dining", "Fitness Center", "Pool", "Art Studio", "Library"],
  };

  return (
    <div className="max-content px-4 py-12">
      <nav className="text-meta mb-8" style={{ color: 'var(--color-metadata)' }}>
        <Link href="/" className="hover:text-accent-brass transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <span style={{ color: 'var(--color-foreground-muted)' }}>Patina Profile</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-baseline justify-between mb-4">
          <h1 className="text-display">{community.name}</h1>
          <TierBadge tier={community.tier} score={community.score} />
        </div>
        <p className="text-xl" style={{ color: 'var(--color-foreground-muted)' }}>
          {community.location}
        </p>
      </div>

      {/* Editorial */}
      <div className="grid md:grid-cols-3 gap-12 mb-16">
        <div className="md:col-span-2">
          <article 
            className="prose prose-lg"
            style={{ 
              fontFamily: 'var(--font-display)',
              fontSize: '20px',
              lineHeight: 1.9,
              color: 'var(--color-foreground)'
            }}
          >
            {community.editorial.split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-6">
                {paragraph}
              </p>
            ))}
          </article>
        </div>

        {/* Sidebar */}
        <div>
          {/* The Marks */}
          <div 
            className="p-6 mb-6"
            style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
          >
            <h3 className="text-label mb-4" style={{ color: 'var(--color-accent-brass)' }}>
              Burnish's Mark on {community.name}
            </h3>
            <ul className="space-y-4">
              {community.marks.map((mark, i) => (
                <li key={i} className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>
                  ◆ {mark}
                </li>
              ))}
            </ul>
          </div>

          {/* Amenities */}
          <div 
            className="p-6"
            style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
          >
            <h3 className="text-label mb-4">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {community.amenities.map((amenity) => (
                <span 
                  key={amenity}
                  className="text-meta px-2 py-1"
                  style={{ 
                    background: 'var(--color-background)',
                    color: 'var(--color-foreground-muted)',
                    borderRadius: '2px'
                  }}
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/community/${slug}`}
            className="btn btn-primary block text-center mt-6"
            style={{ borderRadius: '2px' }}
          >
            View Full Profile
          </Link>
        </div>
      </div>

      {/* More Patina Profiles */}
      <div className="divider mb-12"></div>
      
      <h2 className="text-headline mb-8">More Patina Profiles</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          href="/patina/brighton-gardens"
          className="card-shadow p-6"
          style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
        >
          <h3 className="text-lg mb-2">Brighton Gardens</h3>
          <p className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>Watchung, NJ</p>
        </Link>
        <Link
          href="/patina/the-chelsea"
          className="card-shadow p-6"
          style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
        >
          <h3 className="text-lg mb-2">The Chelsea</h3>
          <p className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>Bridgewater, NJ</p>
        </Link>
      </div>
    </div>
  );
}
