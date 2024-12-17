export const BreathingCircle = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-primary/20 animate-breathe" />
        <div className="absolute inset-0 flex items-center justify-center text-primary font-medium">
          Breathe
        </div>
      </div>
      <p className="mt-4 text-gray-600 text-center">
        Follow the circle's rhythm for deep, calming breaths
      </p>
    </div>
  );
};