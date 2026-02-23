require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function check() {
  const { data: cities } = await supabase.from('locations').select('*')
  const { data: facilities } = await supabase.from('facilities').select('*')
  const { data: categories } = await supabase.from('categories').select('*')
  
  console.log('Cities:', cities?.length || 0)
  console.log('Facilities:', facilities?.length || 0)
  console.log('Categories:', categories?.length || 0)
  
  if (cities?.length) console.log('\nSample cities:', cities.slice(0, 3).map(c => c.name))
  if (facilities?.length) console.log('Sample facilities:', facilities.slice(0, 3).map(f => f.name))
}

check().catch(console.error)
