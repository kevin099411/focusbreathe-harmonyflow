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
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80",
      audioUrl: "https://cdn.pixabay.com/download/audio/2022/02/07/audio_d1718ab41b.mp3?filename=852hz-solfeggio-frequency-healing-music-22974.mp3",
    },
    {
      title: "Mindfulness for Racing Thoughts",
      duration: "10 min",
      description: "Guided session to calm an overactive mind",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80",
    },
    {
      title: "Energy Boost with 852 Hz",
      duration: "15 min",
      description: "Energizing meditation with healing frequencies",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80",
      audioUrl: "https://cdn.pixabay.com/download/audio/2022/02/07/audio_d1718ab41b.mp3?filename=852hz-solfeggio-frequency-healing-music-22974.mp3",
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div 
        className="fixed inset-0 -z-10 bg-cover bg-center opacity-10 animate-wind scale-110 origin-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80')`
        }}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 relative">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Breathe Deep, Focus Sharp, Live Calm
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover peace and clarity through guided meditations, Sri Sri breathing techniques, and healing 852 Hz frequencies.
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl">
            Start Your Journey
          </button>
        </div>
      </section>

      {/* Featured Meditations */}
      <section className="py-12 px-4 bg-white/80 backdrop-blur-sm">
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
      <section className="py-12 px-4 bg-gradient-to-b from-white/50 to-gray-50/50 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Take a Moment to Breathe
          </h2>
          <BreathingCircle />
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 px-4 bg-white/80 backdrop-blur-sm">
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
