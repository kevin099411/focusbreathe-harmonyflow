import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Info } from "lucide-react";
import { ProductImageCarousel } from "./ProductImageCarousel";
import { ProductDetails } from "./ProductDetails";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id?: string;
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem } = useCart();
  
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
    addItem({
      id: product.id || Math.random().toString(),
      title: product.title,
      price: product.price,
      imageUrl: productImages[currentImageIndex]
    });
  };

  return (
    <>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm">
        <div className="relative">
          <ProductImageCarousel
            images={productImages}
            currentImageIndex={currentImageIndex}
            onPrevImage={handlePrevImage}
            onNextImage={handleNextImage}
            onImageClick={() => setShowDetails(true)}
            onImageLoad={() => setImageLoaded(true)}
          />
          <div className="absolute top-2 right-2">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/90 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(true);
              }}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
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
              className="flex items-center space-x-2 bg-primary text-white hover:bg-primary/90 active:bg-primary/80 transition-colors"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>加入購物車</span>
            </Button>
          </div>
        </div>
      </Card>

      <ProductDetails
        product={product}
        showDetails={showDetails}
        onCloseDetails={() => setShowDetails(false)}
        currentImageIndex={currentImageIndex}
        productImages={productImages}
        onPrevImage={handlePrevImage}
        onNextImage={handleNextImage}
        onImageSelect={setCurrentImageIndex}
        onAddToCart={handleAddToCart}
      />
    </>
  );
};