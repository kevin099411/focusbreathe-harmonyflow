import { BreathingPattern } from "@/types/breathing";

export const breathingPatterns: BreathingPattern[] = [
  {
    name: "4-7-8 呼吸法",
    description: "由Dr. Andrew Weil開發的這種技巧是古老瑜伽技巧的變體，可以幫助人們放鬆並補充體內氧氣。每個階段都會有定沙鈴聲提示。",
    instructions: [
      "聽到定沙鈴聲時，通過鼻子無聲地吸氣4秒",
      "聽到第二聲定沙鈴時，屏住呼吸7秒",
      "聽到第三聲定沙鈴時，通過嘴巴呼氣8秒，發出呼氣聲",
      "重複這個循環"
    ],
    inhale: 4,
    hold: 7,
    exhale: 8,
    rest: 1
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