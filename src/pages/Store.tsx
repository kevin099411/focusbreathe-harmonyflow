import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StoreHeader } from '@/components/store/StoreHeader';
import { ProductGrid } from '@/components/store/ProductGrid';

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

      // Transform the data to match the Product interface
      const transformedProducts = data.map(product => ({
        title: product.title,
        description: product.description || '',
        price: product.price.toString(),
        imageUrl: product.image_url?.replace('public/', '') // Remove 'public/' prefix if present
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
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <StoreHeader />
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => fetchProducts()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
          >
            重試
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <StoreHeader />
      {products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">目前沒有商品</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">精選商品</h2>
            <div className="h-1 w-20 bg-primary rounded"></div>
          </div>
          <ProductGrid products={products} />
        </>
      )}
    </div>
  );
}