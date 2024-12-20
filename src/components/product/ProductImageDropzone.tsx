import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductImageDropzoneProps {
  onImagesChange: (files: File[]) => void;
  previewUrls: string[];
  onRemoveImage: (index: number) => void;
}

export function ProductImageDropzone({ onImagesChange, previewUrls, onRemoveImage }: ProductImageDropzoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onImagesChange(acceptedFiles);
  }, [onImagesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"
        )}
      >
        <input {...getInputProps()} />
        <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">拖放圖片或點擊上傳</p>
        <p className="text-xs text-gray-500">支持 JPG, PNG, WebP</p>
      </div>

      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previewUrls.map((url, index) => (
            <div key={url} className="relative group">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => onRemoveImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}