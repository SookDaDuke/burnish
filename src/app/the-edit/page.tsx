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
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    slug: "exceptional-dining",
    title: "Exceptional Dining",
    description: "Communities where the culinary program is a genuine standout — chef-driven, restaurant-quality dining.",
    communityCount: 8,
    imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
  },
  {
    slug: "best-overall",
    title: "Best Overall",
    description: "Our highest-scoring communities across all categories — the Burnish Gold and Platinum of the bunch.",
    communityCount: 15,
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  },
  {
    slug: "bergen-county",
    title: "Bergen County",
    description: "Senior living in New Jersey's most populous county — our comprehensive guide.",
    communityCount: 45,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
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
            className="card-shadow block"
            style={{ 
              background: 'var(--color-background-secondary)',
              borderRadius: '2px',
              overflow: 'hidden',
              transition: 'transform 200ms ease'
            }}
          >
            {/* Featured Image */}
            <div style={{ height: '200px', overflow: 'hidden' }}>
              <img 
                src={collection.imageUrl} 
                alt={collection.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '32px' }}>
              <h2 className="text-section-header mb-4">{collection.title}</h2>
              <p className="mb-4" style={{ color: 'var(--color-foreground-muted)' }}>
                {collection.description}
              </p>
              <span className="text-meta" style={{ color: 'var(--color-metadata)' }}>
                {collection.communityCount} communities →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
