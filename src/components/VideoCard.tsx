import { Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  isLocked: boolean;
  isWatched: boolean;
  onWatch: () => void;
}

export const VideoCard = ({ id, title, thumbnail, isLocked, isWatched, onWatch }: VideoCardProps) => {
  return (
    <Card key={id} className="overflow-hidden">
      <div className="relative group cursor-pointer" onClick={onWatch}>
        <img
          src={thumbnail}
          alt={title}
          className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isLocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2 h-12">{title}</h3>
        <Button
          onClick={onWatch}
          variant={isWatched ? "secondary" : "default"}
          className="w-full"
        >
          {isWatched ? "重新觀看" : "觀看影片"}
        </Button>
      </div>
    </Card>
  );
};