import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://lgmlkbrwgbzvfugwchsn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnbWxrYnJ3Z2J6dmZ1Z3djaHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5Mzc0MzEsImV4cCI6MjA3MTUxMzQzMX0.A1oIPUK9Sz0ua4NeuJ-uRbv4BYxzsak6F9wjkpHmqlQ";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
