import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const VIDEOS = [
  {
    id: "video1",
    title: "禪修冥想的藝術",
    thumbnail: "https://img.youtube.com/vi/YOUTUBE_ID_1/maxresdefault.jpg"
  },
  {
    id: "video2",
    title: "正念生活指南",
    thumbnail: "https://img.youtube.com/vi/YOUTUBE_ID_2/maxresdefault.jpg"
  },
  {
    id: "video3",
    title: "心靈淨化之旅",
    thumbnail: "https://img.youtube.com/vi/YOUTUBE_ID_3/maxresdefault.jpg"
  },
  {
    id: "video4",
    title: "深層冥想技巧",
    thumbnail: "https://img.youtube.com/vi/YOUTUBE_ID_4/maxresdefault.jpg"
  },
  {
    id: "video5",
    title: "靈性覺醒之路",
    thumbnail: "https://img.youtube.com/vi/YOUTUBE_ID_5/maxresdefault.jpg"
  }
];

export const VideoList = () => {
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);

  const handleVideoClick = (videoId: string) => {
    if (watchedVideos.length >= 3 && !watchedVideos.includes(videoId)) {
      // Redirect to pricing page for premium content
      window.location.href = "/pricing";
      return;
    }
    
    if (!watchedVideos.includes(videoId)) {
      setWatchedVideos([...watchedVideos, videoId]);
    }
    // TODO: Open video player
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {VIDEOS.map((video, index) => (
        <Card key={video.id} className="overflow-hidden">
          <div className="relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full aspect-video object-cover"
            />
            {watchedVideos.length >= 3 && !watchedVideos.includes(video.id) && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">{video.title}</h3>
            <Button
              onClick={() => handleVideoClick(video.id)}
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
  );
};