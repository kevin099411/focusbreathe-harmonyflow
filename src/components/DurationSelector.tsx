import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface DurationSelectorProps {
  duration: number;
  onDurationChange: (duration: number) => void;
}

export const DurationSelector = ({ duration, onDurationChange }: DurationSelectorProps) => {
  return (
    <Select
      value={duration.toString()}
      onValueChange={(value) => onDurationChange(parseInt(value))}
    >
      <SelectTrigger className="w-[80px] md:w-[100px] bg-gray-900/50 text-white border-gray-700 text-sm md:text-base">
        <SelectValue placeholder="Duration" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5 mins</SelectItem>
        <SelectItem value="10">10 mins</SelectItem>
        <SelectItem value="20">20 mins</SelectItem>
        <SelectItem value="30">30 mins</SelectItem>
      </SelectContent>
    </Select>
  );
};