import Link from "next/link";

export const metadata = {
  title: "Types of Senior Care | Burnish",
  description: "Understanding your senior care options — from assisted living to memory care, find what fits your needs.",
};

const careTypes = [
  {
    slug: "assisted-living",
    name: "Assisted Living",
    description: "Housing that provides help with daily activities like bathing, dressing, and medication management while maintaining independence.",
    who: "Seniors who need help with daily activities but want to maintain independence",
    cost: "$3,000 - $7,000/month",
  },
  {
    slug: "memory-care",
    name: "Memory Care",
    description: "Specialized care for individuals with Alzheimer's disease and other forms of dementia, featuring secure environments and trained staff.",
    who: "Individuals with Alzheimer's, dementia, or memory impairment",
    cost: "$4,500 - $8,500/month",
  },
  {
    slug: "independent-living",
    name: "Independent Living",
    description: "Senior living communities with minimal assistance, focusing on lifestyle, community, and social activities.",
    who: "Active seniors who want a maintenance-free lifestyle with social opportunities",
    cost: "$2,000 - $5,000/month",
  },
  {
    slug: "skilled-nursing",
    name: "Skilled Nursing",
    description: "24/7 medical care and rehabilitation services for those with complex health needs, staffed by licensed nurses.",
    who: "Seniors requiring 24/7 medical care or post-hospital rehabilitation",
    cost: "$6,000 - $12,000/month",
  },
  {
    slug: "continuing-care",
    name: "Continuing Care (CCRC)",
    description: "Communities offering multiple levels of care from independent living to skilled nursing, all in one location.",
    who: "Seniors who want to age in place with varying care needs over time",
    cost: "$3,000 - $8,000/month (entrance fees $100K-$500K)",
  },
  {
    slug: "respite-care",
    name: "Respite Care",
    description: "Short-term care providing relief for family caregivers, ranging from a few hours to several weeks.",
    who: "Family caregivers who need temporary relief",
    cost: "$150 - $300/day",
  },
];

export default function TypesPage() {
  return (
    <div className="max-content px-4 py-12">
      <nav className="text-meta mb-4" style={{ color: 'var(--color-metadata)' }}>
        <Link href="/" className="hover:text-accent-brass transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <span style={{ color: 'var(--color-foreground-muted)' }}>Care Types</span>
      </nav>

      <h1 className="text-headline mb-4">Types of Senior Care</h1>
      <p className="text-xl mb-12 max-w-2xl" style={{ color: 'var(--color-foreground-muted)' }}>
        Understanding your options. Find the right type of care for your situation.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {careTypes.map((type) => (
          <Link
            key={type.slug}
            href={`/types/${type.slug}`}
            className="card-shadow block p-8"
            style={{ 
              background: 'var(--color-background-secondary)',
              borderRadius: '2px',
              transition: 'transform 200ms ease'
            }}
          >
            <h2 className="text-section-header mb-4">{type.name}</h2>
            <p className="mb-6" style={{ color: 'var(--color-foreground-muted)' }}>
              {type.description}
            </p>
            <div className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>
              <p className="mb-2">
                <strong style={{ color: 'var(--color-foreground)' }}>Best for:</strong> {type.who}
              </p>
              <p>
                <strong style={{ color: 'var(--color-foreground)' }}>Typical cost:</strong> {type.cost}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <section 
        className="mt-12 p-8"
        style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
      >
        <h2 className="text-section-header mb-4">Not Sure What You Need?</h2>
        <p className="mb-4" style={{ color: 'var(--color-foreground-muted)' }}>
          Choosing the right type of care is an important decision. We're here to help you understand your options.
        </p>
        <Link
          href="/the-burnish-standard"
          className="text-label hover:text-accent-brass transition-colors"
        >
          Learn about our scoring methodology →
        </Link>
      </section>
    </div>
  );
}
