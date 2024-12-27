import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {product.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 text-[#333333] line-clamp-2">
          {product.title}
        </h2>
        <div 
          className="text-gray-600 text-sm mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-[#e89eb8]">
            ${parseFloat(product.price).toFixed(2)}
          </span>
          <Button 
            variant="secondary"
            className="hover:bg-[#e89eb8] hover:text-white transition-colors"
          >
            查看詳情
          </Button>
        </div>
      </div>
    </Card>
  );
};