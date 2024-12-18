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
        en: "Maggie Virgin | Deep Sleep Meditation",
        zh: "深度睡眠冥想 | Maggie Virgin"
      },
      thumbnail: "https://img.youtube.com/vi/AGGbKFUyJ0U/maxresdefault.jpg",
      youtubeId: "AGGbKFUyJ0U"
    },
    {
      id: "video2",
      title: {
        en: "Maggie Virgin | Meditation for Stress Relief",
        zh: "壓力緩解冥想 | Maggie Virgin"
      },
      thumbnail: "https://img.youtube.com/vi/qgyMc_8pp-I/maxresdefault.jpg",
      youtubeId: "qgyMc_8pp-I"
    },
    {
      id: "video3",
      title: {
        en: "Maggie Virgin | Guided Meditation for Inner Peace",
        zh: "內在平靜引導冥想 | Maggie Virgin"
      },
      thumbnail: "https://img.youtube.com/vi/AwO-BP01umk/maxresdefault.jpg",
      youtubeId: "AwO-BP01umk"
    }
  ],
  // Second set is identical to ensure videos never change
  [
    {
      id: "video1",
      title: {
        en: "Maggie Virgin | Deep Sleep Meditation",
        zh: "深度睡眠冥想 | Maggie Virgin"
      },
      thumbnail: "https://img.youtube.com/vi/AGGbKFUyJ0U/maxresdefault.jpg",
      youtubeId: "AGGbKFUyJ0U"
    },
    {
      id: "video2",
      title: {
        en: "Maggie Virgin | Meditation for Stress Relief",
        zh: "壓力緩解冥想 | Maggie Virgin"
      },
      thumbnail: "https://img.youtube.com/vi/qgyMc_8pp-I/maxresdefault.jpg",
      youtubeId: "qgyMc_8pp-I"
    },
    {
      id: "video3",
      title: {
        en: "Maggie Virgin | Guided Meditation for Inner Peace",
        zh: "內在平靜引導冥想 | Maggie Virgin"
      },
      thumbnail: "https://img.youtube.com/vi/AwO-BP01umk/maxresdefault.jpg",
      youtubeId: "AwO-BP01umk"
    }
  ]
];