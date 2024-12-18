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
      thumbnail: "https://img.youtube.com/vi/ztTexqGQ0VI/maxresdefault.jpg",
      youtubeId: "ztTexqGQ0VI"
    },
    {
      id: "video2",
      title: {
        en: "Maggie Virgin | 10 Min Morning Meditation",
        zh: "10分鐘晨間冥想 | Maggie Virgin"
      },
      thumbnail: "https://img.youtube.com/vi/ENYYb5vIMkU/maxresdefault.jpg",
      youtubeId: "ENYYb5vIMkU"
    },
    {
      id: "video3",
      title: {
        en: "Maggie Virgin | Sleep Meditation Music",
        zh: "睡眠冥想音樂 | Maggie Virgin"
      },
      thumbnail: "https://img.youtube.com/vi/DqBC3K_SgkM/maxresdefault.jpg",
      youtubeId: "DqBC3K_SgkM"
    }
  ],
  [
    {
      id: "video4",
      title: {
        en: "Maggie Virgin | Meditation for Inner Peace",
        zh: "內在平靜冥想 | Maggie Virgin"
      },
      thumbnail: "https://img.youtube.com/vi/d4S4twjeWTs/maxresdefault.jpg",
      youtubeId: "d4S4twjeWTs"
    },
    {
      id: "video5",
      title: {
        en: "Maggie Virgin | Healing Meditation Music",
        zh: "療癒冥想音樂 | Maggie Virgin"
      },
      thumbnail: "https://img.youtube.com/vi/Zk7Oc5GlNr4/maxresdefault.jpg",
      youtubeId: "Zk7Oc5GlNr4"
    },
    {
      id: "video6",
      title: {
        en: "Maggie Virgin | Deep Sleep Music",
        zh: "深度睡眠音樂 | Maggie Virgin"
      },
      thumbnail: "https://img.youtube.com/vi/1ZYbU82GVz4/maxresdefault.jpg",
      youtubeId: "1ZYbU82GVz4"
    }
  ]
];