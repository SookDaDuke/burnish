require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('Anon key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 30) + '...')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function test() {
  const { data, error } = await supabase.from('locations').select('count')
  console.log('\nResult:', { data, error })
}
test()
