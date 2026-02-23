require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function addCounties() {
  const counties = [
    { name: 'Bergen County', county: 'Bergen', state: 'NJ', state_full: 'New Jersey', slug: 'bergen-county', location_type: 'county', population: 936692 },
    { name: 'Middlesex County', county: 'Middlesex', state: 'NJ', state_full: 'New Jersey', slug: 'middlesex-county', location_type: 'county', population: 860807 },
    { name: 'Essex County', county: 'Essex', state: 'NJ', state_full: 'New Jersey', slug: 'essex-county', location_type: 'county', population: 799767 },
    { name: 'Hudson County', county: 'Hudson', state: 'NJ', state_full: 'New Jersey', slug: 'hudson-county', location_type: 'county', population: 684952 },
    { name: 'Monmouth County', county: 'Monmouth', state: 'NJ', state_full: 'New Jersey', slug: 'monmouth-county', location_type: 'county', population: 630201 },
    { name: 'Ocean County', county: 'Ocean', state: 'NJ', state_full: 'New Jersey', slug: 'ocean-county', location_type: 'county', population: 637229 },
    { name: 'Union County', county: 'Union', state: 'NJ', state_full: 'New Jersey', slug: 'union-county', location_type: 'county', population: 575345 },
    { name: 'Mercer County', county: 'Mercer', state: 'NJ', state_full: 'New Jersey', slug: 'mercer-county', location_type: 'county', population: 387340 },
    { name: 'Camden County', county: 'Camden', state: 'NJ', state_full: 'New Jersey', slug: 'camden-county', location_type: 'county', population: 507078 },
    { name: 'Passaic County', county: 'Passaic', state: 'NJ', state_full: 'New Jersey', slug: 'passaic-county', location_type: 'county', population: 503310 },
    { name: 'Morris County', county: 'Morris', state: 'NJ', state_full: 'New Jersey', slug: 'morris-county', location_type: 'county', population: 509587 },
  ]

  const { error } = await supabase.from('locations').upsert(counties, { onConflict: 'slug' })
  if (error) console.log('Error:', error.message)
  else console.log('✓ Added 11 counties')
  
  const { data } = await supabase.from('locations').select('*')
  console.log('Total locations:', data?.length)
}

addCounties().catch(console.error)
