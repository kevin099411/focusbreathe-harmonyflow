import { useState, useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export const VideoUpload = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // Check if file is MP4
      if (file.type !== "video/mp4") {
        toast({
          title: "Invalid file type",
          description: "Please upload an MP4 video file",
          variant: "destructive",
        });
        return;
      }

      // Check file size (limit to 100MB)
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a video smaller than 100MB",
          variant: "destructive",
        });
        return;
      }

      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      
      toast({
        title: "Success",
        description: "Video uploaded successfully",
      });
    }
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <Input
        ref={inputRef}
        type="file"
        accept="video/mp4"
        className="hidden"
        onChange={handleFileChange}
      />
      
      <Button 
        onClick={handleUploadClick}
        className="w-full"
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload MP4 Video
      </Button>

      {videoUrl && (
        <div className="mt-4">
          <video
            src={videoUrl}
            controls
            className="w-full rounded-lg shadow-lg"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};