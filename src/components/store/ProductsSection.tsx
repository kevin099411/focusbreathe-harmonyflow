import { ProductGrid } from './ProductGrid';

interface Product {
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
  colors?: { name: string; images: string[] }[];
}

interface ProductsSectionProps {
  products: Product[];
}

export const ProductsSection = ({ products }: ProductsSectionProps) => {
  return (
    <>
      <div className="mb-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">精選商品</h2>
        <div className="h-1 w-20 bg-primary rounded"></div>
      </div>
      <ProductGrid products={products} />
    </>
  );
};