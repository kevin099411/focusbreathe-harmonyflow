import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Info, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();
  
  // Define product images array
  const productImages = [
    "/lovable-uploads/66f66b3c-2013-413d-a29e-e15d124078da.png",
    "/lovable-uploads/b5c616bd-3ca3-413b-a1ac-54d27ae3bef7.png",
    "/lovable-uploads/f7741374-ae1d-4fe4-9c35-696661798343.png",
    "/lovable-uploads/13c5454a-e3ef-4b6b-b8c9-22d42264ac35.png"
  ];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    toast({
      title: "已加入購物車",
      description: `${product.title} 已成功加入購物車`,
    });
  };

  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '/placeholder.svg';
    if (imageUrl.startsWith('/lovable-uploads/')) return imageUrl;
    
    // Remove 'public/' prefix if it exists
    const cleanImageUrl = imageUrl.replace('public/', '');
    
    // Construct the full Supabase storage URL
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/products/${cleanImageUrl.split('/').pop()}`;
  };

  return (
    <>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
        <div className="relative h-64 overflow-hidden bg-gray-100 cursor-pointer" onClick={() => setShowDetails(true)}>
          <img
            src={productImages[currentImageIndex]}
            alt={product.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              console.error('Error loading image:', e);
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          
          {/* Navigation arrows */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-white/70 hover:bg-white/90 rounded-full ml-2"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-white/70 hover:bg-white/90 rounded-full mr-2"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

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
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{product.title}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img
                src={productImages[currentImageIndex]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {/* Navigation arrows for modal */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white/70 hover:bg-white/90 rounded-full ml-2"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white/70 hover:bg-white/90 rounded-full mr-2"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <DialogDescription 
                className="text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              {/* Thumbnail images */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {productImages.map((img, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer border-2 rounded overflow-hidden ${
                      currentImageIndex === index ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={img}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      className="w-full h-16 object-cover"
                    />
                  </div>
                ))}
              </div>
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