import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const termName = slug.replace(/-/g, ' ');
  
  return {
    title: `${termName} Definition | Burnish Glossary`,
    description: `Learn what ${termName} means in senior care.`,
  };
}

const glossaryTerms: Record<string, {
  term: string;
  short_definition: string;
  long_definition: string;
  category: string;
}> = {
  "adls": {
    term: "ADLs",
    short_definition: "Activities of Daily Living - basic self-care tasks",
    long_definition: "ADLs stand for Activities of Daily Living, which are fundamental self-care tasks that individuals need to perform independently. These include bathing, dressing, toileting, transferring (getting in/out of bed/chair), continence control, and eating. Assisted living facilities typically help residents with ADLs based on their individual care plans.",
    category: "care"
  },
  "iadls": {
    term: "IADLs",
    short_definition: "Instrumental Activities of Daily Living - complex daily tasks",
    long_definition: "IADLs are Instrumental Activities of Daily Living that involve more complex thinking and organizational skills, including managing finances, handling transportation, shopping, preparing meals, using telephone/technology, doing housework, and taking medications. These are often used to assess whether someone needs assisted living care.",
    category: "care"
  },
  "assisted-living-definition": {
    term: "Assisted Living",
    short_definition: "Housing with personal care support",
    long_definition: "Assisted living is a type of housing designed for individuals who need help with daily activities but want to maintain independence. Facilities provide meals, assistance with ADLs, medication management, housekeeping, and social activities. Residents typically have their own apartments and can come and go as they please.",
    category: "care"
  },
};

export default async function GlossaryTermPage({ params }: PageProps) {
  const { slug } = await params;
  const term = glossaryTerms[slug];

  if (!term) {
    return (
      <div className="max-content px-4 py-12">
        <h1 className="text-headline">Term not found</h1>
        <Link href="/glossary" className="text-label hover:text-accent-brass mt-4 inline-block">
          ← Back to glossary
        </Link>
      </div>
    );
  }

  return (
    <div className="max-content px-4 py-12">
      <nav className="text-meta mb-8" style={{ color: 'var(--color-metadata)' }}>
        <Link href="/" className="hover:text-accent-brass transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/glossary" className="hover:text-accent-brass transition-colors">Glossary</Link>
        <span className="mx-2">›</span>
        <span style={{ color: 'var(--color-foreground-muted)' }}>{term.term}</span>
      </nav>

      <h1 className="text-display mb-8">{term.term}</h1>
      
      <div 
        className="p-8 mb-12"
        style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
      >
        <p className="text-xl" style={{ color: 'var(--color-foreground-muted)', fontFamily: 'var(--font-display)' }}>
          {term.short_definition}
        </p>
      </div>

      <div className="max-w-3xl mb-12">
        <h2 className="text-section-header mb-6">Definition</h2>
        <p className="text-lg" style={{ color: 'var(--color-foreground-muted)', lineHeight: 1.8 }}>
          {term.long_definition}
        </p>

        <div className="divider mt-12"></div>
        
        <div className="mt-6">
          <span 
            className="text-label"
            style={{ color: 'var(--color-metadata)' }}
          >
            Category: {term.category}
          </span>
        </div>
      </div>

      <div 
        className="p-8"
        style={{ background: 'var(--color-background-secondary)', borderRadius: '2px' }}
      >
        <h2 className="text-section-header mb-6">Related Terms</h2>
        <div className="flex flex-wrap gap-2">
          {Object.keys(glossaryTerms)
            .filter(s => s !== slug)
            .slice(0, 5)
            .map(s => (
              <Link
                key={s}
                href={`/glossary/${s}`}
                className="text-label px-4 py-2"
                style={{ 
                  border: '1px solid var(--color-metadata)', 
                  borderRadius: '2px',
                  color: 'var(--color-foreground-muted)'
                }}
              >
                {glossaryTerms[s].term}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
