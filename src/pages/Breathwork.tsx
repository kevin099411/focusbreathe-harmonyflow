import { VideoList } from "@/components/VideoList";

const Breathwork = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          每日知識
        </h1>
        <p className="text-gray-600 text-center mb-8">
          跟隨 Maggie Virgin 一起進行冥想練習，找回內在平靜
        </p>
        <VideoList />
      </div>
    </div>
  );
};

export default Breathwork;