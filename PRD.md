# PRD: Assisted Living Directory

## Project Codename: **ClearChoice Senior Living**

_The anti-A Place For Mom._

---

## Problem

Finding assisted living for a parent is one of the most stressful decisions a family makes. The dominant player — A Place For Mom (APFM) — makes money through **referral fees from facilities** (often $3,000-$5,000+ per placement). This creates a fundamental conflict of interest:

- **APFM gets paid by facilities**, not families → they recommend whoever pays the most, not who's best
- Families think they're getting unbiased advice — they're getting a sales funnel
- Facilities that don't pay referral fees are invisible, even if they're better
- "Advisors" are commission-based salespeople with quotas
- Reviews and rankings are influenced by commercial relationships
- No transparency about how recommendations are made

**The result:** Families make $5,000-$10,000/month decisions based on biased recommendations disguised as guidance.

## Opportunity

- ~30,000 assisted living facilities in the US (~700+ in NJ alone)
- $100B+ industry growing 5-7% annually as boomers age
- "Assisted living near me" and "[city] assisted living" are high-intent, high-volume keywords
- Families searching are in **decision mode** — ready to act
- Trust is the #1 factor and APFM has eroded it
- No major player has positioned as the **transparent, family-first alternative**

## Our Angle: Radical Transparency

We don't take referral fees from facilities. Period.

