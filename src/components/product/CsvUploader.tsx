import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { useSession } from '@supabase/auth-helpers-react';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const CsvUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const session = useSession();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== 'text/csv') {
      toast({
        title: "無效的文件類型",
        description: "請上傳CSV文件。",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast({
        title: "文件太大",
        description: "請上傳小於5MB的文件。",
        variant: "destructive",
      });
      return;
    }

    if (!session) {
      toast({
        title: "請先登入",
        description: "您需要登入才能上傳CSV。",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      console.log('Starting CSV upload:', file.name);

      // Read the CSV file
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result;
        if (typeof text !== 'string') return;

        const rows = text.split('\n').map(row => row.split(','));
        const headers = rows[0];
        const products = rows.slice(1).map(row => {
          const product: Record<string, any> = {};
          headers.forEach((header, index) => {
            product[header.trim()] = row[index]?.trim();
          });
          return product;
        });

        // Insert products into database
        for (const product of products) {
          const { error } = await supabase
            .from('products')
            .insert({
              title: product.post_title || product.name || 'Untitled Product',
              description: product.post_content || product.description || '',
              price: parseFloat(product.regular_price) || 0,
              sale_price: parseFloat(product.sale_price) || null,
              sku: product.sku || null,
              gtin: product.gtin || null,
              categories: product.categories ? product.categories.split('|') : null,
              user_id: session.user.id
            });

          if (error) {
            console.error('Error inserting product:', error);
            throw error;
          }
        }

        toast({
          title: "上傳成功",
          description: `已成功導入 ${products.length} 個產品。`,
        });
      };

      reader.readAsText(file);

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "上傳失敗",
        description: error instanceof Error ? error.message : "CSV上傳失敗，請重試。",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-4 p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl">
      <div className="space-y-2">
        <Label htmlFor="csv">CSV文件</Label>
        <Input
          id="csv"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={isUploading}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        <p className="text-xs text-gray-400">支持的格式：CSV文件（最大5MB）</p>
      </div>

      {isUploading && (
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};