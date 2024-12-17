import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BreathingPattern } from "@/types/breathing";

interface BreathingPatternSelectorProps {
  patterns: BreathingPattern[];
  selectedPattern: BreathingPattern;
  onPatternChange: (pattern: BreathingPattern) => void;
}

export const BreathingPatternSelector = ({
  patterns,
  selectedPattern,
  onPatternChange,
}: BreathingPatternSelectorProps) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Select
        value={selectedPattern.name}
        onValueChange={(value) => {
          const pattern = patterns.find(p => p.name === value);
          if (pattern) {
            onPatternChange(pattern);
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="選擇呼吸模式" />
        </SelectTrigger>
        <SelectContent>
          {patterns.map((pattern) => (
            <SelectItem key={pattern.name} value={pattern.name}>
              {pattern.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};