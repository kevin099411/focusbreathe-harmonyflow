import { Card } from "./ui/card";
import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";

const timeOptions = [
  { value: 10, label: "10 mins" },
  { value: 30, label: "30 mins" },
  { value: 60, label: "1 hour" },
  { value: 120, label: "2 hours" },
];

export const TimeSelection = () => {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const session = useSession();
  const navigate = useNavigate();

  const handleTimeSelect = (value: number) => {
    if (value > 10 && (!session || !session.user)) {
      toast({
        title: "Premium Feature",
        description: "Please upgrade to access longer meditation sessions",
        variant: "destructive",
      });
      navigate("/pricing");
      return;
    }
    setSelectedTime(value);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">選擇時長</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timeOptions.map((option) => (
          <Card
            key={option.value}
            className={`p-4 cursor-pointer text-center transition-all hover:scale-105 bg-[#1a1a1a] border-gray-800 ${
              selectedTime === option.value
                ? "ring-2 ring-primary"
                : ""
            } ${option.value > 10 && (!session || !session.user) ? "opacity-50" : ""}`}
            onClick={() => handleTimeSelect(option.value)}
          >
            <span className="font-medium text-white">{option.label}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};