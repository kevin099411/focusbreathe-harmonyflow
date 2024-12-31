import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  id: string;
  title: string;
  price: string;
  quantity: number;
  imageUrl?: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({
  id,
  title,
  price,
  quantity,
  imageUrl,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) => {
  const handleQuantityChange = (value: string) => {
    const newQuantity = parseInt(value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onUpdateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 border-b pb-4">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full sm:w-16 h-32 sm:h-16 object-cover rounded"
        />
      )}
      <div className="flex-grow space-y-1">
        <h3 className="font-medium text-sm">{title}</h3>
        <p className="text-sm text-muted-foreground">
          NT${parseFloat(price).toLocaleString()}
        </p>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(id, quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
            className="w-16 h-8 text-center"
            min="1"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onUpdateQuantity(id, quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive ml-2"
            onClick={() => onRemove(id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};