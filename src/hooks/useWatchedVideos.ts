import { useState } from 'react';
import { Video } from '@/types/video';

export const useWatchedVideos = () => {
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

  return {
    watchedVideos,
    selectedVideo,
    setSelectedVideo,
    handleVideoClick
  };
};