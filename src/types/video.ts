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
        en: "Breathing Techniques for Stress Relief | Art of Living",
        zh: "緩解壓力的呼吸技巧 | 生活的藝術"
      },
      thumbnail: "https://img.youtube.com/vi/CQjGqtH-2YI/maxresdefault.jpg",
      youtubeId: "CQjGqtH-2YI"
    },
    {
      id: "video2",
      title: {
        en: "Guided Meditation for Inner Peace | Art of Living",
        zh: "內在平靜引導冥想 | 生活的藝術"
      },
      thumbnail: "https://img.youtube.com/vi/y1p1YCeHSiY/maxresdefault.jpg",
      youtubeId: "y1p1YCeHSiY"
    },
    {
      id: "video3",
      title: {
        en: "Morning Yoga Routine | Art of Living",
        zh: "晨間瑜伽練習 | 生活的藝術"
      },
      thumbnail: "https://img.youtube.com/vi/8TuRYV71Rgo/maxresdefault.jpg",
      youtubeId: "8TuRYV71Rgo"
    }
  ],
  [
    {
      id: "video4",
      title: {
        en: "Meditation for Better Sleep | Art of Living",
        zh: "改善睡眠的冥想練習 | 生活的藝術"
      },
      thumbnail: "https://img.youtube.com/vi/aEqlQvczMJQ/maxresdefault.jpg",
      youtubeId: "aEqlQvczMJQ"
    },
    {
      id: "video5",
      title: {
        en: "Breathing Exercise for Energy | Art of Living",
        zh: "提升能量的呼吸練習 | 生活的藝術"
      },
      thumbnail: "https://img.youtube.com/vi/v3yBqz5HF8w/maxresdefault.jpg",
      youtubeId: "v3yBqz5HF8w"
    },
    {
      id: "video6",
      title: {
        en: "5-Minute Meditation for Focus | Art of Living",
        zh: "5分鐘專注力冥想 | 生活的藝術"
      },
      thumbnail: "https://img.youtube.com/vi/inpok4MKVLM/maxresdefault.jpg",
      youtubeId: "inpok4MKVLM"
    }
  ]
];