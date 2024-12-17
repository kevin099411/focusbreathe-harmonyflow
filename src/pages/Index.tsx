import { Navigation } from "@/components/Navigation";
import { MeditationCard } from "@/components/MeditationCard";
import { BreathingCircle } from "@/components/BreathingCircle";
import { PricingCard } from "@/components/PricingCard";

const Index = () => {
  const featuredMeditations = [
    {
      title: "Focus Reset in 5 Minutes",
      duration: "5 min",
      description: "Quick meditation with 852 Hz frequency for mental clarity",
      image: "/placeholder.svg",
    },
    {
      title: "Mindfulness for Racing Thoughts",
      duration: "10 min",
      description: "Guided session to calm an overactive mind",
      image: "/placeholder.svg",
    },
    {
      title: "Energy Boost with 852 Hz",
      duration: "15 min",
      description: "Energizing meditation with healing frequencies",
      image: "/placeholder.svg",
    },
  ];

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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Breathe Deep, Focus Sharp, Live Calm
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover peace and clarity through guided meditations, Sri Sri breathing techniques, and healing 852 Hz frequencies.
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors">
            Start Your Journey
          </button>
        </div>
      </section>

      {/* Featured Meditations */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Meditations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMeditations.map((meditation, index) => (
              <MeditationCard key={index} {...meditation} />
            ))}
          </div>
        </div>
      </section>

      {/* Breathing Exercise */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Take a Moment to Breathe
          </h2>
          <BreathingCircle />
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Choose Your Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;