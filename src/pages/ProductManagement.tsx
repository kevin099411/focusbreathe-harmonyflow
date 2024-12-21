import { useState, useEffect } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Product, NewProduct } from '@/types/product';
import { ProductForm } from '@/components/product/ProductForm';
import { ProductList } from '@/components/product/ProductList';

export default function ProductManagement() {
  const session = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

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

  const handleCreateProduct = async (newProduct: Partial<NewProduct>) => {
    if (!newProduct.title || !newProduct.description || !newProduct.price) {
      toast({
        title: '錯誤',
        description: '請填寫必要欄位',
        variant: 'destructive',
      });
      return;
    }

    try {
      setUploading(true);
      const { error } = await supabase
        .from('products')
        .insert({
          ...newProduct,
          order_index: products.length,
          user_id: session?.user?.id,
          title: newProduct.title,
          description: newProduct.description,
          price: newProduct.price,
        });

      if (error) throw error;
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
    } finally {
      setUploading(false);
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

    try {
      const updates = items.map((item, index) => ({
        id: item.id,
        order_index: index,
        title: item.title,
        description: item.description,
        price: item.price,
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
      <ProductForm
        onSubmit={handleCreateProduct}
        uploading={uploading}
      />
      <ProductList
        products={products}
        loading={loading}
        onDelete={handleDeleteProduct}
        onDragEnd={onDragEnd}
      />
    </div>
  );
}