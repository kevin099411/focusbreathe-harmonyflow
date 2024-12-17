import { useState, useEffect, useRef } from "react";
import { BreathingGuide } from "./BreathingGuide";
import { Button } from "./ui/button";
import { Play, Pause } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const BreathingExercise = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Initialize audio
    const audio = new Audio("https://flkaxuwmvfglsbcyphrr.supabase.co/storage/v1/object/public/audio/10%20Minute%20Crystal%20Singing%20Bowl%20Meditation%20_%20Sound%20Healing%20For%20Relaxation%20&%20Stress%20Relief.m4a");
    audio.loop = true;
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
      audioRef.current?.pause();
      return;
    }

    const runBreathingCycle = () => {
      // Inhale phase (4 seconds)
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
        // Hold phase (7 seconds)
        setPhase("hold");
        
        timerRef.current = setTimeout(() => {
          // Exhale phase (8 seconds)
          setPhase("exhale");
          
          timerRef.current = setTimeout(() => {
            // Rest phase (2 seconds)
            setPhase("rest");
            
            timerRef.current = setTimeout(runBreathingCycle, 2000);
          }, 8000);
        }, 7000);
      }, 4000);
    };

    runBreathingCycle();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying]);

  const toggleExercise = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-primary">呼吸練習</h2>
        <p className="text-gray-600">
          4-7-8 呼吸法：吸氣4秒，屏息7秒，呼氣8秒
        </p>
      </div>
      
      <BreathingGuide phase={phase} duration={4} />
      
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