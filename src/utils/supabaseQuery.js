import { createClient } from '@supabase/supabase-js'

const options = {
  db: {
    schema: 'public'
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
}
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, options)

export default supabase
