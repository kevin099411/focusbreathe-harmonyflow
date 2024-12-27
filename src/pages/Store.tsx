import { useState, useEffect } from 'react';
import { DOMParser } from '@xmldom/xmldom';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StoreHeader } from '@/components/store/StoreHeader';
import { ProductGrid } from '@/components/store/ProductGrid';
import { useNavigate } from 'react-router-dom';

interface Product {
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
}

export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
    fetchWordPressProducts();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "請先登入",
        description: "您需要先登入才能存取商店功能",
        variant: "destructive",
      });
      navigate('/login');
      return false;
    }
    return true;
  };

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
      
      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) {
        console.log('No authenticated user found, skipping product save');
        return;
      }

      // Save products to Supabase with user_id
      for (const product of parsedProducts) {
        const { error } = await supabase
          .from('products')
          .insert({
            title: product.title,
            description: product.description,
            price: parseFloat(product.price) || 0,
            image_url: product.imageUrl,
            user_id: session.user.id // Set the user_id field
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
      <StoreHeader />
      <ProductGrid products={products} />
    </div>
  );
}