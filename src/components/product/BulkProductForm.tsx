import { useState } from 'react';
import { ProductImageDropzone } from './ProductImageDropzone';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export function BulkProductForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    salePrice: '',
    inventory: '',
    productCost: '',
  });

  const handleImagesChange = (files: File[]) => {
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    setImages(prev => [...prev, ...files]);
  };

  const handleRemoveImage = (index: number) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      setIsUploading(true);

      // Validate form data
      if (!formData.title || !formData.description || !formData.price) {
        toast({
          title: "請填寫必填欄位",
          description: "標題、描述和價格為必填項",
          variant: "destructive",
        });
        return;
      }

      // Upload images and create products
      for (const image of images) {
        const fileExt = image.name.split('.').pop();
        const filePath = `${Math.random()}.${fileExt}`;

        // Upload image to storage
        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);

        // Create product in database
        const { error: insertError } = await supabase
          .from('products')
          .insert({
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price),
            sale_price: formData.salePrice ? parseFloat(formData.salePrice) : null,
            inventory: formData.inventory ? parseInt(formData.inventory) : 0,
            product_cost: formData.productCost ? parseFloat(formData.productCost) : null,
            image_url: publicUrl,
          });

        if (insertError) throw insertError;
      }

      toast({
        title: "上傳成功",
        description: "產品已成功創建",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        salePrice: '',
        inventory: '',
        productCost: '',
      });
      setImages([]);
      setPreviewUrls([]);

    } catch (error) {
      console.error('Error creating products:', error);
      toast({
        title: "上傳失敗",
        description: "創建產品時發生錯誤",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">產品名稱 *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="輸入產品名稱"
            disabled={isUploading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">產品描述 *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="輸入產品描述"
            disabled={isUploading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">價格 *</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={e => setFormData(prev => ({ ...prev, price: e.target.value }))}
              placeholder="0.00"
              disabled={isUploading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="salePrice">特價</Label>
            <Input
              id="salePrice"
              type="number"
              value={formData.salePrice}
              onChange={e => setFormData(prev => ({ ...prev, salePrice: e.target.value }))}
              placeholder="0.00"
              disabled={isUploading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inventory">庫存</Label>
            <Input
              id="inventory"
              type="number"
              value={formData.inventory}
              onChange={e => setFormData(prev => ({ ...prev, inventory: e.target.value }))}
              placeholder="0"
              disabled={isUploading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productCost">成本</Label>
            <Input
              id="productCost"
              type="number"
              value={formData.productCost}
              onChange={e => setFormData(prev => ({ ...prev, productCost: e.target.value }))}
              placeholder="0.00"
              disabled={isUploading}
            />
          </div>
        </div>

        <ProductImageDropzone
          onImagesChange={handleImagesChange}
          previewUrls={previewUrls}
          onRemoveImage={handleRemoveImage}
        />

        <Button
          onClick={handleSubmit}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              上傳中...
            </>
          ) : (
            '新增產品'
          )}
        </Button>
      </div>
    </div>
  );
}