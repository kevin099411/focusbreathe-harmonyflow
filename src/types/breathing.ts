export type BreathingPhase = "inhale" | "hold" | "exhale" | "rest";

export type BreathingPattern = {
  name: string;
  description: string;
  instructions: string[];
  inhale: number;
  hold: number;
  exhale: number;
  rest: number;
  countBreaths?: boolean;
  maxBreaths?: number;
};