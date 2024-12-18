import { DurationSelector } from "../DurationSelector";
import { AudioPlayer } from "../AudioPlayer";

interface AudioControllerProps {
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
  audioUrl?: string;
  onTimerEnd: () => void;
}

export const AudioController = ({ 
  selectedDuration, 
  onDurationChange, 
  audioUrl, 
  onTimerEnd 
}: AudioControllerProps) => {
  if (!audioUrl) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-md border-t border-gray-200/20 py-2 mb-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end gap-2 max-w-6xl mx-auto">
          <DurationSelector
            duration={selectedDuration}
            onDurationChange={onDurationChange}
          />
          <AudioPlayer 
            audioUrl={audioUrl}
            duration={selectedDuration}
            onTimerEnd={onTimerEnd}
          />
        </div>
      </div>
    </div>
  );
};