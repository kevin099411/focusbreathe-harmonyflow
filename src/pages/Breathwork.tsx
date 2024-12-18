import { BoxBreathing } from "@/components/BoxBreathing";

const Breathwork = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Box Breathing Exercise
        </h1>
        <p className="text-gray-600 text-center mb-8">
          A simple yet powerful technique to reduce stress and increase focus
        </p>
        <BoxBreathing />
      </div>
    </div>
  );
};

export default Breathwork;