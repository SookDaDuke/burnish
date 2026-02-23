import Link from "next/link";
import { getGlossaryTerms } from "@/lib/supabase/data";

export const metadata = {
  title: "Senior Living Glossary | Burnish",
  description: "Understanding senior care terminology — from ADLs to CCGs, we explain it all.",
};

export default async function GlossaryPage() {
  let terms = [];
  
  try {
    terms = await getGlossaryTerms();
  } catch (e) {
    console.log('Using placeholder data');
  }

  // Placeholder if no data
  if (terms.length === 0) {
    terms = [
      { term: 'ADLs', slug: 'adls', short_definition: 'Activities of Daily Living - basic self-care tasks' },
      { term: 'IADLs', slug: 'iadls', short_definition: 'Instrumental Activities of Daily Living - complex daily tasks' },
      { term: 'Assisted Living', slug: 'assisted-living-definition', short_definition: 'Housing with personal care support' },
      { term: 'Memory Care', slug: 'memory-care-definition', short_definition: 'Specialized care for dementia and Alzheimer\'s' },
      { term: 'CCRC', slug: 'ccrc', short_definition: 'Continuing Care Retirement Community' },
      { term: 'SNF', slug: 'snf', short_definition: 'Skilled Nursing Facility' },
      { term: 'Medicaid Waiver', slug: 'medicaid-waiver', short_definition: 'Program to pay for home/community care' },
      { term: 'Level of Care Assessment', slug: 'level-of-care-assessment', short_definition: 'Evaluation to determine care needs' },
      { term: 'Respite Care', slug: 'respite-care-definition', short_definition: 'Short-term relief for caregivers' },
      { term: 'Personal Care', slug: 'personal-care', short_definition: 'Help with daily activities' },
    ];
  }

  // Group by first letter
  const grouped = terms.reduce((acc: any, term: any) => {
    const letter = term.term[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(term);
    return acc;
  }, {});

  const sortedLetters = Object.keys(grouped).sort();

  return (
    <div className="max-content px-4 py-12">
      <nav className="text-meta mb-8" style={{ color: 'var(--color-metadata)' }}>
        <Link href="/" className="hover:text-accent-brass transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <span style={{ color: 'var(--color-foreground-muted)' }}>Glossary</span>
      </nav>

      <h1 className="text-headline mb-4">Senior Living Glossary</h1>
      <p className="text-xl mb-12 max-w-2xl" style={{ color: 'var(--color-foreground-muted)' }}>
        Understanding senior care terminology. Find definitions for common terms used in assisted living, memory care, and senior housing.
      </p>

      {/* Alphabet Navigation */}
      <div className="flex flex-wrap gap-2 mb-12">
        {sortedLetters.map((letter) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className="w-10 h-10 flex items-center justify-center text-label hover:text-accent-brass transition-colors"
            style={{ border: '1px solid var(--color-metadata)', borderRadius: '2px' }}
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Terms */}
      <div className="space-y-12">
        {sortedLetters.map((letter) => (
          <div key={letter} id={`letter-${letter}`}>
            <h2 
              className="text-section-header mb-6 flex items-center"
              style={{ color: 'var(--color-accent-brass)' }}
            >
              {letter}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {grouped[letter].map((term: any) => (
                <Link
                  key={term.slug}
                  href={`/glossary/${term.slug}`}
                  className="card-shadow block p-6"
                  style={{ 
                    background: 'var(--color-background-secondary)',
                    borderRadius: '2px',
                    transition: 'transform 200ms ease'
                  }}
                >
                  <h3 className="text-lg mb-2" style={{ color: 'var(--color-foreground)' }}>{term.term}</h3>
                  <p className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>{term.short_definition}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {terms.length === 0 && (
        <div className="text-center py-12" style={{ color: 'var(--color-foreground-muted)' }}>
          <p className="text-lg">No glossary terms available yet.</p>
          <p className="mt-2">Check back soon!</p>
        </div>
      )}
    </div>
  );
}
