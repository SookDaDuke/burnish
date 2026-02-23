require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('Anon key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 30) + '...')
console.log('Service key:', process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 30) + '...')

// Try with anon key first
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Try a simple query
const { data, error } = await supabase.from('locations').select('count')
console.log('\nTest query result:', { data, error })
