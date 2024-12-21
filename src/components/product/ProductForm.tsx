import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, X } from 'lucide-react';
import { NewProduct } from '@/types/product';
import { ProductImageUploader } from './ProductImageUploader';
import { Badge } from '@/components/ui/badge';

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
  const [newTag, setNewTag] = useState('');

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

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!tags.includes(newTag.trim())) {
        setTags([...tags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
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

        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeTag(tag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <Input
            placeholder="添加標籤 (按Enter確認)"
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
            onKeyDown={handleAddTag}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="number"
            placeholder="價格"
            value={newProduct.price}
            onChange={e => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
          />
          <Input
            type="number"
            placeholder="促銷價格"
            value={newProduct.sale_price}
            onChange={e => setNewProduct(prev => ({ ...prev, sale_price: parseFloat(e.target.value) }))}
          />
          <Input
            type="number"
            placeholder="庫存"
            value={newProduct.inventory}
            onChange={e => setNewProduct(prev => ({ ...prev, inventory: parseInt(e.target.value) }))}
          />
        </div>

        <Input
          type="number"
          placeholder="成本"
          value={newProduct.product_cost}
          onChange={e => setNewProduct(prev => ({ ...prev, product_cost: parseFloat(e.target.value) }))}
        />

        <Textarea
          placeholder="產品描述"
          value={newProduct.description}
          onChange={e => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
          className="min-h-[100px]"
        />

        <div className="space-y-4">
          <Input
            placeholder="SEO 標題"
            value={newProduct.seo_title}
            onChange={e => setNewProduct(prev => ({ ...prev, seo_title: e.target.value }))}
          />
          <Input
            placeholder="SEO 關鍵字"
            value={newProduct.seo_keywords}
            onChange={e => setNewProduct(prev => ({ ...prev, seo_keywords: e.target.value }))}
          />
          <Textarea
            placeholder="SEO 描述"
            value={newProduct.seo_description}
            onChange={e => setNewProduct(prev => ({ ...prev, seo_description: e.target.value }))}
          />
        </div>

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