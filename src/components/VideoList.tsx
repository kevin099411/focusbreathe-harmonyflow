import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  youtubeId: string;
}

const VIDEOS = [
  {
    id: "video1",
    title: "【靜心冥想】20分鐘 專注呼吸 淨化心靈",
    thumbnail: "https://img.youtube.com/vi/Zk9Z0q0hPkw/maxresdefault.jpg",
    youtubeId: "Zk9Z0q0hPkw"
  },
  {
    id: "video2",
    title: "【靜心冥想】15分鐘 專注呼吸 淨化心靈",
    thumbnail: "https://img.youtube.com/vi/oBrIpUhMXnU/maxresdefault.jpg",
    youtubeId: "oBrIpUhMXnU"
  },
  {
    id: "video3",
    title: "【靜心冥想】10分鐘 專注呼吸 淨化心靈",
    thumbnail: "https://img.youtube.com/vi/Rl6lBhAWOE8/maxresdefault.jpg",
    youtubeId: "Rl6lBhAWOE8"
  },
  {
    id: "video4",
    title: "【靜心冥想】5分鐘 專注呼吸 淨化心靈",
    thumbnail: "https://img.youtube.com/vi/Rl6lBhAWOE8/maxresdefault.jpg",
    youtubeId: "Rl6lBhAWOE8"
  },
  {
    id: "video5",
    title: "【靜心冥想】3分鐘 專注呼吸 淨化心靈",
    thumbnail: "https://img.youtube.com/vi/Rl6lBhAWOE8/maxresdefault.jpg",
    youtubeId: "Rl6lBhAWOE8"
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
      {VIDEOS.map((video) => (
        <Card key={video.id} className="overflow-hidden">
          <div className="relative group">
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