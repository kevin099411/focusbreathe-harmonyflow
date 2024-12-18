import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "@supabase/auth-helpers-react";
import { Message } from "./types";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Edit2, Check } from "lucide-react";

interface MessageListProps {
  messages: Message[];
}

interface Profile {
  id: string;
  full_name: string | null;
}

export const MessageList = ({ messages }: MessageListProps) => {
  const session = useSession();
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  
  useEffect(() => {
    const fetchProfiles = async () => {
      const userIds = [...new Set(messages.map(m => m.user_id))];
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);
      
      if (error) {
        console.error('Error fetching profiles:', error);
        return;
      }

      const profileMap = data.reduce((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
      }, {} as Record<string, Profile>);
      
      setProfiles(profileMap);
    };

    fetchProfiles();
  }, [messages]);

  const handleUpdateName = async () => {
    if (!session?.user?.id || !newName.trim()) return;

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: newName.trim() })
      .eq('id', session.user.id);

    if (error) {
      console.error('Error updating name:', error);
      return;
    }

    setProfiles(prev => ({
      ...prev,
      [session.user.id]: {
        ...prev[session.user.id],
        full_name: newName.trim()
      }
    }));
    setEditingName(false);
  };

  const currentUserProfile = session?.user?.id ? profiles[session.user.id] : null;

  return (
    <ScrollArea className="flex-1 p-4">
      {session?.user?.id && (
        <div className="mb-4 p-3 bg-white rounded-lg shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">您的名稱：</span>
            {editingName ? (
              <div className="flex items-center gap-2">
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="h-8 w-40"
                  placeholder="輸入新名稱"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleUpdateName}
                  className="h-8 px-2"
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <span className="font-medium">
                {currentUserProfile?.full_name || '未設定'}
              </span>
            )}
          </div>
          {!editingName && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setNewName(currentUserProfile?.full_name || '');
                setEditingName(true);
              }}
              className="h-8 px-2"
            >
              <Edit2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.user_id === session?.user?.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] md:max-w-[70%] rounded-lg p-3 ${
                message.user_id === session?.user?.id
                  ? "bg-primary text-white"
                  : "bg-gray-100"
              }`}
            >
              <div className="text-xs opacity-70 mb-1">
                {profiles[message.user_id]?.full_name || '未知用戶'}
              </div>
              <p className="text-sm break-words">{message.content}</p>
              <span className="text-xs opacity-70">
                {new Date(message.created_at).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};