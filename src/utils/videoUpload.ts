import { supabase } from "@/integrations/supabase/client";

export interface VideoUploadResponse {
  filePath: string;
  error?: string;
}

export const uploadVideoFile = async (
  file: File,
  title: string
): Promise<VideoUploadResponse> => {
  try {
    console.log('Starting video upload:', { title, fileName: file.name });

    // Generate a unique file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${title.replace(/\s+/g, '_')}_${Date.now()}.${fileExt}`;

    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('videos')
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
      .from('videos')
      .getPublicUrl(uploadData.path);

    console.log('File uploaded successfully, getting public URL:', publicUrl);

    // Insert metadata into the database
    const { error: dbError } = await supabase
      .from('video_tracks')
      .insert({
        title,
        file_path: publicUrl,
        user_id: (await supabase.auth.getUser()).data.user?.id
      });

    if (dbError) {
      console.error('Error saving to database:', dbError);
      // If database insert fails, try to delete the uploaded file
      await supabase.storage.from('videos').remove([uploadData.path]);
      throw new Error('Failed to save video track information');
    }

    console.log('Video upload successful:', { filePath: publicUrl });
    return { filePath: publicUrl };

  } catch (error) {
    console.error('Video upload failed:', error);
    return { 
      filePath: '', 
      error: error instanceof Error ? error.message : 'Failed to upload video file' 
    };
  }
};