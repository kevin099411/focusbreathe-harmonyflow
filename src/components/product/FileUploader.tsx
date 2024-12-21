import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface FileUploaderProps {
  accept?: string;
  multiple?: boolean;
  onFileSelect: (files: FileList) => void;
}

export function FileUploader({ accept, multiple, onFileSelect }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const dataTransfer = new DataTransfer();
    acceptedFiles.forEach(file => dataTransfer.items.add(file));
    onFileSelect(dataTransfer.files);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { [accept]: [] } : undefined,
    multiple
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8
        ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'}
        hover:border-primary hover:bg-primary/5
        transition-colors cursor-pointer
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-4">
        <Upload className="h-12 w-12 text-gray-400" />
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isDragActive
              ? '放開以上傳文件'
              : '拖放文件到此處，或點擊上傳'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            支持的格式：JPG, PNG, GIF (最大 5MB)
          </p>
        </div>
        <Button type="button" variant="outline">
          選擇文件
        </Button>
      </div>
    </div>
  );
}