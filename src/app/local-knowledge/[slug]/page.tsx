import Link from "next/link";
import CommunityCard from "../../components/CommunityCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const countyName = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  
  return {
    title: `Local Knowledge: ${countyName} | Burnish`,
    description: `Our insider's guide to senior living in ${countyName}, New Jersey.`,
  };
}

const counties: Record<string, {
  name: string;
  description: string;
  communities: Array<{
    name: string;
    location: string;
    careType: string;
    tier: "platinum" | "gold" | "silver" | "bronze";
    score: number;
    amenities: string[];
    editorialLine: string;
    slug: string;
  }>;
}> = {
  "bergen": {
    name: "Bergen County",
    description: "Bergen County is New Jersey's most populous county, and its senior living options reflect that diversity — from sprawling campus communities to intimate boutique settings. Here's what you need to know about finding the right fit here.",
    communities: [
      {
        name: "The Chelsea at Bridgewater",
        location: "Bridgewater, NJ",
        careType: "Assisted Living",
        tier: "gold",
        score: 82,
        amenities: ["Pool", "Fitness Center"],
        editorialLine: "A welcoming community with strong programming and caring staff.",
        slug: "the-chelsea-bridgewater",
      },
      {
        name: "Sunrise of West Essex",
        location: "Fair Lawn, NJ",
        careType: "Memory Care",
        tier: "silver",
        score: 71,
        amenities: ["24-Hour Care"],
        editorialLine: "Solid memory care with excellent family communication.",
        slug: "sunrise-west-essex",
      },
    ],
  },
};

export default async function LocalKnowledgePage({ params }: PageProps) {
  const { slug } = await params;
  const countyName = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const county = counties[slug];

  return (
    <div className="max-content px-4 py-12">
      <nav className="text-meta mb-8" style={{ color: 'var(--color-metadata)' }}>
        <Link href="/" className="hover:text-accent-brass transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/local-knowledge" className="hover:text-accent-brass transition-colors">Local Knowledge</Link>
      </nav>

      <div className="max-w-3xl mb-12">
        <h1 className="text-display mb-6">Local Knowledge: {countyName}</h1>
        {county ? (
          <p className="text-xl" style={{ color: 'var(--color-foreground-muted)', lineHeight: 1.8 }}>
            {county.description}
          </p>
        ) : (
          <p className="text-xl" style={{ color: 'var(--color-foreground-muted)', lineHeight: 1.8 }}>
            Our insider's guide to senior living in {countyName}, New Jersey. We're working on compiling our full editorial guide for this county — check back soon.
          </p>
        )}
      </div>

      {county && (
        <>
          <div className="divider mb-12"></div>
          
          <h2 className="text-headline mb-8">Communities in {countyName}</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {county.communities.map((community) => (
              <CommunityCard key={community.slug} {...community} />
            ))}
          </div>
        </>
      )}

      {/* More Counties */}
      <div className="mt-16">
        <h2 className="text-section-header mb-8">More Counties</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {["Middlesex", "Essex", "Monmouth", "Morris"].map((countyName) => (
            <Link
              key={countyName}
              href={`/local-knowledge/${countyName.toLowerCase().replace(' ', '-')}`}
              className="card-shadow p-4 text-center"
              style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
            >
              <span className="text-label">{countyName}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
