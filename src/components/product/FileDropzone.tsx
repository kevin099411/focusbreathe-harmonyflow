import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface FileDropzoneProps {
  onDrop: (files: File[]) => void;
  accept: Record<string, string[]>;
  isDragActive: boolean;
  setIsDragActive: (active: boolean) => void;
}

export function FileDropzone({ onDrop, accept, isDragActive, setIsDragActive }: FileDropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false)
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-[#e89eb8] bg-[#e89eb8]/10' : 'border-gray-300 hover:border-[#e89eb8]'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-4">
        <Upload className="h-12 w-12 text-gray-400" />
        <div>
          <p className="text-sm text-gray-600">
            {isDragActive ? '放開以上傳檔案' : '拖放 CSV 檔案至此處，或點擊選擇檔案'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            支援的格式：CSV
          </p>
        </div>
        <Button variant="outline" type="button" onClick={(e) => e.stopPropagation()}>
          選擇檔案
        </Button>
      </div>
    </div>
  );
}