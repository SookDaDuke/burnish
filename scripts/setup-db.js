require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceKey)

async function setupTables() {
  console.log('Setting up database schema...\n')
  
  // Try to check if locations table exists
  const { data, error } = await supabase.from('locations').select('count', { count: 'exact', head: true })
  
  if (error) {
    console.log('Tables do not exist yet.')
    console.log('\nTo set up the database manually:')
    console.log('1. Go to: https://supabase.com/dashboard/project/akftwhwfgjjxcvdlfqfg/sql')
    console.log('2. contents of: sup Copy and run theabase/schema.sql')
    console.log('\n(You only need to do this once)')
    console.log('\nI can continue building the frontend while we set up the DB.')
    return
  }
  
  console.log('Database connected successfully!')
}

setupTables().catch(console.error)
