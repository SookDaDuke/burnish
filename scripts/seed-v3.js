require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Use anon key for public tables
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function seed() {
  console.log('Testing with anon key...\n')
  
  // Test with a simple query
  const { data, error } = await supabase.from('categories').select('*')
  console.log('Categories:', { data, error })
}

seed().catch(console.error)
