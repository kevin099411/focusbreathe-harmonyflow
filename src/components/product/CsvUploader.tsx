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
            title: row['Name'] || '',
            description: row['Description'] || '',
            price: parseFloat(row['Price'] || row['price'] || '0'),
            sale_price: parseFloat(row['Sale price'] || '0') || null,
            inventory: parseInt(row['Inventory'] || '0'),
            sku: row['SKU'] || '',
            featured: row['Is Featured Product?']?.toLowerCase() === 'yes',
            visibility: row['Catalog Visibility'] || 'visible',
            external_url: row['Outer Link'] || null,
            button_text: row['Button'] || null,
            order_index: parseInt(row['Position'] || '0'),
            attribute_1_name: row['Attribute 1 Name'] || null,
            attribute_1_value: row['Attribute 1 Value'] || null,
            attribute_1_visible: row['Attribute 1 Visible']?.toLowerCase() === 'yes',
            attribute_1_global: row['Attribute 1 Global']?.toLowerCase() === 'yes',
            attribute_2_name: row['Attribute 2 Name'] || null,
            attribute_2_value: row['Attribute 2 Value'] || null,
            attribute_2_visible: row['Attribute 2 Visible']?.toLowerCase() === 'yes',
            attribute_2_global: row['Attribute 2 Global']?.toLowerCase() === 'yes',
            image_url: row['Picture'] || null,
            categories: row['Tag'] ? row['Tag'].split(',').map((cat: string) => cat.trim()) : [],
          }));
          
          console.log('Processed products:', products);
          resolve(products);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
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

      const response = await fetch('/api/process-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/csv',
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

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