import Link from "next/link";

export const metadata = {
  title: "The Edit | Curated Collections - Burnish",
  description: "Curated collections from our editorial team — not filtered search results, but genuine recommendations with a point of view.",
};

const collections = [
  {
    slug: "memory-care",
    title: "Memory Care",
    description: "Specialized communities providing secure, compassionate care for those with Alzheimer's and dementia.",
    communityCount: 12,
  },
  {
    slug: "exceptional-dining",
    title: "Exceptional Dining",
    description: "Communities where the culinary program is a genuine standout — chef-driven, restaurant-quality dining.",
    communityCount: 8,
  },
  {
    slug: "best-overall",
    title: "Best Overall",
    description: "Our highest-scoring communities across all categories — the Burnish Gold and Platinum of the bunch.",
    communityCount: 15,
  },
  {
    slug: "bergen-county",
    title: "Bergen County",
    description: "Senior living in New Jersey's most populous county — our comprehensive guide.",
    communityCount: 45,
  },
];

export default function TheEditIndexPage() {
  return (
    <div className="max-content px-4 py-12">
      <nav className="text-meta mb-8" style={{ color: 'var(--color-metadata)' }}>
        <Link href="/" className="hover:text-accent-brass transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <span style={{ color: 'var(--color-foreground-muted)' }}>The Edit</span>
      </nav>

      <h1 className="text-display mb-6">The Edit</h1>
      <p className="text-xl mb-12 max-w-2xl" style={{ color: 'var(--color-foreground-muted)' }}>
        Curated collections from our editorial team — not filtered search results, but genuine recommendations with a point of view.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.slug}
            href={`/the-edit/${collection.slug}`}
            className="card-shadow block p-8"
            style={{ 
              background: 'var(--color-background-secondary)',
              borderRadius: '2px',
              transition: 'transform 200ms ease'
            }}
          >
            <h2 className="text-section-header mb-4">{collection.title}</h2>
            <p className="mb-4" style={{ color: 'var(--color-foreground-muted)' }}>
              {collection.description}
            </p>
            <span className="text-meta" style={{ color: 'var(--color-metadata)' }}>
              {collection.communityCount} communities →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
