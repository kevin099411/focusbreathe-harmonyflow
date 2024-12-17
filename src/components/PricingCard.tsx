import { Check } from "lucide-react";
import { PayPalButton } from "./PayPalButton";
import { useState } from "react";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export const PricingCard = ({ title, price, features, isPopular }: PricingCardProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    setShowPayPal(true);
  };

  return (
    <div 
      className={`relative rounded-2xl p-6 md:p-8 cursor-pointer transition-colors duration-300 ${
        isSelected 
          ? 'bg-primary text-white'
          : isPopular 
            ? 'bg-primary text-white shadow-xl md:scale-105 border-2 border-primary-foreground' 
            : 'bg-card text-card-foreground shadow-lg border border-border'
      }`}
      onClick={handleClick}
    >
      {isPopular && (
        <span className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs md:text-sm font-medium whitespace-nowrap">
          最受歡迎
        </span>
      )}
      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{title}</h3>
      <div className="mb-4 md:mb-6">
        <span className="text-3xl md:text-4xl font-bold">${price}</span>
        <span className="text-sm opacity-80">/月</span>
      </div>
      <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
              isSelected 
                ? 'text-white' 
                : isPopular 
                  ? 'text-secondary' 
                  : 'text-primary'
            }`} />
            <span className="text-sm md:text-base">{feature}</span>
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
    </div>
  );
};