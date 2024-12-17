import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export const PricingCard = ({ title, price, features, isPopular }: PricingCardProps) => {
  return (
    <div className={`relative rounded-lg p-6 ${isPopular ? 'bg-primary text-white shadow-xl scale-105' : 'bg-white text-gray-900 shadow-lg'}`}>
      {isPopular && (
        <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-sm">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="mb-6">
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-sm opacity-80">/month</span>
      </div>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <Check className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-2 rounded-lg transition-colors ${
          isPopular
            ? 'bg-white text-primary hover:bg-gray-100'
            : 'bg-primary text-white hover:bg-primary/90'
        }`}
      >
        Get Started
      </button>
    </div>
  );
};