export interface VideoContent {
  en: string;
  zh: string;
}

export interface Video {
  id: string;
  title: VideoContent;
  thumbnail: string;
  youtubeId: string;
}

export const VIDEO_SETS: Video[][] = [
  [
    {
      id: "video1",
      title: {
        en: "Maggie Virgin | Meditation for Anxiety & Stress Relief",
        zh: "冥想紓解焦慮和壓力 | Maggie Virgin"
      },
      thumbnail: "https://img.youtube.com/vi/5X7YIhQDKq8/maxresdefault.jpg",
      youtubeId: "5X7YIhQDKq8"
    },
    {
      id: "video2",
      title: {
        en: "Maggie Virgin | Guided Meditation for Inner Peace",
        zh: "內在平靜引導冥想 | Maggie Virgin"
      },
      thumbnail: "https://img.youtube.com/vi/AwO-BP01umk/maxresdefault.jpg",
      youtubeId: "AwO-BP01umk"
    },
    {
      id: "video3",
      title: {
        en: "Maggie Virgin | Deep Sleep Meditation",
        zh: "深度睡眠冥想 | Maggie Virgin"
      },
      thumbnail: "https://img.youtube.com/vi/AGGbKFUyJ0U/maxresdefault.jpg",
      youtubeId: "AGGbKFUyJ0U"
    }
  ],
  [
    {
      id: "video4",
      title: {
        en: "Maggie Virgin | Meditation for Stress & Anxiety Relief",
        zh: "壓力和焦慮緩解冥想 | Maggie Virgin"
      },
      thumbnail: "https://img.youtube.com/vi/qRZGxQOAu80/maxresdefault.jpg",
      youtubeId: "qRZGxQOAu80"
    }
  ]
];