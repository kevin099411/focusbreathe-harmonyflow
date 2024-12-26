import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PayPalButton } from '@/components/PayPalButton';
import { DownloadTemplate } from '@/components/product/DownloadTemplate';

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products...');
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      console.log('Products fetched:', data);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">商店</h1>
        <DownloadTemplate />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => setSelectedProduct(product)}
          >
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-[#e89eb8]">
                  ${product.price}
                </span>
                {product.sale_price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.sale_price}
                  </span>
                )}
              </div>
              <Button 
                className="w-full mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(product);
                }}
              >
                查看詳情
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.title}</DialogTitle>
                {selectedProduct.image_url && (
                  <img
                    src={selectedProduct.image_url}
                    alt={selectedProduct.title}
                    className="w-full h-64 object-cover rounded-md my-4"
                  />
                )}
                <DialogDescription className="space-y-4">
                  <p className="text-gray-700">{selectedProduct.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[#e89eb8]">
                      ${selectedProduct.price}
                    </span>
                    {selectedProduct.sale_price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${selectedProduct.sale_price}
                      </span>
                    )}
                  </div>
                  {selectedProduct.inventory !== undefined && selectedProduct.inventory > 0 && (
                    <p className="text-sm text-gray-600">
                      庫存: {selectedProduct.inventory} 件
                    </p>
                  )}
                  <div className="mt-4">
                    <PayPalButton 
                      amount={selectedProduct.price.toString()} 
                      planTitle={selectedProduct.title}
                    />
                  </div>
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}