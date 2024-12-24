import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Upload, Loader2 } from 'lucide-react';
import Papa from 'papaparse';

export function CsvUploader() {
  const [uploading, setUploading] = useState(false);

  const processFile = async (file: File) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const products = results.data.map((row: any) => ({
            title: row['Name'] || row['name'] || '',
            description: row['Description'] || row['description'] || '',
            price: parseFloat(row['Regular price'] || row['regular_price'] || '0'),
            sale_price: parseFloat(row['Sale price'] || row['sale_price'] || '0') || null,
            inventory: parseInt(row['Stock'] || row['stock'] || '0'),
            sku: row['SKU'] || row['sku'] || '',
            categories: row['Categories'] || row['categories'] ? 
              (row['Categories'] || row['categories']).split(',').map((cat: string) => cat.trim()) : 
              [],
            image_url: row['Images'] || row['images'] || null,
          }));
          resolve(products);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast({
        title: "錯誤",
        description: "請上傳 CSV 檔案",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      console.log('Processing CSV file...');
      const products: any = await processFile(file);
      console.log('Processed products:', products);

      const { error } = await fetch('/api/process-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/csv',
        },
        body: file,
      });

      if (error) throw error;

      toast({
        title: "成功",
        description: `已成功上傳 ${products.length} 個產品`,
      });
    } catch (error) {
      console.error('Error uploading products:', error);
      toast({
        title: "錯誤",
        description: "上傳產品時發生錯誤",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-[#e89eb8] bg-[#e89eb8]/10' : 'border-gray-300 hover:border-[#e89eb8]'}`}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <div className="flex flex-col items-center space-y-2">
          <Loader2 className="h-8 w-8 animate-spin text-[#e89eb8]" />
          <p>正在上傳...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-2">
          <Upload className="h-8 w-8 text-gray-400" />
          <p>拖放 CSV 檔案至此處，或點擊選擇檔案</p>
          <Button variant="outline" type="button" onClick={(e) => e.stopPropagation()}>
            選擇檔案
          </Button>
        </div>
      )}
    </div>
  );
}