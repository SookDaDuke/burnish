import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import ThemeToggle from "./components/ThemeToggle";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-display",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Burnish | Curated Assisted Living Directory",
  description: "The Mr & Mrs Smith of senior living — comprehensive coverage with a luxury editorial lens, written for discerning adult children and older adults.",
  keywords: "assisted living, memory care, senior living, New Jersey, Burnish",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${jost.variable}`}>
        <header className="border-b" style={{ borderColor: 'rgba(201, 169, 110, 0.15)' }}>
          <div className="max-content px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-headline" style={{ color: 'var(--color-accent-brass)' }}>
                Burnish
              </Link>
              <nav className="hidden md:flex gap-8 items-center">
                <Link href="/directory" className="text-label hover:text-accent-brass transition-colors">
                  Directory
                </Link>
                <Link href="/the-edit" className="text-label hover:text-accent-brass transition-colors">
                  The Edit
                </Link>
                <Link href="/local-knowledge" className="text-label hover:text-accent-brass transition-colors">
                  Local Knowledge
                </Link>
                <Link href="/the-burnish-standard" className="text-label hover:text-accent-brass transition-colors">
                  The Burnish Standard
                </Link>
                <Link href="/get-matched" className="text-label hover:text-accent-brass transition-colors" style={{ color: 'var(--color-accent-brass)' }}>
                  Get Matched
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer style={{ background: 'var(--color-background-secondary)' }} className="mt-16">
          <div className="max-content px-4 py-12">
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <h3 className="text-section-header mb-4">About Burnish</h3>
                <p className="text-sm" style={{ color: 'var(--color-foreground-muted)' }}>
                  The Mr & Mrs Smith of senior living — comprehensive coverage with a luxury editorial lens. 
                  We're the transparent alternative: we work for families, not facilities.
                </p>
              </div>
              <div>
                <h3 className="text-section-header mb-4">Explore</h3>
                <ul className="text-sm space-y-2" style={{ color: 'var(--color-foreground-muted)' }}>
                  <li><Link href="/new-jersey" className="hover:text-accent-brass transition-colors">New Jersey Directory</Link></li>
                  <li><Link href="/the-edit" className="hover:text-accent-brass transition-colors">The Edit Collections</Link></li>
                  <li><Link href="/local-knowledge" className="hover:text-accent-brass transition-colors">Local Knowledge Guides</Link></li>
                  <li><Link href="/the-burnish-standard" className="hover:text-accent-brass transition-colors">Our Scoring Method</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-section-header mb-4">The Burnish Dispatch</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--color-foreground-muted)' }}>
                  New community reviews, The Mark on standout details, and curated Edits — dispatched when ready.
                </p>
                <form className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email"
                    className="px-4 py-2 text-sm"
                    style={{ 
                      background: 'var(--color-background)', 
                      border: '1px solid var(--color-metadata)',
                      color: 'var(--color-foreground)'
                    }}
                  />
                  <button type="submit" className="btn btn-primary text-label">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            <div className="divider mt-12"></div>
            <div className="mt-8 text-center text-meta" style={{ color: 'var(--color-metadata)' }}>
              © {new Date().getFullYear()} Burnish. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
