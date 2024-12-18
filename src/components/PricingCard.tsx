import { Check } from "lucide-react";
import { PayPalButton } from "./PayPalButton";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

export const PricingCard = ({ 
  title, 
  price, 
  features, 
  isPopular, 
  isSelected,
  onSelect 
}: PricingCardProps) => {
  const [showPayPal, setShowPayPal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    try {
      console.log(`Selecting pricing plan: ${title}`);
      setIsLoading(true);
      onSelect();
      setShowPayPal(true);
    } catch (error) {
      console.error('Error selecting plan:', error);
      toast({
        title: "選擇方案錯誤",
        description: "無法選擇此方案，請稍後再試。",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`relative rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isSelected 
          ? 'bg-[#0EA5E9] text-white shadow-xl scale-105'
          : isPopular 
            ? 'bg-white text-gray-900 shadow-xl border-2 border-[#0EA5E9]' 
            : 'bg-white text-gray-900 shadow-lg border border-gray-200 hover:border-[#0EA5E9]'
      }`}
      onClick={handleClick}
    >
      {isPopular && !isSelected && (
        <span className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 bg-[#D946EF] text-white px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap">
          最受歡迎
        </span>
      )}
      <h3 className={`text-xl md:text-2xl font-bold mb-3 md:mb-4 ${
        isSelected ? 'text-white' : 'text-[#0EA5E9]'
      }`}>{title}</h3>
      <div className="mb-4 md:mb-6">
        <span className={`text-3xl md:text-4xl font-bold ${
          isSelected ? 'text-white' : 'text-gray-900'
        }`}>${price}</span>
        <span className={`text-sm ${
          isSelected ? 'text-white/80' : 'text-gray-600'
        }`}>/月</span>
      </div>
      <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
              isSelected 
                ? 'text-white' 
                : 'text-[#0EA5E9]'
            }`} />
            <span className={`text-sm md:text-base ${
              isSelected ? 'text-white' : 'text-gray-700'
            }`}>{feature}</span>
          </li>
        ))}
      </ul>
      {showPayPal && (
        <div className="mt-4 md:mt-6">
          <PayPalButton 
            amount={price} 
            planTitle={title}
          />
        </div>
      )}
      {isLoading && (
        <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};