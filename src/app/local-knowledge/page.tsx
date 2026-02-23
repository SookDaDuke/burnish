import Link from "next/link";

export const metadata = {
  title: "Local Knowledge | County Guides - Burnish",
  description: "Insider guides to senior living across New Jersey counties — genuine editorial, not just listings.",
};

const counties = [
  { name: "Bergen County", slug: "bergen", count: 45 },
  { name: "Middlesex County", slug: "middlesex", count: 32 },
  { name: "Essex County", slug: "essex", count: 28 },
  { name: "Monmouth County", slug: "monmouth", count: 24 },
  { name: "Morris County", slug: "morris", count: 21 },
  { name: "Union County", slug: "union", count: 18 },
  { name: "Hudson County", slug: "hudson", count: 15 },
  { name: "Passaic County", slug: "passaic", count: 14 },
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
            className="card-shadow block p-8"
            style={{ 
              background: 'var(--color-background-secondary)',
              borderRadius: '2px',
              transition: 'transform 200ms ease'
            }}
          >
            <div className="flex items-baseline justify-between">
              <h2 className="text-section-header">{county.name}</h2>
              <span className="text-meta" style={{ color: 'var(--color-metadata)' }}>
                {county.count} communities
              </span>
            </div>
            <p className="mt-4 text-sm" style={{ color: 'var(--color-foreground-muted)' }}>
              Our insider's guide to senior living in {county.name.replace(' County', '')}.
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
