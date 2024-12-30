import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface Product {
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();
  console.log('Product image URL:', product.imageUrl);

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '/placeholder.svg';
    
    // Remove 'public/' prefix if it exists
    const cleanImageUrl = imageUrl.replace('public/', '');
    
    // Construct the full Supabase storage URL
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/products/${cleanImageUrl.split('/').pop()}`;
  };

  const handleAddToCart = () => {
    toast({
      title: "已加入購物車",
      description: `${product.title} 已成功加入購物車`,
    });
  };

  return (
    <>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
        <div className="relative h-64 overflow-hidden bg-gray-100 cursor-pointer" onClick={() => setShowDetails(true)}>
          {product.imageUrl ? (
            <img
              src={getImageUrl(product.imageUrl)}
              alt={product.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                console.error('Error loading image:', e);
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-sm text-gray-600">No image available</p>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-2 right-2 bg-white/90 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(true);
            }}
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {product.title}
          </h2>
          <div 
            className="text-gray-600 text-sm mb-4 line-clamp-3 h-[4.5rem]"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-primary">
              NT${parseFloat(product.price).toLocaleString()}
            </span>
            <Button 
              variant="secondary"
              className="flex items-center space-x-2 bg-primary text-white hover:bg-primary/90"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>加入購物車</span>
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{product.title}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img
                src={product.imageUrl ? getImageUrl(product.imageUrl) : '/placeholder.svg'}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <DialogDescription 
                className="text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary">
                    NT${parseFloat(product.price).toLocaleString()}
                  </span>
                  <Button 
                    variant="secondary"
                    className="flex items-center space-x-2 bg-primary text-white hover:bg-primary/90"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>加入購物車</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};