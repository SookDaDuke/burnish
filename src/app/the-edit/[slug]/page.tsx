import Link from "next/link";
import CommunityCard from "../../components/CommunityCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const collections: Record<string, { title: string; description: string }> = {
    "memory-care": {
      title: "Memory Care",
      description: "Specialized communities providing secure, compassionate care for those with Alzheimer's and dementia.",
    },
    "exceptional-dining": {
      title: "Exceptional Dining",
      description: "Communities where the culinary program is a genuine standout — chef-driven, restaurant-quality dining.",
    },
    "bergen-county": {
      title: "Bergen County",
      description: "Our curated take on the best senior living options in Bergen County, NJ.",
    },
  };
  
  const collection = collections[slug] || { title: slug, description: "A curated collection from Burnish." };
  
  return {
    title: `${collection.title} | The Edit - Burnish`,
    description: collection.description,
  };
}

// Placeholder data - will connect to Supabase
const collections: Record<string, {
  title: string;
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
  "memory-care": {
    title: "Memory Care",
    description: "Specialized communities providing secure, compassionate care for those with Alzheimer's and dementia. We've visited these communities, spoken with their teams, and believe they offer something genuinely special.",
    communities: [
      {
        name: "The Chelsea at Bridgewater",
        location: "Bridgewater, NJ",
        careType: "Memory Care",
        tier: "gold",
        score: 82,
        amenities: ["Secure Environment", "Specialized Staff"],
        editorialLine: "A dedicated memory care wing with programming that actually engages residents.",
        slug: "the-chelsea-bridgewater",
      },
      {
        name: "Sunrise of West Essex",
        location: "Fair Lawn, NJ",
        careType: "Memory Care",
        tier: "silver",
        score: 71,
        amenities: ["24-Hour Care", "Family Support"],
        editorialLine: "Strong staff-to-resident ratios and a thoughtful approach to family communication.",
        slug: "sunrise-west-essex",
      },
    ],
  },
  "exceptional-dining": {
    title: "Exceptional Dining",
    description: "Because meals are one of the great pleasures of life — and in senior living, they can be transformative. These communities take dining seriously.",
    communities: [
      {
        name: "The Waterford",
        location: "Newark, NJ",
        careType: "Assisted Living",
        tier: "platinum",
        score: 92,
        amenities: ["Private Dining", "Chef's Table"],
        editorialLine: "A chef who trained at the Culinary Institute of America runs this kitchen. The difference is noticeable.",
        slug: "the-waterford",
      },
      {
        name: "Brighton Gardens",
        location: "Watchung, NJ",
        careType: "Assisted Living",
        tier: "gold",
        score: 78,
        amenities: ["Restaurant-Style", "Seasonal Menu"],
        editorialLine: "The dining program here is genuinely exceptional — fresh ingredients, diverse menus, beautiful presentation.",
        slug: "brighton-gardens-mountainside",
      },
    ],
  },
};

export default async function TheEditPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = collections[slug] || {
    title: slug.replace(/-/g, ' '),
    description: "A curated collection from Burnish.",
    communities: []
  };

  // If it's a dynamic slug not in our placeholder data, show a message
  const isDynamicCounty = !collections[slug] && !["memory-care", "exceptional-dining"].includes(slug);

  return (
    <div className="max-content px-4 py-12">
      <nav className="text-meta mb-8" style={{ color: 'var(--color-metadata)' }}>
        <Link href="/" className="hover:text-accent-brass transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <span style={{ color: 'var(--color-foreground-muted)' }}>The Edit</span>
      </nav>

      <div className="max-w-3xl mb-12">
        <h1 className="text-display mb-6">{collection.title}</h1>
        <p className="text-xl" style={{ color: 'var(--color-foreground-muted)', lineHeight: 1.8 }}>
          {collection.description}
        </p>
      </div>

      {isDynamicCounty ? (
        <div 
          className="p-8"
          style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
        >
          <p style={{ color: 'var(--color-foreground-muted)' }}>
            This collection is coming soon. Check back for our curated recommendations.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {collection.communities.map((community) => (
            <CommunityCard key={community.slug} {...community} />
          ))}
        </div>
      )}

      {/* More Collections */}
      <div className="mt-16">
        <h2 className="text-section-header mb-8">More Collections</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/the-edit/memory-care"
            className="card-shadow p-6"
            style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
          >
            <h3 className="text-lg mb-2">Memory Care</h3>
            <p className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>Specialized dementia care</p>
          </Link>
          <Link
            href="/the-edit/exceptional-dining"
            className="card-shadow p-6"
            style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
          >
            <h3 className="text-lg mb-2">Exceptional Dining</h3>
            <p className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>Chef-driven culinary programs</p>
          </Link>
          <Link
            href="/local-knowledge"
            className="card-shadow p-6"
            style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
          >
            <h3 className="text-lg mb-2">Local Knowledge</h3>
            <p className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>County-by-county guides</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
