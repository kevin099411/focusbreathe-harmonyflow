import { Navigation } from "@/components/Navigation";
import { MeditationCard } from "@/components/MeditationCard";
import { BreathingCircle } from "@/components/BreathingCircle";

const Index = () => {
  const featuredMeditations = [
    {
      title: "Focus Reset in 5 Minutes",
      duration: "1 min",
      description: "Quick meditation with 852 Hz frequency for mental clarity",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80",
      audioUrl: "https://flkaxuwmvfglsbcyphrr.supabase.co/storage/v1/object/public/audio/852hz.mp3",
    },
    {
      title: "Mindfulness for Racing Thoughts",
      duration: "1 min",
      description: "Guided session to calm an overactive mind",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80",
      audioUrl: "https://flkaxuwmvfglsbcyphrr.supabase.co/storage/v1/object/public/audio/relax%20forrest%20music.mp3",
    },
    {
      title: "Energy Boost with 852 Hz",
      duration: "1 min",
      description: "Energizing meditation with healing frequencies",
      image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80",
      audioUrl: "https://flkaxuwmvfglsbcyphrr.supabase.co/storage/v1/object/public/audio/852hz.mp3",
    },
  ];

  const sriSriBreathingTechniques = [
    {
      name: "Bhastrika Pranayama",
      description: "Energizing breath technique that increases prana in the body",
      steps: ["Sit comfortably", "Take deep breaths", "Forcefully exhale", "Repeat 20 times"],
    },
    {
      name: "Nadi Shodhan Pranayama",
      description: "Alternate nostril breathing for mental clarity and balance",
      steps: ["Close right nostril", "Inhale left", "Close left nostril", "Exhale right"],
    },
    {
      name: "Ujjayi Breath",
      description: "Ocean breath that calms the nervous system",
      steps: ["Constrict throat", "Breathe deeply", "Create ocean sound", "Maintain rhythm"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-blue-50">
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
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Experience the Power of Sri Sri Breathing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your life through ancient breathing techniques, guided meditations, and healing frequencies.
          </p>
          <button className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl">
            Begin Your Journey
          </button>
        </div>
      </section>

      {/* Sri Sri Breathing Techniques */}
      <section className="py-12 px-4 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-secondary mb-8 text-center">
            Sri Sri Breathing Techniques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sriSriBreathingTechniques.map((technique, index) => (
              <div 
                key={index}
                className="p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow border border-orange-100"
              >
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {technique.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {technique.description}
                </p>
                <ul className="space-y-2">
                  {technique.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-center text-gray-700">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-primary flex items-center justify-center mr-2 text-sm">
                        {stepIndex + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breathing Exercise */}
      <section className="py-12 px-4 bg-gradient-to-b from-white/50 to-gray-50/50 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-secondary mb-8">
            Practice Mindful Breathing
          </h2>
          <BreathingCircle />
        </div>
      </section>

      {/* Featured Meditations */}
      <section className="py-12 px-4 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-secondary mb-8 text-center">
            Featured Meditations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredMeditations.map((meditation, index) => (
              <MeditationCard key={index} {...meditation} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;