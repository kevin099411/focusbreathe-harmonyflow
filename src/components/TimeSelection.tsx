import { Card } from "./ui/card";
import { useState } from "react";

const timeOptions = [
  { value: 10, label: "10 mins" },
  { value: 20, label: "20 mins" },
  { value: 30, label: "30 mins" },
  { value: 45, label: "45 mins" },
  { value: 60, label: "1 hour" },
  { value: 120, label: "2 hours" },
  { value: 240, label: "4 hours" },
  { value: 480, label: "8 hours" },
];

export const TimeSelection = () => {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-secondary">Select Duration</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timeOptions.map((option) => (
          <Card
            key={option.value}
            className={`p-4 cursor-pointer text-center transition-all hover:scale-105 ${
              selectedTime === option.value
                ? "bg-primary/10 ring-2 ring-primary"
                : "bg-gray-50"
            }`}
            onClick={() => setSelectedTime(option.value)}
          >
            <span className="font-medium">{option.label}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};