Instead, we make money by:
1. **Selling qualified leads** to facilities (they know they're buying leads — no pretend "advisors")
2. **Premium facility listings** (verified, enhanced profiles — clearly labeled as promoted)
3. **Content/affiliate** (senior care products, insurance, moving services)
4. **Eventually: SaaS tools** for facilities (reputation management, review response, occupancy optimization)

**Why families choose us over APFM:**
- We show ALL facilities, not just ones that pay us
- We explain our business model on every page (radical transparency)
- Real, unfiltered reviews from families — we don't curate or suppress
- Data-driven comparisons (staffing ratios, violation history, pricing transparency)
- No "advisors" calling to pressure you — self-serve with optional human help

**Positioning:** "We're Consumer Reports for assisted living. We work for you, not the facilities."

---

## Scope

### Phase 1: New Jersey Directory (MVP)
- All assisted living facilities in NJ (~700+)
- City/town pages for every NJ municipality with facilities
- County pages
- Category pages (memory care, independent living, skilled nursing, etc.)
- Facility profile pages with public data
- Glossary of senior care terms
- "Best of" pages (best assisted living in [city])
- Comparison pages (Facility A vs Facility B)
- Blog/guide content for SEO topical authority

### Phase 2: Expand to Tri-State
- New York, Pennsylvania, Connecticut
- Same architecture, just more data

### Phase 3: National
- All 50 states
- State → county → city hierarchy

---

## Technical Architecture

### Stack
- **Framework:** Next.js 14+ (App Router, ISR)
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel
- **Domain:** TBD (something like clearchoicesenior.com, honestseniorliving.com, etc.)

### Data Model

Adapted from the pSEO skill's entity-location pattern:

#### `facilities` (replaces `entities`)
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| name | TEXT | Facility name |
| slug | TEXT | URL-safe unique identifier |
| facility_type | TEXT[] | assisted_living, memory_care, independent_living, skilled_nursing, continuing_care |
| description | TEXT | Short description |
| long_description | TEXT | Full profile content |
| address_line1 | TEXT | Street address |
| address_line2 | TEXT | Suite/unit |
| city | TEXT | City name |
| county | TEXT | County name |
| state | TEXT | State abbreviation |
| zip | TEXT | ZIP code |
| phone | TEXT | Primary phone |
| website_url | TEXT | Facility website |
| image_url | TEXT | Primary photo |
| gallery_urls | TEXT[] | Additional photos |
| capacity | INTEGER | Number of beds/units |
| year_established | INTEGER | When opened |
| ownership_type | TEXT | for_profit, non_profit, government |
| chain_name | TEXT | Parent company if applicable |
| license_number | TEXT | State license # |
| license_status | TEXT | active, provisional, suspended |
| accepts_medicaid | BOOLEAN | |
| accepts_medicare | BOOLEAN | |
| price_range_low | INTEGER | Monthly cost low end (cents) |
| price_range_high | INTEGER | Monthly cost high end (cents) |
| amenities | TEXT[] | WiFi, pool, garden, etc. |
| services | TEXT[] | 24hr nursing, medication management, etc. |
| staffing_ratio | TEXT | e.g., "1:8 day, 1:12 night" |
| rating_avg | DECIMAL | Cached average rating |
| review_count | INTEGER | Cached review count |
| violation_count | INTEGER | State inspection violations |
| last_inspection_date | DATE | Most recent state inspection |
| is_featured | BOOLEAN | Premium listing |
| is_verified | BOOLEAN | We verified the data |
| data_source | TEXT | Where we got this data |
| metadata | JSONB | Flexible storage |
| latitude | DECIMAL | |
| longitude | DECIMAL | |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

#### `locations`
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| name | TEXT | City/town name |
| county | TEXT | County name |
| state | TEXT | State abbreviation |
| state_full | TEXT | Full state name |
| slug | TEXT | URL-safe unique identifier |
| location_type | TEXT | city, county, state |
| latitude | DECIMAL | |
| longitude | DECIMAL | |
| population | INTEGER | |
| median_age | DECIMAL | For demographic context |
| senior_population_pct | DECIMAL | % of pop 65+ |
| custom_content | JSONB | AI-generated prose, FAQs |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

#### `facility_locations` (many-to-many)
Standard junction table linking facilities to the cities/counties they're in.

#### `reviews`
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| facility_id | UUID | FK |
| reviewer_name | TEXT | Display name |
| relationship | TEXT | spouse, child, sibling, self, other |
| rating_overall | INTEGER | 1-5 |
| rating_staff | INTEGER | 1-5 |
| rating_activities | INTEGER | 1-5 |
| rating_food | INTEGER | 1-5 |
| rating_cleanliness | INTEGER | 1-5 |
| rating_value | INTEGER | 1-5 |
| stay_duration | TEXT | "6 months", "2 years", etc. |
| comment | TEXT | Review text |
| is_verified | BOOLEAN | Verified reviewer |
| helpful_count | INTEGER | |
| created_at | TIMESTAMPTZ | |

#### `categories`
Types of care: Assisted Living, Memory Care, Independent Living, Skilled Nursing, Continuing Care Retirement Communities (CCRC), Adult Day Care, Respite Care.

#### `glossary_terms`
Senior care terminology: ADLs, SNF, CCRC, Medicaid waiver, Level of care assessment, etc.

#### `violations` (bonus — competitive advantage)
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| facility_id | UUID | FK |
| violation_date | DATE | |
| violation_type | TEXT | |
| description | TEXT | |
| severity | TEXT | minor, moderate, serious |
| corrective_action | TEXT | |
| resolved | BOOLEAN | |
| source_url | TEXT | Link to state inspection report |

### URL Structure

```
/                                          → Homepage
/new-jersey/                               → NJ state landing page
/new-jersey/[county]/                      → County page (e.g., /new-jersey/essex-county/)
/new-jersey/[county]/[city]/               → City page (e.g., /new-jersey/essex-county/montclair/)
/facility/[slug]/                          → Facility profile
/facility/[slug]/reviews/                  → Facility reviews
/compare/[facility-a]-vs-[facility-b]/     → Side-by-side comparison
/best/assisted-living-in-[city]-[state]/   → Best-of listicle
/best/memory-care-in-[city]-[state]/       → Best-of by care type
/alternatives/[facility-slug]/             → Alternatives to X
/types/[care-type]/                        → Care type category page
/types/[care-type]/[state]/                → Care type + state
/glossary/                                 → Glossary hub
/glossary/[term]/                          → Term definition
/guides/                                   → Blog/guide hub
/guides/[slug]/                            → Individual guide
/how-we-make-money/                        → Transparency page (critical for trust)
```

### Page Types & Estimated Volume (NJ Only)

| Page Type | Count | Target Keywords |
|-----------|-------|-----------------|
| State page | 1 | "assisted living in new jersey" |
| County pages | 21 | "assisted living in [county] county nj" |
| City pages | ~200 | "assisted living in [city] nj" |
| Facility profiles | ~700 | "[facility name]", "[facility name] reviews" |
| Best-of pages | ~200+ | "best assisted living in [city] nj" |
| Comparison pages | ~500+ | "[facility] vs [facility]" |
| Care type pages | ~7 | "memory care nj", "independent living nj" |
| Care type × city | ~200+ | "memory care in [city] nj" |
| Glossary terms | ~100 | "what is [term]" |
| Guides/blog | 20+ | Long-tail informational queries |
| **Total** | **~2,000+** | |

---

## Data Sources

### Primary (NJ)
1. **NJ Department of Health** — Licensed facility list, inspection reports, violation history
   - Public data, scrapeable
2. **Medicare.gov Care Compare** — Quality ratings, staffing data, health inspection results
   - Public API available
3. **Google Places API** — Name, address, phone, hours, photos, Google reviews
4. **State licensing databases** — License status, capacity, ownership

### Secondary
5. **Facility websites** — Scrape for amenities, services, pricing (where available)
6. **Yelp API** — Additional reviews
7. **Census data** — Demographics for location pages (senior population %, median age)

### User-Generated
8. **Our own reviews** — Collected through the platform
9. **Family submissions** — Corrections, updates to facility data

---

## Competitive Differentiation

| Feature | A Place For Mom | Us |
|---------|----------------|-----|
| Revenue model | Referral fees from facilities | Lead sales + premium listings (transparent) |
| Shows all facilities | Only paying partners | Every licensed facility |
| Review curation | Filters/suppresses negative | All reviews shown, unfiltered |
| Violation data | Hidden | Prominently displayed |
| Pricing transparency | "Call for pricing" | Published ranges where available |
| Staffing ratios | Not shown | Shown where available |
| "Advisor" calls | Aggressive follow-up sales | Self-serve, optional help |
| Business model explained | Buried in fine print | Dedicated transparency page |
| Comparison tools | None | Side-by-side facility comparisons |

---

## Monetization Strategy

### Phase 1 (MVP): Lead Generation
- Collect contact info from families searching → sell to facilities
- "Request info from this facility" button → qualified lead
- Pricing: $25-$75 per qualified lead (industry standard: $50-$200)
- Target: 100 leads/month × $50 = $5,000/month from NJ alone

### Phase 2: Premium Listings
- Enhanced facility profiles (more photos, video tours, featured placement)
- Pricing: $200-$500/month per facility
- Clearly labeled as "Featured" or "Promoted"
- Target: 20 facilities × $300/month = $6,000/month

### Phase 3: Content Monetization
- Affiliate partnerships (senior care products, insurance, moving services)
- Sponsored guides (clearly labeled)

### Phase 4: SaaS for Facilities
- Review management dashboard
- Reputation monitoring
- Competitor analysis tools
- Occupancy optimization
- Pricing: $200-$500/month per facility

---

## Content Strategy

### Informational Content (Topical Authority)
These guides establish E-E-A-T and drive top-of-funnel traffic:

1. "How to Choose an Assisted Living Facility: The Complete Guide"
2. "Assisted Living vs. Memory Care: What's the Difference?"
3. "How Much Does Assisted Living Cost in New Jersey? (2025)"
4. "Does Medicaid Cover Assisted Living in NJ?"
5. "Questions to Ask When Touring an Assisted Living Facility"
6. "Signs It's Time for Assisted Living"
7. "How to Pay for Assisted Living: 7 Options Most Families Don't Know About"
8. "Understanding Assisted Living Levels of Care"
9. "NJ Assisted Living Regulations: What Families Should Know"
10. "The Truth About A Place For Mom (And Why We're Different)"

### AI-Generated Location Content
- Unique prose for every city/county page
- Local context: demographics, nearby hospitals, senior community resources
- FAQs specific to each location

### Glossary
- 100+ senior care terms defined
- Internal links between related terms
- Targets "what is [term]" searches

---

## Trust Signals (Critical)

This entire project lives or dies on trust. Every page needs:

1. **"How We Make Money" link in footer** → transparency page explaining our model
2. **"We don't take referral fees"** badge/banner on search results
3. **Violation data prominently displayed** (not hidden behind clicks)
4. **Review methodology explained** (how we verify, what we don't filter)
5. **Data sourced clearly** ("Data from NJ Dept of Health, Medicare.gov, and our community")
6. **No fake urgency** ("Only 2 spots left!" — APFM does this)
7. **No dark patterns** — no forced phone calls, no bait-and-switch

---

## Design Principles

1. **Clean, calming, trustworthy** — This is an emotional decision. Don't add stress.
2. **Mobile-first** — Adult children searching during lunch breaks and late at night
3. **Fast** — No bloat. ISR + edge rendering. Sub-2s page loads.
4. **Accessible** — WCAG 2.1 AA minimum. Many users are seniors themselves.
5. **Information density over flashiness** — Data > stock photos

---

## MVP Success Criteria

- [ ] 2,000+ indexed pages in Google
- [ ] Ranking for 50+ "[city] assisted living" keywords in NJ within 6 months
- [ ] 500+ monthly organic visitors within 3 months
- [ ] 5,000+ monthly organic visitors within 6 months
- [ ] 50+ leads/month within 6 months
- [ ] Revenue: $2,500/month within 6 months

---

## Implementation Plan

### Sprint 1: Foundation (Week 1-2)
- [ ] Set up Next.js project + Supabase
- [ ] Implement database schema
- [ ] Build data scraping pipeline (NJ DOH, Medicare.gov, Google Places)
- [ ] Import all NJ facilities
- [ ] Import all NJ locations (cities, counties)

### Sprint 2: Core Pages (Week 3-4)
- [ ] State landing page
- [ ] County pages
- [ ] City pages
- [ ] Facility profile pages
- [ ] Care type category pages
- [ ] Navigation + search

### Sprint 3: SEO Infrastructure (Week 5)
- [ ] Schema markup (all page types)
- [ ] Sitemap generation
- [ ] Robots.txt
- [ ] OG images
- [ ] Internal linking architecture
- [ ] AI content generation for all location pages

### Sprint 4: Competitive Features (Week 6)
- [ ] Comparison pages
- [ ] Best-of pages
- [ ] Alternatives pages
- [ ] Glossary
- [ ] "How We Make Money" transparency page

### Sprint 5: Lead Capture + Launch (Week 7-8)
- [ ] Lead capture forms ("Request info", "Schedule a tour")
- [ ] Lead notification system
- [ ] Review submission system
- [ ] Analytics setup (GA4, Search Console)
- [ ] Content quality audit
- [ ] Launch checklist
- [ ] Submit sitemap to Google
- [ ] Write + publish first 5 guides

---

## Open Questions

1. **Domain name?** — Need something trustworthy. Suggestions: ClearChoiceSenior.com, HonestSeniorCare.com, FamilyFirstSeniorLiving.com
2. **Brand name?** — Should evoke transparency and family-first values
3. **Design:** Build from scratch or use a template/UI kit?
4. **Vercel plan:** Free tier should work for MVP, but may need Pro for ISR volume
5. **Do we want a "call us" option?** Or purely self-serve to start?

---

## Why This Wins

1. **Structural SEO advantage** — 2,000+ pages targeting every assisted living keyword in NJ, with proper schema, internal linking, and unique content. APFM can't match this at the local level because they're national and generic.

2. **Trust moat** — Once families discover a directory that shows violation data, doesn't take referral fees, and explains its business model, they'll share it. Word of mouth in senior care communities is powerful.

3. **Data compounds** — Every review, correction, and update makes the directory more valuable. First-mover advantage in transparent senior care data.

4. **Expandable** — The architecture scales to any state with zero code changes. Just add data.

5. **Multiple revenue streams** — Not dependent on one monetization method. Leads, listings, content, and eventually SaaS.

---

_Created: Feb 20, 2025_
_Author: Roman + Jake_
_Status: Draft — awaiting Jake's review_
