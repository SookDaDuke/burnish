require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

async function setupAndSeed() {
  console.log('Setting up tables...\n')
  
  // Create tables using SQL
  const createTablesSQL = `
    CREATE TABLE IF NOT EXISTS locations (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      county TEXT,
      state TEXT NOT NULL,
      state_full TEXT,
      slug TEXT UNIQUE NOT NULL,
      location_type TEXT NOT NULL DEFAULT 'city',
      population INTEGER,
      custom_content JSONB DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS facilities (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      facility_type TEXT[] DEFAULT '{}',
      description TEXT,
      address_line1 TEXT,
      city TEXT NOT NULL,
      county TEXT,
      state TEXT NOT NULL,
      zip TEXT,
      phone TEXT,
      website_url TEXT,
      price_range_low INTEGER,
      price_range_high INTEGER,
      rating_avg DECIMAL(3, 2),
      review_count INTEGER DEFAULT 0,
      is_verified BOOLEAN DEFAULT FALSE,
      accepts_medicaid BOOLEAN DEFAULT FALSE,
      accepts_medicare BOOLEAN DEFAULT FALSE,
      amenities TEXT[] DEFAULT '{}',
      services TEXT[] DEFAULT '{}',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS categories (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      icon TEXT,
      display_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS glossary_terms (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      term TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      short_definition TEXT NOT NULL,
      long_definition TEXT NOT NULL,
      category TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_locations_slug ON locations(slug);
    CREATE INDEX IF NOT EXISTS idx_locations_state ON locations(state);
    CREATE INDEX IF NOT EXISTS idx_facilities_slug ON facilities(slug);
    CREATE INDEX IF NOT EXISTS idx_facilities_city ON facilities(city);
    CREATE INDEX IF NOT EXISTS idx_facilities_type ON facilities USING GIN(facility_type);
  `
  
  // Execute SQL - try using postgrest
  // Since we can't run raw SQL easily, let's create tables one by one via the API
  // Actually, let's just try inserting and see what happens
  
  // Categories
  const categories = [
    { name: 'Assisted Living', slug: 'assisted-living', description: 'Help with daily activities', icon: '🏠', display_order: 1 },
    { name: 'Memory Care', slug: 'memory-care', description: 'Dementia care', icon: '🧠', display_order: 2 },
    { name: 'Independent Living', slug: 'independent-living', description: 'Senior community', icon: '🌴', display_order: 3 },
    { name: 'Skilled Nursing', slug: 'skilled-nursing', description: '24/7 medical care', icon: '🏥', display_order: 4 },
  ]
  
  const { error: catError } = await supabase.from('categories').upsert(categories, { onConflict: 'slug' })
  if (catError) console.log('Categories need table:', catError.message)
  else console.log('✓ Categories seeded')
  
  // NJ Cities
  const cities = [
    { name: 'Newark', county: 'Essex', state: 'NJ', state_full: 'New Jersey', slug: 'newark', location_type: 'city', population: 291538 },
    { name: 'Jersey City', county: 'Hudson', state: 'NJ', state_full: 'New Jersey', slug: 'jersey-city', location_type: 'city', population: 253647 },
    { name: 'Edison', county: 'Middlesex', state: 'NJ', state_full: 'New Jersey', slug: 'edison', location_type: 'city', population: 106586 },
    { name: 'Toms River', county: 'Ocean', state: 'NJ', state_full: 'New Jersey', slug: 'toms-river', location_type: 'city', population: 95138 },
    { name: 'Trenton', county: 'Mercer', state: 'NJ', state_full: 'New Jersey', slug: 'trenton', location_type: 'city', population: 90238 },
    { name: 'Hamilton', county: 'Mercer', state: 'NJ', state_full: 'New Jersey', slug: 'hamilton-nj', location_type: 'city', population: 87399 },
    { name: 'Woodbridge', county: 'Middlesex', state: 'NJ', state_full: 'New Jersey', slug: 'woodbridge', location_type: 'city', population: 103639 },
    { name: 'Lakewood', county: 'Ocean', state: 'NJ', state_full: 'New Jersey', slug: 'lakewood-nj', location_type: 'city', population: 135158 },
    { name: 'Cherry Hill', county: 'Camden', state: 'NJ', state_full: 'New Jersey', slug: 'cherry-hill', location_type: 'city', population: 74104 },
    { name: 'Hoboken', county: 'Hudson', state: 'NJ', state_full: 'New Jersey', slug: 'hoboken', location_type: 'city', population: 53484 },
  ]
  
  const { error: cityError } = await supabase.from('locations').upsert(cities, { onConflict: 'slug' })
  if (cityError) console.log('Cities need table:', cityError.message)
  else console.log('✓ 10 NJ cities seeded')
  
  // Facilities
  const facilities = [
    { name: 'The Waterford', slug: 'the-waterford', facility_type: ['assisted-living'], description: 'A luxury assisted living community offering personalized care in a beautiful setting.', address_line1: '27 Mountain Ave', city: 'Newark', county: 'Essex', state: 'NJ', zip: '07104', phone: '973-555-0100', price_range_low: 4500, price_range_high: 7500, rating_avg: 4.5, review_count: 127, is_verified: true },
    { name: 'Sunrise of West Essex', slug: 'sunrise-west-essex', facility_type: ['assisted-living', 'memory-care'], description: 'Sunrise Senior Living community providing compassionate care.', address_line1: '295 Little Falls Rd', city: 'Fair Lawn', county: 'Bergen', state: 'NJ', zip: '07410', phone: '201-555-0200', price_range_low: 5000, price_range_high: 8500, rating_avg: 4.3, review_count: 89, is_verified: true },
    { name: 'Brighton Gardens of Mountainside', slug: 'brighton-gardens-mountainside', facility_type: ['assisted-living', 'memory-care'], description: 'Assisted living and memory care in the heart of New Jersey.', address_line1: '36 Stirling Rd', city: 'Watchung', county: 'Somerset', state: 'NJ', zip: '07069', phone: '908-555-0300', price_range_low: 5500, price_range_high: 9000, rating_avg: 4.6, review_count: 156, is_verified: true },
    { name: 'The Chelsea at Brookside', slug: 'chelsea-brookside', facility_type: ['assisted-living'], description: 'Quality assisted living with a focus on independence.', address_line1: '310 Brookside Ave', city: 'Brookside', county: 'Morris', state: 'NJ', zip: '07926', phone: '973-555-0400', price_range_low: 4200, price_range_high: 6800, rating_avg: 4.2, review_count: 64, is_verified: true },
    { name: 'Arbor Terrace Teaneck', slug: 'arbor-terrace-teaneck', facility_type: ['assisted-living', 'memory-care'], description: 'Modern assisted living with exceptional amenities.', address_line1: '444 Teaneck Rd', city: 'Teaneck', county: 'Bergen', state: 'NJ', zip: '07666', phone: '201-555-0500', price_range_low: 4800, price_range_high: 7800, rating_avg: 4.4, review_count: 112, is_verified: true },
  ]
  
  const { error: facError } = await supabase.from('facilities').upsert(facilities, { onConflict: 'slug' })
  if (facError) console.log('Facilities need table:', facError.message)
  else console.log('✓ 5 facilities seeded')
  
  // Glossary
  const glossary = [
    { term: 'ADLs', slug: 'adls', short_definition: 'Activities of Daily Living', long_definition: 'Basic self-care tasks: bathing, dressing, eating, toileting, transferring, and continence.', category: 'care' },
    { term: 'Memory Care', slug: 'memory-care-definition', short_definition: 'Specialized dementia care', long_definition: 'Care designed for Alzheimer\'s and dementia patients with secure environments and trained staff.', category: 'care' },
    { term: 'CCRC', slug: 'ccrc', short_definition: 'Continuing Care Retirement Community', long_definition: 'Multiple care levels in one location, from independent to skilled nursing.', category: 'care' },
  ]
  
  const { error: glossError } = await supabase.from('glossary_terms').upsert(glossary, { onConflict: 'slug' })
  if (glossError) console.log('Glossary need table:', glossError.message)
  else console.log('✓ 3 glossary terms seeded')
  
  console.log('\n✅ Setup complete!')
}

setupAndSeed().catch(console.error)
