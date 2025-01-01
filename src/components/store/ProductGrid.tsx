import { ProductCard } from "./ProductCard";

interface Product {
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
}

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
      {products.map((product, index) => (
        <div 
          key={index}
          className="transform transition-all duration-300 hover:translate-y-[-4px]"
          style={{
            animationDelay: `${index * 100}ms`
          }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};