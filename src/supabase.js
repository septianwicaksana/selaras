import { createClient } from '@supabase/supabase-js'

const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndncWp3aXpwbnBkZmhrY3ljdHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk1OTk1MjQsImV4cCI6MTk2NTE3NTUyNH0.1Z0nU-HFeVUsBUO_adsa-yH1zKqOKUKb0q3kY5eWqag'

const SUPABASE_URL = 'https://wgqjwizpnpdfhkcyctqa.supabase.co'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export { supabase }
