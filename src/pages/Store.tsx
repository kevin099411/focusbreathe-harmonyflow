import { useState, useEffect } from 'react';
import { DOMParser } from '@xmldom/xmldom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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

          // Try to get the product image
          const attachmentUrl = item.getElementsByTagName('wp:attachment_url')[0]?.textContent;
          if (attachmentUrl) {
            product.imageUrl = attachmentUrl;
          }
          
          parsedProducts.push(product);
        }
      }
      
      console.log('Parsed products:', parsedProducts);
      setProducts(parsedProducts);
      
      // Save products to Supabase
      for (const product of parsedProducts) {
        const { error } = await supabase
          .from('products')
          .insert({
            title: product.title,
            description: product.description,
            price: parseFloat(product.price) || 0,
            image_url: product.imageUrl,
          });

        if (error) {
          console.error('Error saving product:', error);
          toast({
            title: '錯誤',
            description: '保存產品時出錯',
            variant: 'destructive',
          });
        }
      }

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
      <h1 className="text-2xl font-bold mb-6">商店</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <Card key={index} className="overflow-hidden">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <div 
                className="text-gray-600 text-sm mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-[#e89eb8]">
                  ${parseFloat(product.price).toFixed(2)}
                </span>
                <Button>
                  查看詳情
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}