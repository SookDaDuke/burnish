import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    "https://cfgffbqwtrpnhwjsuued.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmZ2ZmYnF3dHJwbmh3anN1dWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MTI4NTksImV4cCI6MjA4NzE4ODg1OX0.OfNTgzQRMwUAa0r0XVD-iRarxMVNKeVEVdrEtkJUlZY",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component — ignore
          }
        },
      },
    }
  )
}
