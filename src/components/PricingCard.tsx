import { Check } from "lucide-react";
import { PayPalButton } from "./PayPalButton";
import { useState } from "react";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  hostedButtonId: string;
}

export const PricingCard = ({ title, price, features, isPopular, hostedButtonId }: PricingCardProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div 
      className={`relative rounded-2xl p-8 cursor-pointer transition-colors duration-300 ${
        isSelected 
          ? 'bg-primary text-white'
          : isPopular 
            ? 'bg-primary text-white shadow-xl scale-105 border-2 border-primary-foreground' 
            : 'bg-card text-card-foreground shadow-lg border border-border'
      }`}
      onClick={handleClick}
    >
      {isPopular && (
        <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </span>
      )}
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-sm opacity-80">/month</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <Check className={`h-5 w-5 flex-shrink-0 ${
              isSelected 
                ? 'text-white' 
                : isPopular 
                  ? 'text-secondary' 
                  : 'text-primary'
            }`} />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <PayPalButton 
          amount={price} 
          planTitle={title}
          hostedButtonId={hostedButtonId}
        />
      </div>
    </div>
  );
};