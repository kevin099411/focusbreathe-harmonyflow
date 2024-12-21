import { Input } from '@/components/ui/input';

interface PricingFieldsProps {
  price: number;
  salePrice: number;
  inventory: number;
  productCost: number;
  onPriceChange: (field: string, value: number) => void;
}

export function PricingFields({ 
  price, 
  salePrice, 
  inventory, 
  productCost, 
  onPriceChange 
}: PricingFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          type="number"
          placeholder="價格"
          value={price}
          onChange={e => onPriceChange('price', parseFloat(e.target.value))}
        />
        <Input
          type="number"
          placeholder="促銷價格"
          value={salePrice}
          onChange={e => onPriceChange('sale_price', parseFloat(e.target.value))}
        />
        <Input
          type="number"
          placeholder="庫存"
          value={inventory}
          onChange={e => onPriceChange('inventory', parseInt(e.target.value))}
        />
      </div>
      <Input
        type="number"
        placeholder="成本"
        value={productCost}
        onChange={e => onPriceChange('product_cost', parseFloat(e.target.value))}
      />
    </>
  );
}