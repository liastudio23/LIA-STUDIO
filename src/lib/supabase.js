import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://smammokahjqfhiremimw.supabase.co";

const supabaseKey = "sb_publishable_Ci3c_Gz5CFNSi7oaw3wL0Q_ixWEU2O_";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);