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

// Two sets of videos that will alternate daily
const VIDEO_SETS = [
  [
    {
      id: "video1",
      title: {
        en: "Sudarshan Kriya | Art of Living Breathing Technique",
        zh: "苏达扬克里亚 | 生活的艺术呼吸技巧"
      },
      thumbnail: "https://img.youtube.com/vi/xrnwWznRcHE/maxresdefault.jpg",
      youtubeId: "xrnwWznRcHE"
    },
    {
      id: "video2",
      title: {
        en: "Guided Meditation for Stress Relief | Art of Living",
        zh: "缓解压力的引导冥想 | 生活的艺术"
      },
      thumbnail: "https://img.youtube.com/vi/sWUmAAwbZ3s/maxresdefault.jpg",
      youtubeId: "sWUmAAwbZ3s"
    },
    {
      id: "video3",
      title: {
        en: "Breathing Exercises for Anxiety | Art of Living",
        zh: "焦虑缓解呼吸练习 | 生活的艺术"
      },
      thumbnail: "https://img.youtube.com/vi/jbhdhwSZBBQ/maxresdefault.jpg",
      youtubeId: "jbhdhwSZBBQ"
    },
    {
      id: "video4",
      title: {
        en: "Guided Meditation for Deep Sleep | Art of Living",
        zh: "深度睡眠引导冥想 | 生活的艺术"
      },
      thumbnail: "https://img.youtube.com/vi/Jyy0ra2WcQQ/maxresdefault.jpg",
      youtubeId: "Jyy0ra2WcQQ"
    },
    {
      id: "video5",
      title: {
        en: "Morning Meditation for Positive Energy | Art of Living",
        zh: "晨间正能量冥想 | 生活的艺术"
      },
      thumbnail: "https://img.youtube.com/vi/d4S4twjeWTs/maxresdefault.jpg",
      youtubeId: "d4S4twjeWTs"
    }
  ],
  // Alternative set of videos for the next day
  [
    {
      id: "video1_alt",
      title: {
        en: "Yoga for Beginners | Art of Living",
        zh: "瑜伽初学者指南 | 生活的艺术"
      },
      thumbnail: "https://img.youtube.com/vi/VaoV1PrYft4/maxresdefault.jpg",
      youtubeId: "VaoV1PrYft4"
    },
    {
      id: "video2_alt",
      title: {
        en: "Evening Relaxation Meditation | Art of Living",
        zh: "傍晚放松冥想 | 生活的艺术"
      },
      thumbnail: "https://img.youtube.com/vi/4Gf7z7rDVXE/maxresdefault.jpg",
      youtubeId: "4Gf7z7rDVXE"
    },
    {
      id: "video3_alt",
      title: {
        en: "Mindfulness Practice | Art of Living",
        zh: "正念练习 | 生活的艺术"
      },
      thumbnail: "https://img.youtube.com/vi/6p_yaNFSYao/maxresdefault.jpg",
      youtubeId: "6p_yaNFSYao"
    },
    {
      id: "video4_alt",
      title: {
        en: "Stress Management Techniques | Art of Living",
        zh: "压力管理技巧 | 生活的艺术"
      },
      thumbnail: "https://img.youtube.com/vi/sTANio_2E0Q/maxresdefault.jpg",
      youtubeId: "sTANio_2E0Q"
    },
    {
      id: "video5_alt",
      title: {
        en: "Breathing for Energy | Art of Living",
        zh: "能量呼吸法 | 生活的艺术"
      },
      thumbnail: "https://img.youtube.com/vi/K-0mB8YnNIg/maxresdefault.jpg",
      youtubeId: "K-0mB8YnNIg"
    }
  ]
];

export const VideoList = () => {
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const { language } = useLanguage();
  const [currentVideos, setCurrentVideos] = useState(VIDEO_SETS[0]);

  useEffect(() => {
    // Determine which video set to show based on the day
    const dayOfYear = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / (24 * 60 * 60 * 1000));
    const videoSetIndex = dayOfYear % 2;
    setCurrentVideos(VIDEO_SETS[videoSetIndex]);
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