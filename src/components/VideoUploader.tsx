import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { uploadVideoFile } from "@/utils/videoUpload";
import { toast } from "@/hooks/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { Loader2 } from "lucide-react";

export const VideoUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const session = useSession();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast({
        title: "無效的文件類型",
        description: "請上傳視頻文件（MP4等）。",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes
    if (file.size > maxSize) {
      toast({
        title: "文件太大",
        description: "請上傳小於100MB的文件。",
        variant: "destructive",
      });
      return;
    }

    if (!session) {
      toast({
        title: "請先登入",
        description: "您需要登入才能上傳視頻。",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: "請輸入標題",
        description: "視頻標題不能為空。",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      console.log('Starting upload for file:', file.name);
      
      const { filePath, error } = await uploadVideoFile(file, title);
      
      if (error) {
        console.error('Upload error:', error);
        throw new Error(error);
      }

      if (!filePath) {
        throw new Error('No file path returned from upload');
      }

      console.log('Upload successful:', filePath);
      
      toast({
        title: "上傳成功",
        description: "視頻已成功上傳。",
      });

      // Reset form
      setTitle("");
      event.target.value = "";

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "上傳失敗",
        description: error instanceof Error ? error.message : "視頻上傳失敗，請重試。",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl">
      <div className="space-y-2">
        <Label htmlFor="title">標題</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="輸入視頻標題"
          disabled={isUploading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="video">視頻文件</Label>
        <Input
          id="video"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        <p className="text-xs text-gray-400">支持的格式：MP4等視頻文件（最大100MB）</p>
      </div>

      {isUploading && (
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};