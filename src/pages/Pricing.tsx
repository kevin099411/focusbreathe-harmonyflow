import { PricingCard } from "@/components/PricingCard";
import { Navigation } from "@/components/Navigation";

const Pricing = () => {
  const pricingPlans = [
    {
      title: "Beginner",
      price: "30",
      features: [
        "Basic guided meditations",
        "Simple breathing exercises",
        "Limited 852 Hz tracks",
        "Community access",
      ],
    },
    {
      title: "Advanced",
      price: "50",
      features: [
        "All Beginner features",
        "Advanced Sri Sri techniques",
        "Full 852 Hz library",
        "Progress tracking",
      ],
      isPopular: true,
    },
    {
      title: "Guru",
      price: "100",
      features: [
        "All Advanced features",
        "1-on-1 breathing sessions",
        "Custom meditation plans",
        "Priority support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Path</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan to support your meditation and mindfulness journey
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;