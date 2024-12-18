import { VideoCard } from "./VideoCard";
import { VideoDialog } from "./VideoDialog";
import { UpgradePrompt } from "./UpgradePrompt";
import { useLanguage } from "@/contexts/LanguageContext";
import { useVideoSet } from "@/hooks/useVideoSet";
import { useWatchedVideos } from "@/hooks/useWatchedVideos";

export const VideoList = () => {
  const { language } = useLanguage();
  const currentVideos = useVideoSet();
  const { watchedVideos, selectedVideo, setSelectedVideo, handleVideoClick } = useWatchedVideos();

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