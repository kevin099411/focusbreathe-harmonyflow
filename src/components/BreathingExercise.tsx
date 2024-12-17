import { useState, useEffect, useRef } from "react";
import { BreathingGuide } from "./BreathingGuide";
import { Button } from "./ui/button";
import { Play, Pause } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { BreathingPatternSelector } from "./BreathingPatternSelector";
import { BreathingInstructions } from "./BreathingInstructions";
import { breathingPatterns } from "@/data/breathingPatterns";
import { BreathingPattern, BreathingPhase } from "@/types/breathing";

export const BreathingExercise = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<BreathingPhase>("inhale");
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(breathingPatterns[0]);
  const [breathCount, setBreathCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
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
      if (selectedPattern.countBreaths && breathCount >= (selectedPattern.maxBreaths || 0)) {
        setBreathCount(0);
        setIsPlaying(false);
        toast({
          title: "練習完成",
          description: `你已經完成了${selectedPattern.maxBreaths}次呼吸！`,
        });
        return;
      }

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
        if (selectedPattern.hold > 0) {
          setPhase("hold");
          timerRef.current = setTimeout(() => {
            setPhase("exhale");
            timerRef.current = setTimeout(() => {
              setPhase("rest");
              if (selectedPattern.countBreaths) {
                setBreathCount(prev => prev + 1);
              }
              timerRef.current = setTimeout(runBreathingCycle, selectedPattern.rest * 1000);
            }, selectedPattern.exhale * 1000);
          }, selectedPattern.hold * 1000);
        } else {
          setPhase("exhale");
          timerRef.current = setTimeout(() => {
            setPhase("rest");
            if (selectedPattern.countBreaths) {
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

  const handlePatternChange = (pattern: BreathingPattern) => {
    setSelectedPattern(pattern);
    setIsPlaying(false);
    setBreathCount(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-primary">呼吸練習</h2>
        <BreathingPatternSelector
          patterns={breathingPatterns}
          selectedPattern={selectedPattern}
          onPatternChange={handlePatternChange}
        />
        <BreathingInstructions 
          pattern={selectedPattern}
          breathCount={breathCount}
        />
      </div>
      
      <BreathingGuide 
        phase={phase} 
        duration={
          phase === "inhale" ? selectedPattern.inhale :
          phase === "hold" ? selectedPattern.hold :
          phase === "exhale" ? selectedPattern.exhale :
          selectedPattern.rest
        } 
      />
      
      <div className="flex justify-center">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
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