import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface VideoDialogProps {
  video: {
    title: string;
    youtubeId: string;
  } | null;
  onClose: () => void;
}

export const VideoDialog = ({ video, onClose }: VideoDialogProps) => {
  if (!video) return null;

  return (
    <Dialog open={!!video} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div className="relative pt-[56.25%] w-full">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 rounded-full bg-white/90 hover:bg-white/75"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};