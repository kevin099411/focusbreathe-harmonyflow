import { PricingHeader } from "@/components/pricing/PricingHeader";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { PricingFeaturesList } from "@/components/pricing/PricingFeaturesList";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-20 px-4">
      <PricingHeader />
      <div className="max-w-2xl mx-auto">
        <PricingPlans />
        <PricingFeaturesList />
      </div>
    </div>
  );
};

export default Pricing;