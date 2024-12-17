import { Card } from "./ui/card";
import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";

const timeOptions = [
  { value: 20, label: "20 分鐘" },
  { value: 30, label: "30 分鐘" },
  { value: 60, label: "1 小時" },
  { value: 120, label: "2 小時" },
];

export const TimeSelection = () => {
  const [selectedTime, setSelectedTime] = useState<number>(20); // Set default to 20
  const session = useSession();
  const navigate = useNavigate();

  const handleTimeSelect = (value: number) => {
    if (value > 20 && (!session || !session.user)) {
      toast({
        title: "Premium Feature",
        description: "請升級以使用更長的冥想課程",
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
            } ${option.value > 20 && (!session || !session.user) ? "opacity-50" : ""}`}
            onClick={() => handleTimeSelect(option.value)}
          >
            <span className="font-medium text-white">{option.label}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};