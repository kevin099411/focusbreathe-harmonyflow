import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StoreHeader } from '@/components/store/StoreHeader';
import { ProductGrid } from '@/components/store/ProductGrid';
import { CartProvider } from '@/contexts/CartContext';
import { CartDrawer } from '@/components/store/CartDrawer';

interface Product {
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
}

export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching products from Supabase...');
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('order_index', { ascending: true })
        .not('title', 'is', null)
        .gt('price', 0);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        console.log('No products found');
        setProducts([]);
        return;
      }

      const transformedProducts = data.map(product => ({
        title: product.title,
        description: product.description || '',
        price: product.price.toString(),
        imageUrl: product.image_url?.replace('public/', '')
      }));
      
      console.log('Fetched products:', transformedProducts);
      setProducts(transformedProducts);
      
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('無法載入產品');
      toast({
        title: '錯誤',
        description: '無法載入產品',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-primary/20 to-secondary/20">
        <StoreHeader />
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => fetchProducts()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
          >
            重試
          </button>
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <StoreHeader />
            <CartDrawer />
          </div>
          {products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">目前沒有商品</p>
            </div>
          ) : (
            <>
              <div className="mb-8 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">精選商品</h2>
                <div className="h-1 w-20 bg-primary rounded"></div>
              </div>
              <ProductGrid products={products} />
            </>
          )}
        </div>
      </div>
    </CartProvider>
  );
}