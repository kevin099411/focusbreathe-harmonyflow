import { useState } from 'react';
import { FileUploader } from './FileUploader';
import { ImagePreview } from './ImagePreview';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProductImageUploaderProps {
  onImagesUploaded: (urls: string[]) => void;
}

export function ProductImageUploader({ onImagesUploaded }: ProductImageUploaderProps) {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleUpload = async (files: FileList) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast({
        title: '無效的文件類型',
        description: '請上傳圖片文件',
        variant: 'destructive',
      });
      return;
    }

    try {
      const uploadPromises = imageFiles.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        console.log('Uploading file:', fileName);

        const { data, error } = await supabase.storage
          .from('products')
          .upload(fileName, file);

        if (error) {
          console.error('Upload error:', error);
          throw error;
        }

        console.log('Upload successful:', data);

        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(fileName);

        console.log('Public URL:', publicUrl);
        return publicUrl;
      });

      const urls = await Promise.all(uploadPromises);
      setUploadedImages(prev => [...prev, ...urls]);
      onImagesUploaded(urls);

      toast({
        title: '上傳成功',
        description: `成功上傳 ${urls.length} 張圖片`,
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: '上傳失敗',
        description: '圖片上傳失敗，請重試',
        variant: 'destructive',
      });
    }
  };

  const removeImage = (indexToRemove: number) => {
    setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-4">
      <FileUploader
        accept="image/*"
        multiple
        onFileSelect={handleUpload}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {uploadedImages.map((url, index) => (
          <ImagePreview 
            key={url} 
            url={url} 
            onRemove={() => removeImage(index)}
          />
        ))}
      </div>
    </div>
  );
}