import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";

interface MessageInputProps {
  onSendMessage: (content: string) => Promise<void>;
  isLoading: boolean;
}

export const MessageInput = ({ onSendMessage, isLoading }: MessageInputProps) => {
  const session = useSession();
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    await onSendMessage(newMessage.trim());
    setNewMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="輸入訊息..."
          disabled={isLoading || !session}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !session}>
          發送
        </Button>
      </div>
    </form>
  );
};