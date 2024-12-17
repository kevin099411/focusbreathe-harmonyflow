import { Card } from "./ui/card";
import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

const timeOptions = [
  { value: 20, label: "20 分鐘", requiresPremium: false },
  { value: 30, label: "30 分鐘", requiresPremium: true },
  { value: 60, label: "1 小時", requiresPremium: true },
  { value: 120, label: "2 小時", requiresPremium: true }
];

export const TimeSelection = () => {
  const [selectedTime, setSelectedTime] = useState<number>(20);
  const session = useSession();
  const navigate = useNavigate();

  const handleTimeSelect = (value: number, requiresPremium: boolean) => {
    if (requiresPremium && (!session || !session.user)) {
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
    <div className="space-y-2">
      <h2 className="text-lg font-medium text-white">選擇時長</h2>
      <ScrollArea className="h-[200px] rounded-md">
        <div className="grid grid-cols-4 gap-2 p-1">
          {timeOptions.map((option) => (
            <Card
              key={option.value}
              className={`p-2 cursor-pointer text-center transition-all hover:scale-105 bg-[#1a1a1a] border-gray-800 relative ${
                selectedTime === option.value
                  ? "ring-2 ring-primary"
                  : ""
              } ${option.requiresPremium && (!session || !session.user) ? "opacity-50" : ""}`}
              onClick={() => handleTimeSelect(option.value, option.requiresPremium)}
            >
              <span className="text-sm font-medium text-white">{option.label}</span>
              {option.requiresPremium && (!session || !session.user) && (
                <Lock className="absolute top-1 right-1 h-4 w-4 text-gray-400" />
              )}
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};