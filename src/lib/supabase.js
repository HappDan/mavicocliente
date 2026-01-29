import { createClient } from '@supabase/supabase-js'

// Sustituye con tus credenciales de Supabase
const supabaseUrl = 'https://ftprapjwdjoegbevdktc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0cHJhcGp3ZGpvZWdiZXZka3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyMTA3MzksImV4cCI6MjA4NDc4NjczOX0.Z6HfMEnvceVjTU_NYcUihzxUQDTbhp-QlMaAK87l0AE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)