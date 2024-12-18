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

    // Generate a unique file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${title.replace(/\s+/g, '_')}_${Date.now()}.${fileExt}`;

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('audio')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      throw new Error('Failed to upload file to storage');
    }

    if (!uploadData?.path) {
      throw new Error('No file path returned from upload');
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('audio')
      .getPublicUrl(uploadData.path);

    console.log('File uploaded successfully, getting public URL:', publicUrl);

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
      // If database insert fails, try to delete the uploaded file
      await supabase.storage.from('audio').remove([uploadData.path]);
      throw new Error('Failed to save audio track information');
    }

    console.log('Audio upload successful:', { filePath: publicUrl });
    return { filePath: publicUrl };

  } catch (error) {
    console.error('Audio upload failed:', error);
    return { 
      filePath: '', 
      error: error instanceof Error ? error.message : 'Failed to upload audio file' 
    };
  }
};