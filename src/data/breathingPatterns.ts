import { BreathingPattern } from "@/types/breathing";

export const breathingPatterns: BreathingPattern[] = [
  {
    name: "4-7-8呼吸法",
    description: "這是一種放鬆技巧，通過控制呼吸來幫助身心放鬆。吸氣4秒，屏息7秒，呼氣8秒。",
    instructions: [
      "找一個舒適的坐姿，背部挺直",
      "將舌尖輕輕抵住上顎後方",
      "完全呼氣，發出嘶嘶聲",
      "閉上嘴巴，通過鼻子安靜地吸氣4秒",
      "屏住呼吸7秒",
      "通過嘴巴完全呼氣8秒，發出嘶嘶聲"
    ],
    inhale: 4,
    hold: 7,
    exhale: 8,
    rest: 1,
    audioUrl: "https://flkaxuwmvfglsbcyphrr.supabase.co/storage/v1/object/public/audio/478.mp3"
  },
  {
    name: "方框呼吸法",
    description: "在方框呼吸過程中，你需要專注於吸入和呼出的氧氣。這是一種常見的冥想技巧，可以幫助你放鬆和集中注意力。",
    instructions: [
      "挺直背部坐著，吸氣，然後試圖將肺部的所有空氣都呼出",
      "通過鼻子慢慢吸氣4秒",
      "屏住呼吸4秒",
      "通過嘴巴慢慢呼氣4秒",
      "休息4秒後重複循環"
    ],
    inhale: 4,
    hold: 4,
    exhale: 4,
    rest: 4
  }
];