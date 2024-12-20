import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { NewProduct } from '@/types/product';

interface ProductFormProps {
  onSubmit: (product: Partial<NewProduct>) => Promise<void>;
  uploading: boolean;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export function ProductForm({ onSubmit, uploading, onImageUpload }: ProductFormProps) {
  const [newProduct, setNewProduct] = useState<Partial<NewProduct>>({
    title: '',
    description: '',
    price: 0,
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
  });

  const handleSubmit = async () => {
    await onSubmit(newProduct);
    setNewProduct({
      title: '',
      description: '',
      price: 0,
      seo_title: '',
      seo_description: '',
      seo_keywords: '',
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold">新增產品</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="產品名稱"
          value={newProduct.title}
          onChange={e => setNewProduct(prev => ({ ...prev, title: e.target.value }))}
        />
        <Input
          type="number"
          placeholder="價格"
          value={newProduct.price}
          onChange={e => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
        />
        <Textarea
          placeholder="產品描述"
          value={newProduct.description}
          onChange={e => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
          className="md:col-span-2"
        />
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
          className="md:col-span-2"
        />
        <div className="md:col-span-2">
          <Input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            disabled={uploading}
          />
        </div>
        <Button
          onClick={handleSubmit}
          className="md:col-span-2"
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