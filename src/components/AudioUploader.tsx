import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { uploadAudioFile } from "@/utils/audioUpload";
import { toast } from "@/hooks/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { Loader2 } from "lucide-react";

export const AudioUploader = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const session = useSession();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!session) {
      toast({
        title: "請先登入",
        description: "您需要登入才能上傳音頻。",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);
      const { filePath, error } = await uploadAudioFile(file, title);
      
      if (error) {
        throw new Error(error);
      }

      toast({
        title: "上傳成功",
        description: "音頻已成功上傳。",
      });

      // Reset form
      setTitle("");
      event.target.value = "";

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "上傳失敗",
        description: error instanceof Error ? error.message : "音頻上傳失敗，請重試。",
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
          placeholder="輸入音頻標題"
          disabled={isUploading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="audio">音頻文件</Label>
        <Input
          id="audio"
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          disabled={isUploading}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
      </div>

      {isUploading && (
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};