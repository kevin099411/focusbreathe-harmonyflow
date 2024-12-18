import { VideoList } from "@/components/VideoList";

const Breathwork = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Daily Knowledge Section */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          每日知識
        </h1>
        <p className="text-gray-600 text-center mb-8">
          透過呼吸練習，讓身心達到平衡
        </p>
        <VideoList />
      </div>
    </div>
  );
};

export default Breathwork;