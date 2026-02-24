import Link from "next/link";

export const metadata = {
  title: "Local Knowledge | County Guides - Burnish",
  description: "Insider guides to senior living across New Jersey counties — genuine editorial, not just listings.",
};

const counties = [
  { name: "Bergen County", slug: "bergen", count: 45, imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" },
  { name: "Middlesex County", slug: "middlesex", count: 32, imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
  { name: "Essex County", slug: "essex", count: 28, imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80" },
  { name: "Monmouth County", slug: "monmouth", count: 24, imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" },
  { name: "Morris County", slug: "morris", count: 21, imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80" },
  { name: "Union County", slug: "union", count: 18, imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80" },
  { name: "Hudson County", slug: "hudson", count: 15, imageUrl: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80" },
  { name: "Passaic County", slug: "passaic", count: 14, imageUrl: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80" },
];

export default function LocalKnowledgeIndexPage() {
  return (
    <div className="max-content px-4 py-12">
      <nav className="text-meta mb-8" style={{ color: 'var(--color-metadata)' }}>
        <Link href="/" className="hover:text-accent-brass transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <span style={{ color: 'var(--color-foreground-muted)' }}>Local Knowledge</span>
      </nav>

      <h1 className="text-display mb-6">Local Knowledge</h1>
      <p className="text-xl mb-12 max-w-2xl" style={{ color: 'var(--color-foreground-muted)' }}>
        County-level editorial guides with insider context you won't find anywhere else. 
        Not just listings — genuine guidance from our editorial team.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {counties.map((county) => (
          <Link
            key={county.slug}
            href={`/local-knowledge/${county.slug}`}
            className="card-shadow block"
            style={{ 
              background: 'var(--color-background-secondary)',
              borderRadius: '2px',
              overflow: 'hidden',
              transition: 'transform 200ms ease'
            }}
          >
            {/* Featured Image */}
            <div style={{ height: '160px', overflow: 'hidden' }}>
              <img 
                src={county.imageUrl} 
                alt={county.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '32px' }}>
              <div className="flex items-baseline justify-between">
                <h2 className="text-section-header">{county.name}</h2>
                <span className="text-meta" style={{ color: 'var(--color-metadata)' }}>
                  {county.count} communities
                </span>
              </div>
              <p className="mt-4 text-sm" style={{ color: 'var(--color-foreground-muted)' }}>
                Our insider's guide to senior living in {county.name.replace(' County', '')}.
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
