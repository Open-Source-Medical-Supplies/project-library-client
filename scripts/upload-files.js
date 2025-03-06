import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import path from 'path';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const jsFiles = fs.readdirSync('dist/assets').filter(file => file.startsWith('index-') && file.endsWith('.js'));
const jsFilePath = jsFiles[0];
const jsFileName = path.basename(jsFilePath);
const jsFileObject = fs.readFileSync(`dist/assets/${jsFilePath}`);
const jsResponse = await supabase
  .storage
  .from('osms')
  .upload(jsFileName, jsFileObject, {
    cacheControl: '3600',
    upsert: false
  })

console.log('File uploaded:');
console.log(`<script src="https://dubgmsmipofgnhmmpfxc.supabase.co/storage/v1/object/public/osms//${jsFileName}"></script>`);

