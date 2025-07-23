import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://akasbhxnztimbzqzwzed.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrYXNiaHhuenRpbWJ6cXp3emVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2Njc4NjgsImV4cCI6MjA2NjI0Mzg2OH0.q-BGZcVum7PxGJlpWcLEcy2eCLJrlNXAtdLhNdj5Rn0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
