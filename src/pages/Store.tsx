import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { StoreHeader } from '@/components/store/StoreHeader';
import { CartProvider } from '@/contexts/CartContext';
import { CartDrawer } from '@/components/store/CartDrawer';
import { StoreLoading } from '@/components/store/StoreLoading';
import { StoreError } from '@/components/store/StoreError';
import { ProductsSection } from '@/components/store/ProductsSection';

interface Product {
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
  colors?: { name: string; images: string[] }[];
}

const meditationBench: Product = {
  title: "冥想長凳 竹冥想凳 折疊跪坐 Seiza 祈禱椅 帶冥想墊 跪凳",
  description: `
    <p>‍♂️【100% 天然竹】這款折疊冥想長凳由 100% 可持續竹製成,配有耐用、可機洗的棉質保護套,提供額外保護。 折疊冥想凳採用耐用性和強度製成,最大承重能力為 250 磅(約 117.9 公斤)。 根據最適合您的需求,有或不使用靠墊。</p>
    <p>【人體工學設計】我們的跪式折疊冥想椅專注於人體工程學設計,為您提供舒適的冥想姿勢和輕鬆的腿部運動。 Seiza 祈禱台向前傾斜約 5°,為您提供舒適的姿勢傾斜。 這款冥想凳適用於所有冥想風格,並促進平衡姿勢,以進行更深層次的冥想。</p>
    <p>✨【鎖定磁性鉸鏈】可折疊祈禱凳的堅固結構和安全鎖定磁性鉸鏈提供穩定的長凳。 坐在我們的祈禱台上坐著冥想墊,有助於減輕身體壓力,並對齊骨盆和脊椎。 支撐您的脊椎,使姿勢更加自然和直。</p>
    <p>🥰【防滑設計】冥想凳底部配有防滑墊,可提供額外的強度和抓地力。 由於冥想凳子具有防滑設計,您可以在室內或室外使用 Yoga 冥想凳。 由於其可折疊設計,這款跪凳可以平折,方便存放或運輸在行李箱或背包中。</p>
    <p>‍♂️【廣泛使用】耐用的冥想椅適合不同年齡的從業者。 竹製冥想凳專為冥想、瑜伽、祈禱、茶凳和地板長凳而設計。 瑜伽冥想椅專注於現代世界的冥想、自我護理和健康用品,是瑜伽和冥想愛好者的完美禮物。</p>
  `,
  price: "1750",
  colors: [
    {
      name: "grey",
      images: [
        "/lovable-uploads/a65b8eda-bb51-4764-9bcf-e7885a330885.png",
      ]
    },
    {
      name: "green",
      images: [
        "/lovable-uploads/bba4c9c0-2bec-4185-bfd7-b7abd93ad6cf.png",
      ]
    }
  ]
};

export default function Store() {
  const [products, setProducts] = useState<Product[]>([meditationBench]);
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
        console.log('No additional products found');
        return;
      }

      const transformedProducts = data.map(product => ({
        title: product.title,
        description: product.description || '',
        price: product.price.toString(),
        imageUrl: product.image_url?.replace('public/', '')
      }));
      
      console.log('Fetched products:', transformedProducts);
      setProducts(prev => [meditationBench, ...transformedProducts]);
      
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
    return <StoreLoading />;
  }

  if (error) {
    return <StoreError error={error} onRetry={fetchProducts} />;
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
            <ProductsSection products={products} />
          )}
        </div>
      </div>
    </CartProvider>
  );
}