import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageCarouselProps {
  images: string[];
  currentImageIndex: number;
  onPrevImage: (e: React.MouseEvent) => void;
  onNextImage: (e: React.MouseEvent) => void;
  onImageClick: () => void;
}

export function ProductImageCarousel({
  images,
  currentImageIndex,
  onPrevImage,
  onNextImage,
  onImageClick,
}: ProductImageCarouselProps) {
  return (
    <div className="relative h-64 overflow-hidden bg-gray-100 cursor-pointer" onClick={onImageClick}>
      <img
        src={images[currentImageIndex]}
        alt="Product"
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        onError={(e) => {
          console.error('Error loading image:', e);
          e.currentTarget.src = '/placeholder.svg';
        }}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-white/70 hover:bg-white/90 rounded-full ml-2"
          onClick={onPrevImage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-white/70 hover:bg-white/90 rounded-full mr-2"
          onClick={onNextImage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}