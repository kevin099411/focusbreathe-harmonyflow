import { supabase } from "@/integrations/supabase/client";

export interface AudioUploadResponse {
  filePath: string;
  error?: string;
}

export const uploadAudioFile = async (
  file: File,
  title: string
): Promise<AudioUploadResponse> => {
  try {
    console.log('Starting audio upload:', { title, fileName: file.name });

    // Validate file type
    if (!file.type.startsWith('audio/')) {
      throw new Error('Invalid file type. Please upload an audio file.');
    }

    // Generate a unique file path
    const fileExt = file.name.split('.').pop();
    const filePath = `${crypto.randomUUID()}.${fileExt}`;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('audio')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      throw uploadError;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('audio')
      .getPublicUrl(filePath);

    // Insert metadata into the database
    const { error: dbError } = await supabase
      .from('audio_tracks')
      .insert({
        title,
        file_path: publicUrl,
        user_id: (await supabase.auth.getUser()).data.user?.id
      });

    if (dbError) {
      console.error('Error saving to database:', dbError);
      throw dbError;
    }

    console.log('Audio upload successful:', { filePath, publicUrl });
    return { filePath: publicUrl };

  } catch (error) {
    console.error('Audio upload failed:', error);
    return { 
      filePath: '', 
      error: error instanceof Error ? error.message : 'Failed to upload audio file' 
    };
  }
};