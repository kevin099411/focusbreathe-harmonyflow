import { PricingCard } from "@/components/PricingCard";
import { Navigation } from "@/components/Navigation";

const Pricing = () => {
  const pricingPlans = [
    {
      title: "Basic Meditation",
      price: "9.99",
      features: [
        "5 guided meditations",
        "Basic breathing exercises",
        "Daily mindfulness tips",
        "Community forum access",
      ],
      hostedButtonId: "UZXYSVGZKPA76"
    },
    {
      title: "Premium Zen",
      price: "19.99",
      features: [
        "20 guided meditations",
        "Advanced breathing techniques",
        "Personal meditation tracker",
        "Weekly live sessions",
        "Premium meditation guide"
      ],
      isPopular: true,
      hostedButtonId: "UZXYSVGZKPA77"
    },
    {
      title: "Master Package",
      price: "49.99",
      features: [
        "Unlimited guided meditations",
        "1-on-1 meditation coaching",
        "Custom meditation plans",
        "Priority support",
        "Complete meditation library",
        "Exclusive workshops"
      ],
      hostedButtonId: "UZXYSVGZKPA78"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Path to Mindfulness</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan to support your meditation journey and unlock exclusive content
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              isPopular={plan.isPopular}
              hostedButtonId={plan.hostedButtonId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;