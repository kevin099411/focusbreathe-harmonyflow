import { ShoppingBag } from "lucide-react";

export const StoreHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">商店</h1>
      <ShoppingBag className="h-6 w-6 text-[#e89eb8]" />
    </div>
  );
};