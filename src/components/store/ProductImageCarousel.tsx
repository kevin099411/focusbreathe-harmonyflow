import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageCarouselProps {
  images: string[];
  currentImageIndex: number;
  onPrevImage: (e: React.MouseEvent) => void;
  onNextImage: (e: React.MouseEvent) => void;
  onImageClick: () => void;
  onImageLoad?: () => void;
}

export function ProductImageCarousel({
  images,
  currentImageIndex,
  onPrevImage,
  onNextImage,
  onImageClick,
  onImageLoad,
}: ProductImageCarouselProps) {
  return (
    <div className="relative h-64 overflow-hidden bg-gray-50 cursor-pointer group" onClick={onImageClick}>
      <img
        src={images[currentImageIndex]}
        alt="Product"
        className="w-full h-full object-cover transform transition-all duration-500 ease-out 
                 group-hover:scale-110 motion-safe:animate-fade-in"
        loading="lazy"
        onLoad={onImageLoad}
        onError={(e) => {
          console.error('Error loading image:', e);
          e.currentTarget.src = '/placeholder.svg';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-white/70 hover:bg-white/90 rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={onPrevImage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 bg-white/70 hover:bg-white/90 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={onNextImage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}