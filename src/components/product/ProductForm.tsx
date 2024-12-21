import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { NewProduct } from '@/types/product';
import { ProductImageUploader } from './ProductImageUploader';
import { TagManager } from './TagManager';
import { PricingFields } from './PricingFields';
import { SeoFields } from './SeoFields';

interface ProductFormProps {
  onSubmit: (product: Partial<NewProduct>) => Promise<void>;
  uploading: boolean;
}

export function ProductForm({ onSubmit, uploading }: ProductFormProps) {
  const [newProduct, setNewProduct] = useState<Partial<NewProduct>>({
    title: '',
    description: '',
    price: 0,
    sale_price: 0,
    inventory: 0,
    product_cost: 0,
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
  });
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async () => {
    await onSubmit({
      ...newProduct,
      image_url: images[0], // Set primary image
    });
    // Reset form
    setNewProduct({
      title: '',
      description: '',
      price: 0,
      sale_price: 0,
      inventory: 0,
      product_cost: 0,
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
    });
    setImages([]);
    setTags([]);
  };

  const handlePriceChange = (field: string, value: number) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleSeoChange = (field: string, value: string) => {
    setNewProduct(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-6">
      <h2 className="text-xl font-semibold">新增產品</h2>
      
      <div className="space-y-4">
        <ProductImageUploader
          onImagesUploaded={(urls) => setImages(prev => [...prev, ...urls])}
        />

        <Input
          placeholder="產品名稱"
          value={newProduct.title}
          onChange={e => setNewProduct(prev => ({ ...prev, title: e.target.value }))}
        />

        <TagManager
          tags={tags}
          onTagsChange={setTags}
        />

        <PricingFields
          price={newProduct.price || 0}
          salePrice={newProduct.sale_price || 0}
          inventory={newProduct.inventory || 0}
          productCost={newProduct.product_cost || 0}
          onPriceChange={handlePriceChange}
        />

        <Textarea
          placeholder="產品描述"
          value={newProduct.description}
          onChange={e => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
          className="min-h-[100px]"
        />

        <SeoFields
          seoTitle={newProduct.seo_title || ''}
          seoKeywords={newProduct.seo_keywords || ''}
          seoDescription={newProduct.seo_description || ''}
          onSeoChange={handleSeoChange}
        />

        <Button
          onClick={handleSubmit}
          className="w-full"
          disabled={uploading}
        >
          {uploading ? (
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