require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkDatabase() {
  console.log('Checking existing database tables...\n')
  
  const tables = ['locations', 'facilities', 'categories', 'glossary_terms', 'reviews', 'violations', 'facility_locations']
  
  for (const table of tables) {
    const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true })
    if (error) {
      console.log(`❌ ${table}: ${error.message}`)
    } else {
      console.log(`✓ ${table}: ${count || 0} rows`)
    }
  }
}

checkDatabase().catch(console.error)
