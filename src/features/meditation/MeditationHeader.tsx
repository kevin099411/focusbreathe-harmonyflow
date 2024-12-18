import { cn } from "@/lib/utils";

interface MeditationHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const MeditationHeader = ({ title, description, className }: MeditationHeaderProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <h1 className="text-2xl md:text-4xl font-bold text-[#333333]">{title}</h1>
      {description && (
        <p className="text-gray-600">{description}</p>
      )}
    </div>
  );
};