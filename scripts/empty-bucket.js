import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const { data, error } = await supabase
  .storage
  .emptyBucket('osms');

console.log(data, error);