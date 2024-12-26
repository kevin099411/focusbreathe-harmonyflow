import { useCallback, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { FileDropzone } from './FileDropzone';
import { ProcessingIndicator } from './ProcessingIndicator';
import { processCSVFile } from '@/utils/csvProcessor';
import { convertWordPressXMLToCSV } from '@/utils/wordpressImporter';
import { supabase } from '@/integrations/supabase/client';
import { DownloadTemplate } from './DownloadTemplate';

export function CsvUploader() {
  const [uploading, setUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setUploading(true);

    try {
      if (file.name.endsWith('.xml')) {
        console.log('Converting WordPress XML file...');
        await convertWordPressXMLToCSV(file);
        toast({
          title: "成功",
          description: "WordPress XML 已轉換為 CSV 檔案，請重新上傳轉換後的 CSV 檔案",
        });
        return;
      }

      if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
        toast({
          title: "錯誤",
          description: "請上傳 CSV 或 WordPress XML 檔案",
          variant: "destructive",
        });
        return;
      }

      console.log('Processing CSV file...');
      const products = await processCSVFile(file);
      console.log('Processed products:', products);

      // Insert products in batches to handle large files
      const batchSize = 100;
      for (let i = 0; i < products.length; i += batchSize) {
        const batch = products.slice(i, i + batchSize);
        const { error } = await supabase
          .from('products')
          .insert(batch);

        if (error) throw error;
      }

      toast({
        title: "成功",
        description: `已成功上傳 ${products.length} 個產品`,
      });
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "錯誤",
        description: "處理檔案時發生錯誤",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">上傳產品</h2>
        <DownloadTemplate />
      </div>
      {uploading ? (
        <ProcessingIndicator />
      ) : (
        <FileDropzone
          onDrop={onDrop}
          accept={{ 
            'text/csv': ['.csv'],
            'text/xml': ['.xml'],
            'application/xml': ['.xml']
          }}
          isDragActive={isDragActive}
          setIsDragActive={setIsDragActive}
        />
      )}
    </div>
  );
}