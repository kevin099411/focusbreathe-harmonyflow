import { MeditationVideo } from "@/components/MeditationVideo";

export const MeditationVideoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
      <div className="animate-fade-in [animation-delay:200ms]">
        <MeditationVideo 
          src="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/videos/Snaptik.app_7256086520346496282.mp4?t=2024-12-18T07%3A14%3A25.545Z"
          title="寧靜靜坐"
          audioUrl="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/Snaptik.app_7256086520346496282%20(1).mp3"
        />
      </div>
      <div className="animate-fade-in [animation-delay:400ms]">
        <MeditationVideo 
          src="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/Snaptik.app_7327725062625266976.mp4"
          title="自然靜坐"
          audioUrl="https://friyvfuogjdcjjxwbqty.supabase.co/storage/v1/object/public/audio/Snaptik.app_7327725062625266976%20(1).mp3"
        />
      </div>
    </div>
  );
};