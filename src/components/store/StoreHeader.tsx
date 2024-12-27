import { ShoppingBag } from "lucide-react";

export const StoreHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center space-x-4">
        <ShoppingBag className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">商店</h1>
          <p className="text-gray-600">探索我們精心挑選的商品</p>
        </div>
      </div>
    </div>
  );
};