import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
}

export const GroupChat = () => {
  const session = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log("Fetching messages...");
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(50);

        if (error) {
          console.error("Error fetching messages:", error);
          toast({
            title: "錯誤",
            description: "無法載入訊息",
            variant: "destructive",
          });
          return;
        }

        console.log("Messages fetched successfully:", data);
        setMessages(data.reverse());
      } catch (error) {
        console.error("Error in fetchMessages:", error);
        toast({
          title: "錯誤",
          description: "無法載入訊息",
          variant: "destructive",
        });
      }
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          console.log("New message received:", payload);
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      console.log("Cleaning up subscription");
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast({
        title: "請先登入",
        description: "您需要登入才能發送訊息",
        variant: "destructive",
      });
      return;
    }

    if (!newMessage.trim()) return;

    setIsLoading(true);
    try {
      console.log("Sending message...");
      const { error } = await supabase.from("messages").insert([
        {
          content: newMessage.trim(),
          user_id: session.user.id,
        },
      ]);

      if (error) {
        console.error("Error sending message:", error);
        toast({
          title: "錯誤",
          description: "無法發送訊息",
          variant: "destructive",
        });
      } else {
        console.log("Message sent successfully");
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast({
        title: "錯誤",
        description: "無法發送訊息",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">群組聊天室</h2>
        <p className="text-sm text-gray-500">分享您的想法和經驗</p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.user_id === session?.user?.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.user_id === session?.user?.id
                    ? "bg-primary text-white"
                    : "bg-gray-100"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70">
                  {new Date(message.created_at).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="輸入訊息..."
            disabled={isLoading || !session}
          />
          <Button type="submit" disabled={isLoading || !session}>
            發送
          </Button>
        </div>
      </form>
    </div>
  );
};