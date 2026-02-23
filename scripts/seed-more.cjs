require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function seed() {
  console.log('Seeding more data...\n')
  
  // Check existing data
  const { data: existingCities } = await supabase.from('locations').select('*')
  console.log('Existing cities:', existingCities?.length || 0)
  
  const { data: existingFacilities } = await supabase.from('facilities').select('*')
  console.log('Existing facilities:', existingFacilities?.length || 0)
  
  // Add more NJ cities if needed
  if (!existingCities || existingCities.length < 20) {
    const moreCities = [
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
    ]
    
    const { error } = await supabase.from('locations').upsert(moreCities, { onConflict: 'slug' })
    if (error) console.log('Error seeding cities:', error.message)
    else console.log('✓ Added more cities')
  }
  
  // Add more facilities if needed
  if (!existingFacilities || existingFacilities.length < 20) {
    const moreFacilities = [
      { name: 'CareOne at Hanover Township', slug: 'careone-hanover', facility_type: ['assisted-living', 'memory-care', 'skilled-nursing'], description: 'Comprehensive care with rehabilitation services.', address_line1: '164 Mount Airy Rd', city: 'Basking Ridge', county: 'Somerset', state: 'NJ', zip: '07920', phone: '908-555-0600', price_range_low: 6000, price_range_high: 12000, rating_avg: 4.7, review_count: 203, is_verified: true },
      { name: 'Laurel Circle', slug: 'laurel-circle', facility_type: ['independent-living', 'assisted-living'], description: 'Continuing care community with independent living options.', address_line1: '100 Monroe St', city: 'New Brunswick', county: 'Middlesex', state: 'NJ', zip: '08901', phone: '732-555-0700', price_range_low: 3500, price_range_high: 6500, rating_avg: 4.8, review_count: 178, is_verified: true },
      { name: 'Brandywine Living at Reflections', slug: 'brandywine-reflections', facility_type: ['memory-care'], description: 'Dedicated memory care with specialized programs.', address_line1: '39 Stacey St', city: 'Cinnaminson', county: 'Burlington', state: 'NJ', zip: '08077', phone: '856-555-0800', price_range_low: 7000, price_range_high: 11000, rating_avg: 4.1, review_count: 45, is_verified: true },
      { name: 'Summit Care', slug: 'summit-care', facility_type: ['assisted-living', 'skilled-nursing'], description: 'Skilled nursing and assisted living with medical focus.', address_line1: '733 Main St', city: 'Summit', county: 'Union', state: 'NJ', zip: '07901', phone: '908-555-0900', price_range_low: 5500, price_range_high: 9500, rating_avg: 4.0, review_count: 92, is_verified: true },
      { name: 'The Regency at Woodland Park', slug: 'regency-woodland-park', facility_type: ['assisted-living', 'memory-care'], description: 'Elegant assisted living with personalized care plans.', address_line1: '430 Mcrobbins Ave', city: 'Woodland Park', county: 'Passaic', state: 'NJ', zip: '07424', phone: '973-555-1000', price_range_low: 5200, price_range_high: 8200, rating_avg: 4.5, review_count: 138, is_verified: true },
      { name: 'The Villa at Florham Park', slug: 'villa-florham-park', facility_type: ['assisted-living', 'memory-care'], description: 'Luxury assisted living in a park-like setting.', address_line1: '215 Brooklake Rd', city: 'Florham Park', county: 'Morris', state: 'NJ', zip: '07932', phone: '973-555-1100', price_range_low: 5800, price_range_high: 9500, rating_avg: 4.6, review_count: 124, is_verified: true },
      { name: 'Horizon Care at Fairview', slug: 'horizon-care-fairview', facility_type: ['assisted-living', 'memory-care'], description: 'Compassionate care with beautiful views.', address_line1: '286 N Dean St', city: 'Englewood', county: 'Bergen', state: 'NJ', zip: '07631', phone: '201-555-1200', price_range_low: 4900, price_range_high: 8200, rating_avg: 4.3, review_count: 87, is_verified: true },
      { name: 'Sunrise of Edison', slug: 'sunrise-edison', facility_type: ['assisted-living', 'memory-care'], description: 'Sunrise community serving the Edison area.', address_line1: '1801 Oak Tree Rd', city: 'Edison', county: 'Middlesex', state: 'NJ', zip: '08820', phone: '732-555-1300', price_range_low: 5200, price_range_high: 8800, rating_avg: 4.4, review_count: 102, is_verified: true },
      { name: 'Atrium Senior Living of Matawan', slug: 'atrium-matawan', facility_type: ['assisted-living'], description: 'Warm and welcoming senior living community.', address_line1: '40 Main St', city: 'Matawan', county: 'Monmouth', state: 'NJ', zip: '07747', phone: '732-555-1400', price_range_low: 4200, price_range_high: 7000, rating_avg: 4.2, review_count: 56, is_verified: true },
      { name: 'Meridian Senior Living at Shrewsbury', slug: 'meridian-shrewsbury', facility_type: ['assisted-living', 'memory-care'], description: 'Quality care on the Jersey Shore.', address_line1: '400 Rte 35', city: 'Shrewsbury', county: 'Monmouth', state: 'NJ', zip: '07702', phone: '732-555-1500', price_range_low: 5500, price_range_high: 9000, rating_avg: 4.5, review_count: 95, is_verified: true },
    ]
    
    const { error } = await supabase.from('facilities').upsert(moreFacilities, { onConflict: 'slug' })
    if (error) console.log('Error seeding facilities:', error.message)
    else console.log('✓ Added more facilities')
  }
  
  // Verify counts
  const { data: cities } = await supabase.from('locations').select('*')
  const { data: facilities } = await supabase.from('facilities').select('*')
  
  console.log('\n✅ Database ready:')
  console.log('  - Cities:', cities?.length || 0)
  console.log('  - Facilities:', facilities?.length || 0)
}

seed().catch(console.error)
