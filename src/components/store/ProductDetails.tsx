import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { ProductImageCarousel } from "./ProductImageCarousel";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ProductDetailsProps {
  product: {
    title: string;
    description: string;
    price: string;
    colors?: { name: string; images: string[] }[];
  };
  showDetails: boolean;
  onCloseDetails: () => void;
  currentImageIndex: number;
  productImages: string[];
  onPrevImage: (e: React.MouseEvent) => void;
  onNextImage: (e: React.MouseEvent) => void;
  onImageSelect: (index: number) => void;
  onAddToCart: () => void;
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export function ProductDetails({
  product,
  showDetails,
  onCloseDetails,
  currentImageIndex,
  productImages,
  onPrevImage,
  onNextImage,
  onImageSelect,
  onAddToCart,
  selectedColor,
  onColorChange,
}: ProductDetailsProps) {
  return (
    <Dialog open={showDetails} onOpenChange={onCloseDetails}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.title}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <ProductImageCarousel
              images={productImages}
              currentImageIndex={currentImageIndex}
              onPrevImage={onPrevImage}
              onNextImage={onNextImage}
              onImageClick={() => {}}
            />
          </div>
          <div className="space-y-4">
            <DialogDescription 
              className="text-base text-gray-700"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            
            {product.colors && (
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">選擇顏色</h3>
                <RadioGroup 
                  value={selectedColor} 
                  onValueChange={onColorChange}
                  className="flex gap-4"
                >
                  {product.colors.map((color) => (
                    <div key={color.name} className="flex items-center space-x-2">
                      <RadioGroupItem value={color.name} id={`detail-${color.name}`} />
                      <Label htmlFor={`detail-${color.name}`} className="capitalize">
                        {color.name === 'grey' ? '灰色' : color.name === 'green' ? '綠色' : color.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            <div className="grid grid-cols-4 gap-2 mt-4">
              {productImages.map((img, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 rounded overflow-hidden ${
                    currentImageIndex === index ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => onImageSelect(index)}
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
                  onClick={onAddToCart}
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
  );
}