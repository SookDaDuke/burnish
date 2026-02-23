import { Metadata } from "next";
import TierBadge from "../components/TierBadge";

export const metadata: Metadata = {
  title: "The Burnish Standard | How We Score Communities",
  description: "The Burnish Score is a proprietary 0–100 score assigned to communities based on five weighted categories. Learn our methodology.",
};

export default function BurnishStandardPage() {
  return (
    <div className="max-content px-4 py-12">
      <h1 className="text-display mb-4">The Burnish Standard</h1>
      <p 
        className="text-xl mb-12 max-w-2xl"
        style={{ color: 'var(--color-foreground-muted)' }}
      >
        The Burnish Score is our proprietary 0–100 scoring system, built on five weighted 
        categories that reflect what we believe matters most to families and residents.
      </p>

      <div className="divider mb-12"></div>

      {/* Score Tiers */}
      <section className="mb-16">
        <h2 className="text-headline mb-8">Score Tiers</h2>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="p-6" style={{ background: 'var(--color-background-secondary)' }}>
            <TierBadge tier="platinum" score={95} />
            <p className="text-sm mt-2" style={{ color: 'var(--color-foreground-muted)' }}>
              90–100 · Exceptional in all categories. Reserved — very few communities qualify.
            </p>
          </div>
          <div className="p-6" style={{ background: 'var(--color-background-secondary)' }}>
            <TierBadge tier="gold" score={82} />
            <p className="text-sm mt-2" style={{ color: 'var(--color-foreground-muted)' }}>
              75–89 · Highly recommended. Strong across most or all categories.
            </p>
          </div>
          <div className="p-6" style={{ background: 'var(--color-background-secondary)' }}>
            <TierBadge tier="silver" score={67} />
            <p className="text-sm mt-2" style={{ color: 'var(--color-foreground-muted)' }}>
              60–74 · Solid and reviewed. Notable strengths with some considerations.
            </p>
          </div>
          <div className="p-6" style={{ background: 'var(--color-background-secondary)' }}>
            <TierBadge tier="bronze" score={52} />
            <p className="text-sm mt-2" style={{ color: 'var(--color-foreground-muted)' }}>
              45–59 · Listed and reviewed. May suit specific needs or budgets.
            </p>
          </div>
          <div className="p-6" style={{ background: 'var(--color-background-secondary)' }}>
            <TierBadge tier="in-assay" />
            <p className="text-sm mt-2" style={{ color: 'var(--color-foreground-muted)' }}>
              Assessment in progress. Score forthcoming.
            </p>
          </div>
        </div>
      </section>

      {/* Scoring Categories */}
      <section className="mb-16">
        <h2 className="text-headline mb-8">Scoring Categories</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8" style={{ background: 'var(--color-background-secondary)' }}>
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-section-header">Care Quality & Staff</h3>
              <span className="text-label" style={{ color: 'var(--color-accent-brass)' }}>30 pts</span>
            </div>
            <p style={{ color: 'var(--color-foreground-muted)' }}>
              State inspection scores, deficiency reports, staff-to-resident ratio, staff tenure, 
              specialized certifications (especially memory care). Sourced from CMS Care Compare.
            </p>
          </div>
          <div className="p-8" style={{ background: 'var(--color-background-secondary)' }}>
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-section-header">Residential Experience</h3>
              <span className="text-label" style={{ color: 'var(--color-accent-brass)' }}>20 pts</span>
            </div>
            <p style={{ color: 'var(--color-foreground-muted)' }}>
              Physical environment, design quality, private vs. shared spaces, outdoor grounds, 
              overall aesthetic standard. Primary question: would someone with taste actually want to live here?
            </p>
          </div>
          <div className="p-8" style={{ background: 'var(--color-background-secondary)' }}>
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-section-header">Dining & Culinary</h3>
              <span className="text-label" style={{ color: 'var(--color-accent-brass)' }}>20 pts</span>
            </div>
            <p style={{ color: 'var(--color-foreground-muted)' }}>
              Chef credentials, menu variety and quality, dining room ambiance, private dining 
              availability, special dietary accommodation. A major signal of overall community quality.
            </p>
          </div>
          <div className="p-8" style={{ background: 'var(--color-background-secondary)' }}>
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-section-header">Life & Community</h3>
              <span className="text-label" style={{ color: 'var(--color-accent-brass)' }}>15 pts</span>
            </div>
            <p style={{ color: 'var(--color-foreground-muted)' }}>
              Programming breadth and quality, social calendar, fitness offerings, cultural events, 
              transportation, concierge services. The joie de vivre dimension.
            </p>
          </div>
          <div className="p-8 md:col-span-2" style={{ background: 'var(--color-background-secondary)' }}>
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-section-header">Family Experience</h3>
              <span className="text-label" style={{ color: 'var(--color-accent-brass)' }}>15 pts</span>
            </div>
            <p style={{ color: 'var(--color-foreground-muted)' }}>
              Communication practices, transparency, visitor policies, family satisfaction data where available. 
              Speaks directly to the adult-child audience.
            </p>
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="mb-16">
        <h2 className="text-headline mb-8">Data Sources</h2>
        <div className="prose max-w-none" style={{ color: 'var(--color-foreground-muted)' }}>
          <p className="mb-6">
            Burnish scores are built in layers:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>CMS Care Compare</strong> — provides state inspection scores, deficiency reports, 
              staffing ratios, and health inspection data for all Medicare/Medicaid certified facilities. 
              This is our foundation.
            </li>
            <li>
              <strong>Facility materials</strong> — websites, marketing materials, and Crawl4AI-assisted 
              extraction for enrichment.
            </li>
            <li>
              <strong>Direct outreach</strong> — site visits and structured questionnaires to admissions 
              directors for high-tier candidates.
            </li>
          </ul>
          <p className="mt-6">
            Scores are updated annually or when material changes are identified.
          </p>
        </div>
      </section>

      {/* In Assay */}
      <section className="mb-16">
        <h2 className="text-headline mb-8">In Assay</h2>
        <p style={{ color: 'var(--color-foreground-muted)' }}>
          Communities that have not yet been scored display the{" "}
          <TierBadge tier="in-assay" /> badge. This signals that assessment is in progress, 
          not that the community was overlooked. We are actively working on evaluating these communities.
        </p>
      </section>
    </div>
  );
}
