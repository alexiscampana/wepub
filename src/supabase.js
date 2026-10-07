import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mhxljahdyjgwwbdvtgtq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_f8_n97_73HUdcG1d8Zz0hA_ShKpH5VC";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
