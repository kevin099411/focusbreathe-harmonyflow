import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { MessageList } from "./chat/MessageList";
import { MessageInput } from "./chat/MessageInput";
import { Message } from "./chat/types";

export const GroupChat = () => {
  const session = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
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

  const handleSendMessage = async (content: string) => {
    if (!session) {
      toast({
        title: "請先登入",
        description: "您需要登入才能發送訊息",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log("Sending message...");
      const { error } = await supabase.from("messages").insert([
        {
          content,
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
    <div className="flex flex-col h-[600px] md:h-[700px] bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">群組聊天室</h2>
        <p className="text-sm text-gray-500">分享您的想法和經驗</p>
      </div>

      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};