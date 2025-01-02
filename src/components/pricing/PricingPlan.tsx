import { PayPalButton } from "@/components/PayPalButton";

interface PricingPlanProps {
  title: string;
  price: string;
  period: string;
  isPopular?: boolean;
  isSelected: boolean;
  badge?: string;
  badgeColor?: string;
  onSelect: () => void;
}

export const PricingPlan = ({
  title,
  price,
  period,
  isPopular,
  isSelected,
  badge,
  badgeColor = '#D4AF37',
  onSelect,
}: PricingPlanProps) => {
  return (
    <div 
      className={`bg-white rounded-xl p-6 ${
        isSelected ? 'border-2 border-[#D4AF37]' : 'border border-gray-200'
      }`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-center mb-2">
        <div>
          {badge && (
            <span 
              className="text-xs px-2 py-1 rounded-full"
              style={{ backgroundColor: badgeColor, color: 'white' }}
            >
              {badge}
            </span>
          )}
          <h3 className="text-lg font-semibold mt-2">{title}</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">${price}</p>
          <p className="text-sm text-gray-500">/{period}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        {period === '月' ? '次月 $220 自動續訂，可隨時取消' : ''}
      </p>
      {isSelected && (
        <div className="mt-4">
          <PayPalButton amount={price} planTitle={title} />
        </div>
      )}
    </div>
  );
};