import { createClient } from '@/lib/supabase/server'

// Create server client for Next.js App Router
export async function createSupabaseClient() {
  return createClient()
}

// Helper to get data with error handling
export async function getLocations(state = 'NJ', locationType = 'city') {
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('state', state)
    .eq('location_type', locationType)
    .order('population', { ascending: false })
  
  if (error) {
    console.error('Error fetching locations:', error)
    return []
  }
  return data || []
}

export async function getLocationBySlug(slug: string) {
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching location:', error)
    return null
  }
  return data
}

export async function getFacilitiesByLocation(locationName: string, state = 'NJ') {
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('facilities')
    .select('*')
    .eq('city', locationName)
    .eq('state', state)
    .order('rating_avg', { ascending: false })
  
  if (error) {
    console.error('Error fetching facilities:', error)
    return []
  }
  return data || []
}

export async function getFacilityBySlug(slug: string) {
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('facilities')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching facility:', error)
    return null
  }
  return data
}

export async function getAllFacilities(limit = 100) {
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('facilities')
    .select('*')
    .order('rating_avg', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching facilities:', error)
    return []
  }
  return data || []
}

export async function getCategories() {
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order')
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  return data || []
}

export async function getGlossaryTerms() {
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('glossary_terms')
    .select('*')
    .order('term')
  
  if (error) {
    console.error('Error fetching glossary:', error)
    return []
  }
  return data || []
}

export async function getGlossaryTermBySlug(slug: string) {
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('glossary_terms')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) {
    console.error('Error fetching term:', error)
    return null
  }
  return data
}

export async function searchFacilities(query: string) {
  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from('facilities')
    .select('*')
    .ilike('name', `%${query}%`)
    .limit(20)
  
  if (error) {
    console.error('Error searching facilities:', error)
    return []
  }
  return data || []
}
