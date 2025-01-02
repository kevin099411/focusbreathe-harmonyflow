interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

export const PricingFeature = ({ icon, title, description }: FeatureProps) => (
  <div className="flex items-start space-x-4">
    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full flex-shrink-0">
      <span className="text-2xl">{icon}</span>
    </div>
    <div>
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);