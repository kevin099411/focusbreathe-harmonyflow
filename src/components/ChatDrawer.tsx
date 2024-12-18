import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { GroupChat } from "./GroupChat";
import { MessageCircle } from "lucide-react";

export const ChatDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MessageCircle className="h-4 w-4" />
          群組聊天室
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>群組聊天室</DrawerTitle>
        </DrawerHeader>
        <div className="h-full px-4 pb-4">
          <GroupChat />
        </div>
      </DrawerContent>
    </Drawer>
  );
};