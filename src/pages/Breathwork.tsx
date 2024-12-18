import { VideoList } from "@/components/VideoList";

const Breathwork = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary mb-4 text-center tracking-tight">
          每日知識
        </h1>
        <p className="text-xl text-gray-800 font-medium text-center mb-12 leading-relaxed">
          跟隨 Maggie Virgin 一起進行冥想練習，找回內在平靜
        </p>
        <VideoList />
      </div>
    </div>
  );
};

export default Breathwork;