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
    fetchWordPressProducts();
  }, []);

  const fetchWordPressProducts = async () => {
    try {
      console.log('Fetching WordPress products...');
      const response = await fetch('https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/products/zenring.WordPress.2024-12-26.xml?t=2024-12-26T06%3A15%3A39.228Z');
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      const items = xmlDoc.getElementsByTagName('item');
      const parsedProducts: Product[] = [];
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const postType = item.getElementsByTagName('wp:post_type')[0]?.textContent;
        
        if (postType === 'product') {
          const product: Product = {
            title: item.getElementsByTagName('title')[0]?.textContent || 'Untitled Product',
            description: item.getElementsByTagName('content:encoded')[0]?.textContent || '',
            price: item.getElementsByTagName('regular_price')[0]?.textContent || '0',
          };

          const attachmentUrl = item.getElementsByTagName('wp:attachment_url')[0]?.textContent;
          if (attachmentUrl) {
            product.imageUrl = attachmentUrl;
          }
          
          parsedProducts.push(product);
        }
      }
      
      console.log('Parsed products:', parsedProducts);
      setProducts(parsedProducts);
      
    } catch (error) {
      console.error('Error fetching WordPress products:', error);
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