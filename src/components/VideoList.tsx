import { useState } from "react";
import { VideoCard } from "./VideoCard";
import { VideoDialog } from "./VideoDialog";
import { UpgradePrompt } from "./UpgradePrompt";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  youtubeId: string;
}

const VIDEOS = [
  {
    id: "video1",
    title: "Sudarshan Kriya | Art of Living Breathing Technique",
    thumbnail: "https://img.youtube.com/vi/xrnwWznRcHE/maxresdefault.jpg",
    youtubeId: "xrnwWznRcHE"
  },
  {
    id: "video2",
    title: "Guided Meditation for Stress Relief | Art of Living",
    thumbnail: "https://img.youtube.com/vi/sWUmAAwbZ3s/maxresdefault.jpg",
    youtubeId: "sWUmAAwbZ3s"
  },
  {
    id: "video3",
    title: "Breathing Exercises for Anxiety | Art of Living",
    thumbnail: "https://img.youtube.com/vi/jbhdhwSZBBQ/maxresdefault.jpg",
    youtubeId: "jbhdhwSZBBQ"
  },
  {
    id: "video4",
    title: "Guided Meditation for Deep Sleep | Art of Living",
    thumbnail: "https://img.youtube.com/vi/Jyy0ra2WcQQ/maxresdefault.jpg",
    youtubeId: "Jyy0ra2WcQQ"
  },
  {
    id: "video5",
    title: "Morning Meditation for Positive Energy | Art of Living",
    thumbnail: "https://img.youtube.com/vi/d4S4twjeWTs/maxresdefault.jpg",
    youtubeId: "d4S4twjeWTs"
  }
];

export const VideoList = () => {
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

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
        {VIDEOS.map((video) => (
          <VideoCard
            key={video.id}
            {...video}
            isLocked={watchedVideos.length >= 3 && !watchedVideos.includes(video.id)}
            isWatched={watchedVideos.includes(video.id)}
            onWatch={() => handleVideoClick(video)}
          />
        ))}
        
        {watchedVideos.length >= 3 && <UpgradePrompt />}
      </div>

      <VideoDialog
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </>
  );
};
