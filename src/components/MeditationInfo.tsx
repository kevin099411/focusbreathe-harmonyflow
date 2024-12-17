interface MeditationInfoProps {
  title: string;
  duration: string;
  description: string;
}

export const MeditationInfo = ({ title, duration, description }: MeditationInfoProps) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <span className="text-sm text-gray-500">{duration}</span>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
  </div>
);