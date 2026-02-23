require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

async function seed() {
  console.log('Seeding database...\n')
  
  // Seed Categories
  const categories = [
    { name: 'Assisted Living', slug: 'assisted-living', description: 'Assisted living facilities provide help with daily activities while maintaining independence.', icon: '🏠', display_order: 1 },
    { name: 'Memory Care', slug: 'memory-care', description: "Specialized care for individuals with Alzheimer's disease and other forms of dementia.", icon: '🧠', display_order: 2 },
    { name: 'Independent Living', slug: 'independent-living', description: 'Senior living communities with minimal assistance, focus on lifestyle and community.', icon: '🌴', display_order: 3 },
    { name: 'Skilled Nursing', slug: 'skilled-nursing', description: '24/7 medical care and rehabilitation services for those with complex health needs.', icon: '🏥', display_order: 4 },
    { name: 'Continuing Care', slug: 'continuing-care', description: 'Multiple levels of care in one community.', icon: '🔄', display_order: 5 },
    { name: 'Respite Care', slug: 'respite-care', description: 'Short-term care providing relief for family caregivers.', icon: '⏰', display_order: 6 },
    { name: 'Adult Day Care', slug: 'adult-day-care', description: 'Daytime care services for seniors who need supervision.', icon: '☀️', display_order: 7 },
  ]
  
  const { error: catError } = await supabase.from('categories').upsert(categories, { onConflict: 'slug' })
  if (catError) console.log('Categories:', catError.message)
  else console.log('✓ Categories seeded')
  
  // Seed NJ Counties
  const counties = [
    { name: 'Atlantic County', county: 'Atlantic', state: 'NJ', state_full: 'New Jersey', slug: 'atlantic-county', location_type: 'county', population: 274534 },
    { name: 'Bergen County', county: 'Bergen', state: 'NJ', state_full: 'New Jersey', slug: 'bergen-county', location_type: 'county', population: 936692 },
    { name: 'Burlington County', county: 'Burlington', state: 'NJ', state_full: 'New Jersey', slug: 'burlington-county', location_type: 'county', population: 464473 },
    { name: 'Camden County', county: 'Camden', state: 'NJ', state_full: 'New Jersey', slug: 'camden-county', location_type: 'county', population: 507078 },
    { name: 'Cape May County', county: 'Cape May', state: 'NJ', state_full: 'New Jersey', slug: 'cape-may-county', location_type: 'county', population: 95263 },
    { name: 'Cumberland County', county: 'Cumberland', state: 'NJ', state_full: 'New Jersey', slug: 'cumberland-county', location_type: 'county', population: 150972 },
    { name: 'Essex County', county: 'Essex', state: 'NJ', state_full: 'New Jersey', slug: 'essex-county', location_type: 'county', population: 799767 },
    { name: 'Gloucester County', county: 'Gloucester', state: 'NJ', state_full: 'New Jersey', slug: 'gloucester-county', location_type: 'county', population: 302294 },
    { name: 'Hudson County', county: 'Hudson', state: 'NJ', state_full: 'New Jersey', slug: 'hudson-county', location_type: 'county', population: 684952 },
    { name: 'Hunterdon County', county: 'Hunterdon', state: 'NJ', state_full: 'New Jersey', slug: 'hunterdon-county', location_type: 'county', population: 125063 },
    { name: 'Mercer County', county: 'Mercer', state: 'NJ', state_full: 'New Jersey', slug: 'mercer-county', location_type: 'county', population: 387340 },
    { name: 'Middlesex County', county: 'Middlesex', state: 'NJ', state_full: 'New Jersey', slug: 'middlesex-county', location_type: 'county', population: 860807 },
    { name: 'Monmouth County', county: 'Monmouth', state: 'NJ', state_full: 'New Jersey', slug: 'monmouth-county', location_type: 'county', population: 630201 },
    { name: 'Morris County', county: 'Morris', state: 'NJ', state_full: 'New Jersey', slug: 'morris-county', location_type: 'county', population: 509587 },
    { name: 'Ocean County', county: 'Ocean', state: 'NJ', state_full: 'New Jersey', slug: 'ocean-county', location_type: 'county', population: 637229 },
    { name: 'Passaic County', county: 'Passaic', state: 'NJ', state_full: 'New Jersey', slug: 'passaic-county', location_type: 'county', population: 503310 },
    { name: 'Salem County', county: 'Salem', state: 'NJ', state_full: 'New Jersey', slug: 'salem-county', location_type: 'county', population: 65049 },
    { name: 'Somerset County', county: 'Somerset', state: 'NJ', state_full: 'New Jersey', slug: 'somerset-county', location_type: 'county', population: 335432 },
    { name: 'Sussex County', county: 'Sussex', state: 'NJ', state_full: 'New Jersey', slug: 'sussex-county', location_type: 'county', population: 140488 },
    { name: 'Union County', county: 'Union', state: 'NJ', state_full: 'New Jersey', slug: 'union-county', location_type: 'county', population: 575345 },
    { name: 'Warren County', county: 'Warren', state: 'NJ', state_full: 'New Jersey', slug: 'warren-county', location_type: 'county', population: 106798 },
  ]
  
  const { error: countyError } = await supabase.from('locations').upsert(counties, { onConflict: 'slug' })
  if (countyError) console.log('Counties:', countyError.message)
  else console.log('✓ 21 NJ Counties seeded')
  
  // Seed NJ Cities
  const cities = [
    { name: 'Newark', county: 'Essex', state: 'NJ', state_full: 'New Jersey', slug: 'newark', location_type: 'city', population: 291538 },
    { name: 'Jersey City', county: 'Hudson', state: 'NJ', state_full: 'New Jersey', slug: 'jersey-city', location_type: 'city', population: 253647 },
    { name: 'Elizabeth', county: 'Union', state: 'NJ', state_full: 'New Jersey', slug: 'elizabeth', location_type: 'city', population: 128884 },
    { name: 'Trenton', county: 'Mercer', state: 'NJ', state_full: 'New Jersey', slug: 'trenton', location_type: 'city', population: 90238 },
    { name: 'Edison', county: 'Middlesex', state: 'NJ', state_full: 'New Jersey', slug: 'edison', location_type: 'city', population: 106586 },
    { name: 'Toms River', county: 'Ocean', state: 'NJ', state_full: 'New Jersey', slug: 'toms-river', location_type: 'city', population: 95138 },
    { name: 'Hamilton', county: 'Mercer', state: 'NJ', state_full: 'New Jersey', slug: 'hamilton-nj', location_type: 'city', population: 87399 },
    { name: 'Woodbridge', county: 'Middlesex', state: 'NJ', state_full: 'New Jersey', slug: 'woodbridge', location_type: 'city', population: 103639 },
    { name: 'Lakewood', county: 'Ocean', state: 'NJ', state_full: 'New Jersey', slug: 'lakewood-nj', location_type: 'city', population: 135158 },
    { name: 'Vineland', county: 'Cumberland', state: 'NJ', state_full: 'New Jersey', slug: 'vineland', location_type: 'city', population: 58887 },
    { name: 'North Brunswick', county: 'Middlesex', state: 'NJ', state_full: 'New Jersey', slug: 'north-brunswick', location_type: 'city', population: 41574 },
    { name: 'Berkeley', county: 'Ocean', state: 'NJ', state_full: 'New Jersey', slug: 'berkeley-nj', location_type: 'city', population: 42024 },
    { name: 'Mount Laurel', county: 'Burlington', state: 'NJ', state_full: 'New Jersey', slug: 'mount-lauderdale', location_type: 'city', population: 41451 },
    { name: 'Manchester', county: 'Ocean', state: 'NJ', state_full: 'New Jersey', slug: 'manchester-nj', location_type: 'city', population: 44351 },
    { name: 'Jackson', county: 'Ocean', state: 'NJ', state_full: 'New Jersey', slug: 'jackson-nj', location_type: 'city', population: 59215 },
    { name: 'Wayne', county: 'Passaic', state: 'NJ', state_full: 'New Jersey', slug: 'wayne-nj', location_type: 'city', population: 54586 },
    { name: 'Union City', county: 'Hudson', state: 'NJ', state_full: 'New Jersey', slug: 'union-city', location_type: 'city', population: 68592 },
    { name: 'New Brunswick', county: 'Middlesex', state: 'NJ', state_full: 'New Jersey', slug: 'new-brunswick', location_type: 'city', population: 55470 },
    { name: 'Bloomfield', county: 'Essex', state: 'NJ', state_full: 'New Jersey', slug: 'bloomfield-nj', location_type: 'city', population: 49708 },
    { name: 'West New York', county: 'Hudson', state: 'NJ', state_full: 'New Jersey', slug: 'west-new-york', location_type: 'city', population: 52077 },
    { name: 'Cherry Hill', county: 'Camden', state: 'NJ', state_full: 'New Jersey', slug: 'cherry-hill', location_type: 'city', population: 74104 },
    { name: 'Passaic', county: 'Passaic', state: 'NJ', state_full: 'New Jersey', slug: 'passaic-nj', location_type: 'city', population: 69271 },
    { name: 'Clifton', county: 'Passaic', state: 'NJ', state_full: 'New Jersey', slug: 'clifton-nj', location_type: 'city', population: 85390 },
    { name: 'Camden', county: 'Camden', state: 'NJ', state_full: 'New Jersey', slug: 'camden-nj', location_type: 'city', population: 74878 },
    { name: 'Hoboken', county: 'Hudson', state: 'NJ', state_full: 'New Jersey', slug: 'hoboken', location_type: 'city', population: 53484 },
    { name: 'Middletown', county: 'Monmouth', state: 'NJ', state_full: 'New Jersey', slug: 'middletown-nj', location_type: 'city', population: 65380 },
    { name: 'Sayreville', county: 'Middlesex', state: 'NJ', state_full: 'New Jersey', slug: 'sayreville', location_type: 'city', population: 45076 },
    { name: 'Kearny', county: 'Hudson', state: 'NJ', state_full: 'New Jersey', slug: 'kearny', location_type: 'city', population: 41917 },
    { name: 'Fort Lee', county: 'Bergen', state: 'NJ', state_full: 'New Jersey', slug: 'fort-lee', location_type: 'city', population: 40013 },
    { name: 'Fair Lawn', county: 'Bergen', state: 'NJ', state_full: 'New Jersey', slug: 'fair-lawn', location_type: 'city', population: 32087 },
  ]
  
  const { error: cityError } = await supabase.from('locations').upsert(cities, { onConflict: 'slug' })
  if (cityError) console.log('Cities:', cityError.message)
  else console.log('✓ 30 NJ Cities seeded')
  
  // Seed sample facilities
  const facilities = [
    { name: 'The Waterford', slug: 'the-waterford', facility_type: ['assisted-living', 'memory-care'], description: 'A luxury assisted living community offering personalized care in a beautiful setting.', address_line1: '27 Mountain Avenue', city: 'Newark', county: 'Essex', state: 'NJ', zip: '07104', phone: '973-555-0100', price_range_low: 4500, price_range_high: 7500, rating_avg: 4.5, review_count: 127, is_verified: true },
    { name: 'Sunrise of West Essex', slug: 'sunrise-west-essex', facility_type: ['assisted-living', 'memory-care'], description: 'Sunrise Senior Living community providing compassionate care.', address_line1: '295 Little Falls Road', city: 'Fair Lawn', county: 'Bergen', state: 'NJ', zip: '07410', phone: '201-555-0200', price_range_low: 5000, price_range_high: 8500, rating_avg: 4.3, review_count: 89, is_verified: true },
    { name: 'Brighton Gardens of Mountainside', slug: 'brighton-gardens-mountainside', facility_type: ['assisted-living', 'memory-care'], description: 'Assisted living and memory care in the heart of New Jersey.', address_line1: '36 Stirling Road', city: 'Watchung', county: 'Somerset', state: 'NJ', zip: '07069', phone: '908-555-0300', price_range_low: 5500, price_range_high: 9000, rating_avg: 4.6, review_count: 156, is_verified: true },
    { name: 'The Chelsea at Brookside', slug: 'chelsea-brookside', facility_type: ['assisted-living'], description: 'Quality assisted living with a focus on independence.', address_line1: '310 Brookside Avenue', city: 'Brookside', county: 'Morris', state: 'NJ', zip: '07926', phone: '973-555-0400', price_range_low: 4200, price_range_high: 6800, rating_avg: 4.2, review_count: 64, is_verified: true },
    { name: 'Arbor Terrace Teaneck', slug: 'arbor-terrace-teaneck', facility_type: ['assisted-living', 'memory-care', 'adult-day-care'], description: 'Modern assisted living with exceptional amenities.', address_line1: '444 Teaneck Road', city: 'Teaneck', county: 'Bergen', state: 'NJ', zip: '07666', phone: '201-555-0500', price_range_low: 4800, price_range_high: 7800, rating_avg: 4.4, review_count: 112, is_verified: true },
    { name: 'CareOne at Hanover Township', slug: 'careone-hanover', facility_type: ['assisted-living', 'memory-care', 'skilled-nursing'], description: 'Comprehensive care with rehabilitation services.', address_line1: '164 Mount Airy Road', city: 'Basking Ridge', county: 'Somerset', state: 'NJ', zip: '07920', phone: '908-555-0600', price_range_low: 6000, price_range_high: 12000, rating_avg: 4.7, review_count: 203, is_verified: true },
    { name: 'Laurel Circle', slug: 'laurel-circle', facility_type: ['independent-living', 'assisted-living'], description: 'Continuing care community with independent living options.', address_line1: '100 Monroe Street', city: 'New Brunswick', county: 'Middlesex', state: 'NJ', zip: '08901', phone: '732-555-0700', price_range_low: 3500, price_range_high: 6500, rating_avg: 4.8, review_count: 178, is_verified: true },
    { name: 'Brandywine Living at Reflections', slug: 'brandywine-reflections', facility_type: ['memory-care'], description: 'Dedicated memory care with specialized programs.', address_line1: '39 Stacey Street', city: 'Cinnaminson', county: 'Burlington', state: 'NJ', zip: '08077', phone: '856-555-0800', price_range_low: 7000, price_range_high: 11000, rating_avg: 4.1, review_count: 45, is_verified: true },
    { name: 'Summit Care', slug: 'summit-care', facility_type: ['assisted-living', 'skilled-nursing'], description: 'Skilled nursing and assisted living with medical focus.', address_line1: '733 Main Street', city: 'Summit', county: 'Union', state: 'NJ', zip: '07901', phone: '908-555-0900', price_range_low: 5500, price_range_high: 9500, rating_avg: 4.0, review_count: 92, is_verified: true },
    { name: 'The Regency at Woodland Park', slug: 'regency-woodland-park', facility_type: ['assisted-living', 'memory-care'], description: 'Elegant assisted living with personalized care plans.', address_line1: '430 Mcrobbins Avenue', city: 'Woodland Park', county: 'Passaic', state: 'NJ', zip: '07424', phone: '973-555-1000', price_range_low: 5200, price_range_high: 8200, rating_avg: 4.5, review_count: 138, is_verified: true },
  ]
  
  const { error: facError } = await supabase.from('facilities').upsert(facilities, { onConflict: 'slug' })
  if (facError) console.log('Facilities:', facError.message)
  else console.log('✓ 10 Sample facilities seeded')
  
  // Seed glossary terms
  const glossaryTerms = [
    { term: 'ADLs', slug: 'adls', short_definition: 'Activities of Daily Living - basic self-care tasks', long_definition: 'ADLs stand for Activities of Daily Living, which are fundamental self-care tasks. These include bathing, dressing, toileting, transferring, continence control, and eating.', category: 'care' },
    { term: 'IADLs', slug: 'iadls', short_definition: 'Instrumental Activities of Daily Living - complex daily tasks', long_definition: 'IADLs are complex tasks including managing finances, transportation, shopping, preparing meals, using technology, housework, and taking medications.', category: 'care' },
    { term: 'Assisted Living', slug: 'assisted-living-definition', short_definition: 'Housing with personal care support', long_definition: 'Assisted living is housing designed for individuals who need help with daily activities but want independence.', category: 'care' },
    { term: 'Memory Care', slug: 'memory-care-definition', short_definition: 'Specialized care for dementia and Alzheimer\'s', long_definition: 'Memory care is specialized assisted living for individuals with Alzheimer\'s or dementia, with secure environments and trained staff.', category: 'care' },
    { term: 'CCRC', slug: 'ccrc', short_definition: 'Continuing Care Retirement Community', long_definition: 'A CCRC offers multiple care levels in one location, from independent living to skilled nursing.', category: 'care' },
    { term: 'SNF', slug: 'snf', short_definition: 'Skilled Nursing Facility', long_definition: 'A SNF provides 24-hour medical care from licensed nurses and therapists.', category: 'care' },
    { term: 'Medicaid Waiver', slug: 'medicaid-waiver', short_definition: 'Program to pay for home/community care', long_definition: 'A Medicaid waiver allows states to use Medicaid funds for community-based care like assisted living.', category: 'financial' },
    { term: 'Level of Care Assessment', slug: 'level-of-care-assessment', short_definition: 'Evaluation to determine care needs', long_definition: 'An assessment to determine what type of care an individual needs based on ADLs, cognitive function, and medical needs.', category: 'care' },
    { term: 'Respite Care', slug: 'respite-care-definition', short_definition: 'Short-term relief for caregivers', long_definition: 'Respite care provides temporary relief for family caregivers, for hours, days, or weeks.', category: 'care' },
    { term: 'Personal Care', slug: 'personal-care', short_definition: 'Help with daily activities', long_definition: 'Personal care refers to assistance with ADLs such as bathing, dressing, grooming, and mobility.', category: 'care' },
  ]
  
  const { error: glossError } = await supabase.from('glossary_terms').upsert(glossaryTerms, { onConflict: 'slug' })
  if (glossError) console.log('Glossary:', glossError.message)
  else console.log('✓ 10 Glossary terms seeded')
  
  console.log('\n✅ Database seeded successfully!')
}

seed().catch(console.error)
