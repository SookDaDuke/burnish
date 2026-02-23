import Link from "next/link";

export const metadata = {
  title: "The Burnish Dispatch | Newsletter",
  description: "New community reviews, The Mark on standout details, and curated Edits — dispatched when ready.",
};

export default function DispatchPage() {
  const recentDispatches = [
    {
      title: "The Edit: Memory Care",
      excerpt: "We've curated our favorite memory care communities across New Jersey.",
      date: "February 15, 2026",
      slug: "/the-edit/memory-care",
    },
    {
      title: "Local Knowledge: Bergen County",
      excerpt: "An insider's guide to senior living in New Jersey's most populous county.",
      date: "February 10, 2026",
      slug: "/local-knowledge/bergen",
    },
    {
      title: "What the Burnish Score Measures",
      excerpt: "A deep dive into our scoring methodology and what each category means.",
      date: "February 5, 2026",
      slug: "/the-burnish-standard",
    },
  ];

  return (
    <div className="max-content px-4 py-12">
      <nav className="text-meta mb-8" style={{ color: 'var(--color-metadata)' }}>
        <Link href="/" className="hover:text-accent-brass transition-colors">Home</Link>
        <span className="mx-2">›</span>
        <span style={{ color: 'var(--color-foreground-muted)' }}>The Burnish Dispatch</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Subscribe Form */}
        <div>
          <h1 className="text-display mb-6">The Burnish Dispatch</h1>
          <p className="text-xl mb-8" style={{ color: 'var(--color-foreground-muted)' }}>
            New community reviews, The Mark on standout details, and curated Edits — dispatched to your inbox when they're ready.
          </p>
          
          <form className="space-y-4">
            <div>
              <label 
                htmlFor="email" 
                className="text-label block mb-2"
                style={{ color: 'var(--color-metadata)' }}
              >
                Email Address
              </label>
              <input 
                type="email" 
                id="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3"
                style={{ 
                  background: 'var(--color-background)', 
                  border: '1px solid var(--color-metadata)',
                  color: 'var(--color-foreground)',
                  borderRadius: '2px'
                }}
              />
            </div>
            <div>
              <label 
                htmlFor="name" 
                className="text-label block mb-2"
                style={{ color: 'var(--color-metadata)' }}
              >
                Name (optional)
              </label>
              <input 
                type="text" 
                id="name"
                placeholder="Your name"
                className="w-full px-4 py-3"
                style={{ 
                  background: 'var(--color-background)', 
                  border: '1px solid var(--color-metadata)',
                  color: 'var(--color-foreground)',
                  borderRadius: '2px'
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary w-full" style={{ borderRadius: '2px' }}>
              Subscribe to The Dispatch
            </button>
          </form>

          <p className="mt-4 text-sm" style={{ color: 'var(--color-metadata)' }}>
            We respect your inbox. No spam, no sharing your email, justBurnish when there's something worth sharing.
          </p>
        </div>

        {/* Recent Dispatches */}
        <div>
          <h2 className="text-section-header mb-8">Recent Dispatches</h2>
          <div className="space-y-6">
            {recentDispatches.map((dispatch, i) => (
              <Link
                key={i}
                href={dispatch.slug}
                className="block card-shadow p-6"
                style={{ 
                  background: 'var(--color-background-secondary)',
                  borderRadius: '2px',
                  transition: 'transform 200ms ease'
                }}
              >
                <p className="text-meta mb-2" style={{ color: 'var(--color-metadata)' }}>
                  {dispatch.date}
                </p>
                <h3 className="text-lg mb-2">{dispatch.title}</h3>
                <p className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>
                  {dispatch.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
