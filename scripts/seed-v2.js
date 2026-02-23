require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function seed() {
  console.log('Trying direct insert...\n')
  
  // Try inserting with schema prefix
  const { data, error } = await supabase.schema?.public?.insert into categories
  
  // Check what tables are available
  const { data: tables } = await supabase.rpc('get_table_names')
  console.log('Tables:', tables)
}

seed().catch(console.error)
