import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://hkzrzbwxkcwxkgotsbyr.supabase.co';

const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrenJ6Ynd4a2N3eGtnb3RzYnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NDA1MDQsImV4cCI6MjA1MzIxNjUwNH0.Z5BcNlWwXMGz4HwopqieJQFJ9BLXOlSeF4bnc8fNK18';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
