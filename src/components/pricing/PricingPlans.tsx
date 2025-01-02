import { useState } from "react";
import { PricingPlan } from "./PricingPlan";

export const PricingPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <PricingPlan
        title="連續包月"
        price="220"
        period="月"
        isPopular={true}
        badge="最受歡迎"
        isSelected={selectedPlan === 'monthly'}
        onSelect={() => setSelectedPlan('monthly')}
      />
      <PricingPlan
        title="連續包年"
        price="1,190"
        period="年"
        badge="免費試用"
        badgeColor="#F3F4F6"
        isSelected={selectedPlan === 'yearly'}
        onSelect={() => setSelectedPlan('yearly')}
      />
    </div>
  );
};