import { Product } from "@/types/product";
import { ShoppingCart, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {product.image_url && (
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image_url}
            alt={product.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-lg font-bold text-accent">
            <DollarSign className="h-5 w-5 mr-1" />
            {product.price}
          </div>
          <Button className="bg-accent hover:bg-accent/90">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
        </div>
        {product.inventory !== null && product.inventory <= 5 && product.inventory > 0 && (
          <p className="mt-2 text-sm text-red-500">
            Only {product.inventory} left in stock!
          </p>
        )}
      </div>
    </div>
  );
}