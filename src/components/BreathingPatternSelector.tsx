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
        <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
          <SelectValue placeholder="選擇呼吸模式" />
        </SelectTrigger>
        <SelectContent className="bg-orange-500/90 backdrop-blur-lg border-white/20">
          {patterns.map((pattern) => (
            <SelectItem 
              key={pattern.name} 
              value={pattern.name}
              className="text-white hover:bg-white/20"
            >
              {pattern.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};