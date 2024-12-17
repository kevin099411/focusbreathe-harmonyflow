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
    // Initialize audio
    if (selectedPattern.audioUrl && !audioRef.current) {
      console.log('Initializing audio with URL:', selectedPattern.audioUrl);
      const audio = new Audio(selectedPattern.audioUrl);
      audio.loop = true;
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [selectedPattern.audioUrl]);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      return;
    }

    const runBreathingCycle = () => {
      if (selectedPattern.countBreaths && breathCount >= (selectedPattern.maxBreaths || 0)) {
        setBreathCount(0);
        setIsPlaying(false);
        if (audioRef.current) {
          audioRef.current.pause();
        }
        toast({
          title: "練習完成",
          description: `你已經完成了${selectedPattern.maxBreaths}次呼吸！`,
        });
        return;
      }

      // Start inhale phase
      console.log('Starting inhale phase');
      setPhase("inhale");
      if (audioRef.current && selectedPattern.audioUrl) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          toast({
            title: "音頻播放錯誤",
            description: "無法播放音頻指導，請檢查音量設置。",
            variant: "destructive",
          });
        });
      }

      // Schedule hold phase
      timerRef.current = setTimeout(() => {
        console.log('Starting hold phase');
        setPhase("hold");
        
        // Schedule exhale phase
        timerRef.current = setTimeout(() => {
          console.log('Starting exhale phase');
          setPhase("exhale");
          
          // Schedule rest phase
          timerRef.current = setTimeout(() => {
            console.log('Starting rest phase');
            setPhase("rest");
            if (selectedPattern.countBreaths) {
              setBreathCount(prev => prev + 1);
            }
            // Schedule next cycle
            timerRef.current = setTimeout(runBreathingCycle, selectedPattern.rest * 1000);
          }, selectedPattern.exhale * 1000);
        }, selectedPattern.hold * 1000);
      }, selectedPattern.inhale * 1000);
    };

    runBreathingCycle();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlaying, selectedPattern, breathCount]);

  const handlePatternChange = (pattern: BreathingPattern) => {
    setSelectedPattern(pattern);
    setIsPlaying(false);
    setBreathCount(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl shadow-2xl backdrop-blur-lg">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">呼吸練習</h2>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
          <BreathingPatternSelector
            patterns={breathingPatterns}
            selectedPattern={selectedPattern}
            onPatternChange={handlePatternChange}
          />
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
          <BreathingInstructions 
            pattern={selectedPattern}
            breathCount={breathCount}
          />
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl"></div>
        <BreathingGuide 
          phase={phase} 
          duration={
            phase === "inhale" ? selectedPattern.inhale :
            phase === "hold" ? selectedPattern.hold :
            phase === "exhale" ? selectedPattern.exhale :
            selectedPattern.rest
          } 
        />
      </div>
      
      <div className="flex justify-center">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          size="lg"
          className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 backdrop-blur-lg shadow-xl transform hover:scale-105 transition-all duration-300 gap-2"
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