import { useState, useEffect } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Loader2, Upload, Trash2, GripVertical } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  order_index: number;
}

export default function ProductManagement() {
  const session = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: '',
    description: '',
    price: 0,
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: '錯誤',
        description: '無法載入產品',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, productId?: string) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const filePath = `${productId || 'new'}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      if (productId) {
        const { error } = await supabase
          .from('products')
          .update({ image_url: publicUrl })
          .eq('id', productId);

        if (error) throw error;
        await fetchProducts();
      } else {
        setNewProduct(prev => ({ ...prev, image_url: publicUrl }));
      }

      toast({
        title: '成功',
        description: '圖片上傳成功',
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: '錯誤',
        description: '圖片上傳失敗',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const { error } = await supabase
        .from('products')
        .insert([{ ...newProduct, order_index: products.length }]);

      if (error) throw error;

      setNewProduct({
        title: '',
        description: '',
        price: 0,
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
      });
      await fetchProducts();

      toast({
        title: '成功',
        description: '產品創建成功',
      });
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: '錯誤',
        description: '產品創建失敗',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchProducts();

      toast({
        title: '成功',
        description: '產品刪除成功',
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: '錯誤',
        description: '產品刪除失敗',
        variant: 'destructive',
      });
    }
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProducts(items);

    // Update order indices in database
    try {
      const updates = items.map((item, index) => ({
        id: item.id,
        order_index: index,
      }));

      const { error } = await supabase
        .from('products')
        .upsert(updates);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: '錯誤',
        description: '更新順序失敗',
        variant: 'destructive',
      });
    }
  };

  if (!session) {
    return (
      <div className="p-4">
        <p>請先登入以管理產品</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">產品管理</h1>

      {/* New Product Form */}
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
              onChange={handleImageUpload}
              disabled={uploading}
            />
          </div>
          <Button
            onClick={handleCreateProduct}
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

      {/* Products List */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">產品列表</h2>
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="products">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {products.map((product, index) => (
                    <Draggable
                      key={product.id}
                      draggableId={product.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <div {...provided.dragHandleProps}>
                            <GripVertical className="h-5 w-5 text-gray-400" />
                          </div>
                          {product.image_url && (
                            <img
                              src={product.image_url}
                              alt={product.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="font-semibold">{product.title}</h3>
                            <p className="text-sm text-gray-500">
                              ${product.price}
                            </p>
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}