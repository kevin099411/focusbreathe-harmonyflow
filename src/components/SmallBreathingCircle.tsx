import { useState, useEffect } from 'react';

interface SmallBreathingCircleProps {
  duration: number;
}

export const SmallBreathingCircle = ({ duration }: SmallBreathingCircleProps) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  useEffect(() => {
    let phaseTimer: NodeJS.Timeout;
    
    if (isActive) {
      phaseTimer = setInterval(() => {
        setPhase(prev => {
          switch (prev) {
            case 'inhale':
              return 'hold';
            case 'hold':
              return 'exhale';
            case 'exhale':
              return 'hold';
            default:
              return 'inhale';
          }
        });
      }, 4000); // Change phase every 4 seconds
    }

    return () => clearInterval(phaseTimer);
  }, [isActive]);

  const handleClick = () => {
    if (!isActive) {
      setTimeLeft(duration);
      setPhase('inhale');
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-xl font-semibold text-[#333333]">快速呼吸練習</h3>
      <button
        onClick={handleClick}
        className={`
          relative w-24 h-24 rounded-full 
          transition-all duration-1000
          flex items-center justify-center
          ${phase === 'inhale' ? 'bg-[#9b87f5]/20 scale-110' : ''}
          ${phase === 'hold' ? 'bg-[#87f5b1]/20' : ''}
          ${phase === 'exhale' ? 'bg-[#0EA5E9]/20 scale-90' : ''}
        `}
      >
        <div className="text-center">
          <div className="text-sm font-medium mb-1">
            {phase === 'inhale' && '吸氣'}
            {phase === 'hold' && '屏息'}
            {phase === 'exhale' && '呼氣'}
          </div>
          <div className="text-xs text-[#666666]">
            {timeLeft}秒
          </div>
        </div>
      </button>
      <p className="text-sm text-[#666666]">
        點擊圓圈開始
      </p>
    </div>
  );
};