import { useState, useEffect } from 'react';
import { DOMParser } from '@xmldom/xmldom';
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products from Supabase...');
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;

      // Transform the data to match the Product interface
      const transformedProducts = data.map(product => ({
        title: product.title,
        description: product.description,
        price: product.price.toString(),
        imageUrl: product.image_url
      }));
      
      console.log('Fetched products:', transformedProducts);
      setProducts(transformedProducts);
      
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <StoreHeader />
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">精選商品</h2>
        <div className="h-1 w-20 bg-primary rounded"></div>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}