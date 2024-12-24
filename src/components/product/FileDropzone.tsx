import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface FileDropzoneProps {
  onDrop: (files: File[]) => void;
  accept: Record<string, string[]>;
  isDragActive: boolean;
}

export function FileDropzone({ onDrop, accept, isDragActive }: FileDropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-[#e89eb8] bg-[#e89eb8]/10' : 'border-gray-300 hover:border-[#e89eb8]'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-2">
        <Upload className="h-8 w-8 text-gray-400" />
        <p>拖放 CSV 檔案至此處，或點擊選擇檔案</p>
        <Button variant="outline" type="button" onClick={(e) => e.stopPropagation()}>
          選擇檔案
        </Button>
      </div>
    </div>
  );
}