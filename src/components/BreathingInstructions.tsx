import { BreathingPattern } from "@/types/breathing";

interface BreathingInstructionsProps {
  pattern: BreathingPattern;
  breathCount?: number;
}

export const BreathingInstructions = ({ pattern, breathCount }: BreathingInstructionsProps) => {
  if (!pattern) {
    return null;
  }

  return (
    <div className="space-y-4 text-white">
      <div className="space-y-2">
        <p className="text-lg text-white/90">{pattern.description}</p>
        {pattern.countBreaths && (
          <p className="text-white font-semibold">
            當前呼吸次數: {breathCount} / {pattern.maxBreaths}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">練習步驟：</h3>
        <ul className="list-disc list-inside space-y-2">
          {pattern.instructions?.map((instruction, index) => (
            <li key={index} className="text-white/90">
              {instruction}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};