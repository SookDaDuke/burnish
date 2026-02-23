require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Try with just the anon key (might have write access)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function seed() {
  console.log('Trying with anon key...\n')
  
  // Add a city
  const { data, error } = await supabase.from('locations').insert({
    name: 'Newark',
    county: 'Essex',
    state: 'NJ',
    state_full: 'New Jersey',
    slug: 'newark',
    location_type: 'city',
    population: 291538
  }).select()
  
  console.log('Result:', { data, error })
}

seed().catch(console.error)
