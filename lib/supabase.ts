import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yainatjyqvlpajemgqvv.supabase.co'
const supabaseAnonKey = 'sb_publishable_YzJaHQOR7WP_K0H-L3efkQ_L_RJcenu'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)