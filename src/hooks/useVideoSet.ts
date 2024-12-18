import { useState, useEffect } from 'react';
import { Video, VIDEO_SETS } from '@/types/video';

export const useVideoSet = () => {
  const [currentVideos, setCurrentVideos] = useState<Video[]>(VIDEO_SETS[0]);

  useEffect(() => {
    // Determine which video set to show based on 12-hour periods
    const updateVideoSet = () => {
      const hours = new Date().getHours();
      const videoSetIndex = Math.floor(hours / 12) % 2;
      setCurrentVideos(VIDEO_SETS[videoSetIndex]);
    };

    updateVideoSet();

    // Update videos every hour
    const interval = setInterval(updateVideoSet, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  return currentVideos;
};