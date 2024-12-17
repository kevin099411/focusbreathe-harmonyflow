import { Card } from "./ui/card";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

const timeOptions = [
  { value: 20, label: "20 分鐘" },
  { value: 30, label: "30 分鐘" },
  { value: 60, label: "1 小時" },
  { value: 120, label: "2 小時" }
];

export const TimeSelection = () => {
  const [selectedTime, setSelectedTime] = useState<number>(20);

  const handleTimeSelect = (value: number) => {
    setSelectedTime(value);
  };

  return (
    <div className="space-y-2 mt-8">
      <h2 className="text-lg font-medium text-white mb-4">選擇時長</h2>
      <ScrollArea className="h-[200px] rounded-md">
        <div className="grid grid-cols-4 gap-2 p-1">
          {timeOptions.map((option) => (
            <Card
              key={option.value}
              className={`p-2 cursor-pointer text-center transition-all hover:scale-105 bg-[#1a1a1a] border-gray-800 relative ${
                selectedTime === option.value
                  ? "ring-2 ring-primary"
                  : ""
              }`}
              onClick={() => handleTimeSelect(option.value)}
            >
              <span className="text-sm font-medium text-white">{option.label}</span>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};