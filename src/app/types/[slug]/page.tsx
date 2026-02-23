import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const type = careTypes[slug];
  
  if (!type) return { title: "Care Type Not Found" };
  
  return {
    title: `${type.name} in New Jersey | Burnish`,
    description: type.description,
  };
}

const careTypes: Record<string, {
  name: string;
  description: string;
  who: string;
  cost: string;
  features: string[];
  questions: { q: string; a: string }[];
}> = {
  "assisted-living": {
    name: "Assisted Living",
    description: "Assisted living facilities provide help with daily activities while maintaining independence.",
    who: "Seniors who need help with bathing, dressing, medication management, or other daily activities",
    cost: "$3,000 - $7,000/month",
    features: [
      "24-hour staff availability",
      "Help with bathing, dressing, and grooming",
      "Medication management and reminders",
      "Meal preparation and dining services",
      "Housekeeping and laundry",
      "Social activities and events",
      "Transportation to appointments",
    ],
    questions: [
      { q: "What services are included?", a: "Most facilities include meals, housekeeping, personal care assistance, and social activities. Additional services like medication management may have extra costs." },
      { q: "How do I pay for assisted living?", a: "Options include private funds, long-term care insurance, veteran's benefits, and Medicaid waivers (in some states)." },
      { q: "Can I bring my own furniture?", a: "Yes! Most assisted living apartments come furnished or allow you to bring your own furniture and decorations." },
    ],
  },
  "memory-care": {
    name: "Memory Care",
    description: "Specialized care for individuals with Alzheimer's disease and other forms of dementia.",
    who: "Individuals diagnosed with Alzheimer's, dementia, or other memory impairments",
    cost: "$4,500 - $8,500/month",
    features: [
      "Secure environment to prevent wandering",
      "Specially trained staff",
      "Cognitive stimulation programs",
      "24-hour supervision and care",
      "Personalized care plans",
      "Family support and education",
      "Medication management",
    ],
    questions: [
      { q: "What's the difference between memory care and assisted living?", a: "Memory care units have higher staff-to-resident ratios, secure environments to prevent wandering, and staff trained specifically in dementia care." },
      { q: "When should I consider memory care?", a: "Consider memory care when safety becomes a concern - wandering, forgetting to take medications, or needing supervision at all times." },
      { q: "Can couples live in memory care together?", a: "Many facilities offer couples' suites or can accommodate couples where one partner needs memory care." },
    ],
  },
  "independent-living": {
    name: "Independent Living",
    description: "Senior living communities with minimal assistance, focusing on lifestyle and community.",
    who: "Active seniors who want a maintenance-free lifestyle with social opportunities",
    cost: "$2,000 - $5,000/month",
    features: [
      "Private apartments or homes",
      "Community amenities and activities",
      "Restaurant-style dining",
      "Housekeeping services",
      "Transportation",
      "Fitness centers",
      "Social events and clubs",
    ],
    questions: [
      { q: "Do independent living facilities provide medical care?", a: "Typically no, but many have partnerships with home health agencies that can provide care if needed." },
      { q: "What's the difference between independent living and assisted living?", a: "Independent living is for active seniors who don't need daily assistance, while assisted living provides help with daily activities." },
      { q: "Can I have guests?", a: "Most independent living communities welcome guests, though there may be policies on overnight stays." },
    ],
  },
  "skilled-nursing": {
    name: "Skilled Nursing",
    description: "24/7 medical care and rehabilitation services for those with complex health needs.",
    who: "Seniors requiring 24/7 medical care or post-hospital rehabilitation",
    cost: "$6,000 - $12,000/month",
    features: [
      "24/7 licensed nursing staff",
      "Physician on-call or on-site",
      "Rehabilitation services",
      "Wound care",
      "IV therapy",
      "Physical, occupational, and speech therapy",
      "Medication administration",
    ],
    questions: [
      { q: "Does Medicare cover skilled nursing?", a: "Medicare covers skilled nursing for up to 100 days per benefit period, but only after a 3-day hospital stay. Coverage decreases after day 20." },
      { q: "What's the difference between SNF and nursing home?", a: "SNFs (Skilled Nursing Facilities) provide 24/7 medical care with licensed nurses. Traditional nursing homes focus more on custodial care." },
      { q: "How long do people stay in skilled nursing?", a: "Stays can range from a few weeks for rehabilitation to long-term for those with complex medical needs." },
    ],
  },
};

export default async function CareTypePage({ params }: PageProps) {
  const { slug } = await params;
  const type = careTypes[slug];

  if (!type) {
    return (
      <div className="max-content px-4 py-12">
        <h1 className="text-headline">Care type not found</h1>
        <Link href="/types" className="text-label hover:text-accent-brass mt-4 inline-block">
          ← Back to all care types
        </Link>
      </div>
    );
  }

  return (
    <div className="max-content px-4 py-12">
      <nav className="text-meta mb-8" style={{ color: 'var(--color-metadata)' }}>
        <Link href="/" className="hover:text-accent-brass transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/types" className="hover:text-accent-brass transition-colors">Care Types</Link>
        <span className="mx-2">›</span>
        <span style={{ color: 'var(--color-foreground-muted)' }}>{type.name}</span>
      </nav>

      <div className="mb-12">
        <h1 className="text-display mb-4">{type.name}</h1>
        <p className="text-xl" style={{ color: 'var(--color-foreground-muted)' }}>
          {type.description}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <section className="mb-12">
            <h2 className="text-section-header mb-6">What is {type.name}?</h2>
            <p className="mb-6" style={{ color: 'var(--color-foreground-muted)', lineHeight: 1.8 }}>
              {type.description}
            </p>
            <div 
              className="p-6"
              style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
            >
              <p className="text-label mb-2">Best for</p>
              <p style={{ color: 'var(--color-foreground)' }}>{type.who}</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-section-header mb-6">Typical Features</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {type.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <span style={{ color: 'var(--color-accent-brass)' }}>◆</span>
                  <span style={{ color: 'var(--color-foreground-muted)' }}>{feature}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-section-header mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {type.questions.map((qa, i) => (
                <div 
                  key={i} 
                  className="p-6"
                  style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
                >
                  <h3 className="text-lg mb-3" style={{ color: 'var(--color-foreground)' }}>{qa.q}</h3>
                  <p style={{ color: 'var(--color-foreground-muted)', lineHeight: 1.8 }}>{qa.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div>
          <div 
            className="p-6 sticky top-4"
            style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
          >
            <h3 className="text-section-header mb-6">Quick Facts</h3>
            
            <div className="mb-6">
              <p className="text-label mb-2">Typical Cost</p>
              <p className="text-xl" style={{ color: 'var(--color-accent-brass)' }}>{type.cost}</p>
            </div>

            <div className="mb-6">
              <p className="text-label mb-2">Payment Options</p>
              <ul className="text-sm space-y-1" style={{ color: 'var(--color-foreground-muted)' }}>
                <li>Private pay</li>
                <li>Long-term care insurance</li>
                <li>Medicaid (some facilities)</li>
                <li>Veterans benefits</li>
              </ul>
            </div>

            <Link
              href={`/new-jersey?type=${slug}`}
              className="btn btn-primary block text-center"
              style={{ borderRadius: '2px' }}
            >
              View Communities in NJ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
