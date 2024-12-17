import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  youtubeId: string;
}

const VIDEOS = [
  {
    id: "video1",
    title: "Meditation for Inner Peace | Art of Living",
    thumbnail: "https://img.youtube.com/vi/KxwYwWoqkUY/maxresdefault.jpg",
    youtubeId: "KxwYwWoqkUY"
  },
  {
    id: "video2",
    title: "Guided Meditation for Stress Relief | Art of Living",
    thumbnail: "https://img.youtube.com/vi/0agYMXvEAAw/maxresdefault.jpg",
    youtubeId: "0agYMXvEAAw"
  },
  {
    id: "video3",
    title: "Breathing Exercises for Anxiety | Art of Living",
    thumbnail: "https://img.youtube.com/vi/CnTdWaZptHE/maxresdefault.jpg",
    youtubeId: "CnTdWaZptHE"
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
      // Redirect to pricing page for premium content
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
          <Card key={video.id} className="overflow-hidden">
            <div className="relative group cursor-pointer" onClick={() => handleVideoClick(video)}>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {watchedVideos.length >= 3 && !watchedVideos.includes(video.id) && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2 h-12">{video.title}</h3>
              <Button
                onClick={() => handleVideoClick(video)}
                variant={watchedVideos.includes(video.id) ? "secondary" : "default"}
                className="w-full"
              >
                {watchedVideos.includes(video.id) ? "重新觀看" : "觀看影片"}
              </Button>
            </div>
          </Card>
        ))}
        
        {watchedVideos.length >= 3 && (
          <div className="col-span-full text-center mt-6">
            <p className="text-gray-600 mb-4">想要觀看更多影片嗎？</p>
            <Link to="/pricing">
              <Button>升級會員</Button>
            </Link>
          </div>
        )}
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="sm:max-w-[800px] p-0">
          <div className="relative pt-[56.25%] w-full">
            {selectedVideo && (
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full bg-white/90 hover:bg-white/75"
            onClick={() => setSelectedVideo(null)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};