import { useState, useEffect } from "react";
import { VideoCard } from "./VideoCard";
import { VideoDialog } from "./VideoDialog";
import { UpgradePrompt } from "./UpgradePrompt";
import { useLanguage } from "@/contexts/LanguageContext";

interface VideoContent {
  en: string;
  zh: string;
}

interface Video {
  id: string;
  title: VideoContent;
  thumbnail: string;
  youtubeId: string;
}

// Two sets of videos that will alternate every 12 hours
const VIDEO_SETS = [
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

export const VideoList = () => {
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const { language } = useLanguage();
  const [currentVideos, setCurrentVideos] = useState(VIDEO_SETS[0]);

  useEffect(() => {
    // Determine which video set to show based on 12-hour periods
    const hours = new Date().getHours();
    const videoSetIndex = Math.floor(hours / 12) % 2;
    setCurrentVideos(VIDEO_SETS[videoSetIndex]);

    // Update videos every 12 hours
    const interval = setInterval(() => {
      const currentHours = new Date().getHours();
      const newVideoSetIndex = Math.floor(currentHours / 12) % 2;
      setCurrentVideos(VIDEO_SETS[newVideoSetIndex]);
    }, 1000 * 60 * 60); // Check every hour

    return () => clearInterval(interval);
  }, []);

  const handleVideoClick = (video: Video) => {
    if (watchedVideos.length >= 3 && !watchedVideos.includes(video.id)) {
      window.location.href = "/pricing";
      return;
    }
    
    if (!watchedVideos.includes(video.id)) {
      setWatchedVideos([...watchedVideos, video.id]);
    }
    setSelectedVideo(video);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentVideos.map((video) => (
          <VideoCard
            key={video.id}
            {...video}
            title={video.title[language]}
            isLocked={watchedVideos.length >= 3 && !watchedVideos.includes(video.id)}
            isWatched={watchedVideos.includes(video.id)}
            onWatch={() => handleVideoClick(video)}
          />
        ))}
        
        {watchedVideos.length >= 3 && <UpgradePrompt />}
      </div>

      <VideoDialog
        video={selectedVideo ? {
          ...selectedVideo,
          title: selectedVideo.title[language]
        } : null}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  );
};