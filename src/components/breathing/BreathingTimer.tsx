interface BreathingTimerProps {
  timeRemaining: number;
  textColor: string;
  phaseText: string;
}

export const BreathingTimer = ({ timeRemaining, textColor, phaseText }: BreathingTimerProps) => {
  return (
    <div className="text-center">
      <p className={`text-2xl font-semibold transition-colors duration-300 ${textColor}`}>
        {phaseText}
      </p>
      <p className="text-lg text-[#8E9196]">{timeRemaining}</p>
    </div>
  );
};