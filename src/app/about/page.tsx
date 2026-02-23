import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Burnish",
  description: "The Mr & Mrs Smith of senior living — comprehensive coverage with a luxury editorial lens.",
};

export default function AboutPage() {
  return (
    <div className="max-content px-4 py-12">
      <h1 className="text-display mb-4">About Burnish</h1>
      <p 
        className="text-xl mb-12 max-w-2xl"
        style={{ color: 'var(--color-foreground-muted)' }}
      >
        Burnish is a curated directory and editorial media brand covering assisted living and senior 
        living communities, starting with New Jersey.
      </p>

      <div className="divider mb-12"></div>

      <section className="mb-16 max-w-3xl">
        <h2 className="text-headline mb-6">Our Story</h2>
        <p className="mb-6" style={{ color: 'var(--color-foreground-muted)', lineHeight: 1.8 }}>
          The name "Burnish" comes from the craft of burnishing metal — where use and time produce 
          beauty and character. The metaphor underpins our editorial philosophy: a life burnished by 
          experience deserves recognition, not diminishment.
        </p>
        <p style={{ color: 'var(--color-foreground-muted)', lineHeight: 1.8 }}>
          We believe adult children researching for their parents, and older adults researching for 
          themselves, deserve the same quality of curation they apply to travel, dining, and design. 
          We're the Mr & Mrs Smith of senior living — comprehensive coverage with a luxury editorial lens.
        </p>
      </section>

      <section className="mb-16 max-w-3xl">
        <h2 className="text-headline mb-6">How We're Different</h2>
        <ul className="space-y-4" style={{ color: 'var(--color-foreground-muted)' }}>
          <li className="flex gap-4">
            <span style={{ color: 'var(--color-accent-brass)' }}>◆</span>
            <span>
              <strong className="text-foreground">We're not a lead farm.</strong> We're an editorial brand 
              that happens to generate leads. That distinction shapes everything we do.
            </span>
          </li>
          <li className="flex gap-4">
            <span style={{ color: 'var(--color-accent-brass)' }}>◆</span>
            <span>
              <strong className="text-foreground">We don't take referral fees.</strong> Our recommendations 
              are based on quality, not payment. Families trust us because we're not salespeople.
            </span>
          </li>
          <li className="flex gap-4">
            <span style={{ color: 'var(--color-accent-brass)' }}>◆</span>
            <span>
              <strong className="text-foreground">We tell it like it is.</strong> If a community excels 
              at dining but has a dated lobby, we say so. We're not neutral — we have a point of view.
            </span>
          </li>
          <li className="flex gap-4">
            <span style={{ color: 'var(--color-accent-brass)' }}>◆</span>
            <span>
              <strong className="text-foreground">We show all licensed facilities.</strong> Not just the 
              ones that pay us. Because families deserve the full picture.
            </span>
          </li>
        </ul>
      </section>

      <section className="max-w-3xl">
        <h2 className="text-headline mb-6">Our Audience</h2>
        <p className="mb-6" style={{ color: 'var(--color-foreground-muted)', lineHeight: 1.8 }}>
          <strong className="text-foreground">Primary:</strong> Adult children (typically daughters, ages 45–60) 
          researching communities on behalf of a parent. They're doing this research late at night, under 
          emotional pressure, and need trusted curation more than raw data.
        </p>
        <p style={{ color: 'var(--color-foreground-muted)', lineHeight: 1.8 }}>
          <strong className="text-foreground">Secondary:</strong> Older adults (70+) who are cognitively 
          sharp, financially independent, and researching for themselves. They're choosing a lifestyle 
          upgrade, not being placed. They have strong taste and will not tolerate condescension.
        </p>
      </section>
    </div>
  );
}
