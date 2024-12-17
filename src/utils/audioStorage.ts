import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export const uploadAudio = async (file: File) => {
  try {
    console.log('Uploading audio file:', file.name);
    
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('meditations')
      .upload(fileName, file);

    if (error) {
      console.error('Error uploading file:', error);
      throw error;
    }

    console.log('Upload successful:', data);
    
    const { data: { publicUrl } } = supabase.storage
      .from('meditations')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};