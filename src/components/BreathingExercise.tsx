import { useState, useEffect, useRef } from "react";
import { BreathingGuide } from "./BreathingGuide";
import { Button } from "./ui/button";
import { Play, Pause } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type BreathingPattern = {
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  rest: number;
};

const breathingPatterns: BreathingPattern[] = [
  {
    name: "4-7-8 呼吸法",
    description: "吸氣4秒，屏息7秒，呼氣8秒。這種技巧可以幫助平靜你的身心。",
    inhale: 4,
    hold: 7,
    exhale: 8,
    rest: 2,
  },
  {
    name: "4-4-2-6 呼吸法",
    description: "吸氣4秒，屏息4秒，休息2秒，呼氣6秒。",
    inhale: 4,
    hold: 4,
    exhale: 6,
    rest: 2,
  },
  {
    name: "100呼吸正念",
    description: "通過鼻子吸氣和呼氣，從1數到100。這種練習可以幫助你集中注意力並減少分心。",
    inhale: 4,
    hold: 0,
    exhale: 4,
    rest: 2,
  },
];

export const BreathingExercise = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale");
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(breathingPatterns[0]);
  const [breathCount, setBreathCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Initialize audio
    const audio = new Audio("https://flkaxuwmvfglsbcyphrr.supabase.co/storage/v1/object/public/audio/tingsha-bell-sound-7571.mp3");
    audio.loop = false;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      return;
    }

    const runBreathingCycle = () => {
      // Reset breath count if it reaches 100 for mindfulness breathing
      if (selectedPattern.name === "100呼吸正念" && breathCount >= 100) {
        setBreathCount(0);
        setIsPlaying(false);
        toast({
          title: "練習完成",
          description: "你已經完成了100次呼吸！",
        });
        return;
      }

      // Inhale phase
      setPhase("inhale");
      audioRef.current?.play().catch(error => {
        console.error("Audio playback error:", error);
        toast({
          title: "音頻播放錯誤",
          description: "無法播放音頻，請重試。",
          variant: "destructive",
        });
      });

      timerRef.current = setTimeout(() => {
        // Hold phase
        if (selectedPattern.hold > 0) {
          setPhase("hold");
          timerRef.current = setTimeout(() => {
            // Exhale phase
            setPhase("exhale");
            timerRef.current = setTimeout(() => {
              // Rest phase
              setPhase("rest");
              if (selectedPattern.name === "100呼吸正念") {
                setBreathCount(prev => prev + 1);
              }
              timerRef.current = setTimeout(runBreathingCycle, selectedPattern.rest * 1000);
            }, selectedPattern.exhale * 1000);
          }, selectedPattern.hold * 1000);
        } else {
          // Skip hold phase for patterns without hold
          setPhase("exhale");
          timerRef.current = setTimeout(() => {
            setPhase("rest");
            if (selectedPattern.name === "100呼吸正念") {
              setBreathCount(prev => prev + 1);
            }
            timerRef.current = setTimeout(runBreathingCycle, selectedPattern.rest * 1000);
          }, selectedPattern.exhale * 1000);
        }
      }, selectedPattern.inhale * 1000);
    };

    runBreathingCycle();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, selectedPattern, breathCount]);

  const toggleExercise = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      setBreathCount(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-primary">呼吸練習</h2>
        <div className="max-w-md mx-auto">
          <Select
            value={selectedPattern.name}
            onValueChange={(value) => {
              const pattern = breathingPatterns.find(p => p.name === value);
              if (pattern) {
                setSelectedPattern(pattern);
                setIsPlaying(false);
                setBreathCount(0);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="選擇呼吸模式" />
            </SelectTrigger>
            <SelectContent>
              {breathingPatterns.map((pattern) => (
                <SelectItem key={pattern.name} value={pattern.name}>
                  {pattern.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-gray-600 mt-2">
            {selectedPattern.description}
          </p>
          {selectedPattern.name === "100呼吸正念" && (
            <p className="text-primary font-semibold mt-2">
              當前呼吸次數: {breathCount}
            </p>
          )}
        </div>
      </div>
      
      <BreathingGuide phase={phase} duration={
        phase === "inhale" ? selectedPattern.inhale :
        phase === "hold" ? selectedPattern.hold :
        phase === "exhale" ? selectedPattern.exhale :
        selectedPattern.rest
      } />
      
      <div className="flex justify-center">
        <Button
          onClick={toggleExercise}
          size="lg"
          className="gap-2"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              暫停練習
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              開始練習
            </>
          )}
        </Button>
      </div>
    </div>
  );
};