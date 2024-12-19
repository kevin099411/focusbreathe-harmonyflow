import { Heart, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

const Testing = () => {
  return (
    <div className="container mx-auto px-4 pt-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* User Profile Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">測試用戶</h1>
          <p className="text-gray-500">與潮汐相遇的第 1 天</p>
          
          {/* Premium Banner */}
          <div className="mt-4 bg-gray-900 text-white rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">TIDE plus</h3>
              <p className="text-sm text-gray-300">新用戶 7 天免費試用</p>
            </div>
            <button className="px-4 py-2 bg-[#D4AF37] text-black rounded-full text-sm">
              開通會員
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-6 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors cursor-pointer">
            <Heart className="h-5 w-5 text-blue-400" />
            <span className="text-gray-700">我的收藏</span>
          </Card>
          <Card className="p-6 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors cursor-pointer">
            <Clock className="h-5 w-5 text-blue-400" />
            <span className="text-gray-700">最近播放</span>
          </Card>
        </div>

        {/* Today's Stats */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xl">今日</span>
            <span className="text-gray-400">></span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="text-gray-600">睡眠</h4>
              <p className="text-2xl font-bold">0<span className="text-sm font-normal"> 分鐘</span></p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-gray-600">冥想</h4>
              <p className="text-2xl font-bold">0<span className="text-sm font-normal"> 分鐘</span></p>
            </div>
            <div className="bg-pink-50 rounded-lg p-4">
              <h4 className="text-gray-600">專注</h4>
              <p className="text-2xl font-bold">0<span className="text-sm font-normal"> 分鐘</span></p>
            </div>
          </div>
        </div>

        {/* My Journey */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl">我的潮汐</h3>
            <span className="text-gray-400">></span>
          </div>
          <div className="flex justify-center items-center py-8 text-gray-500">
            開始你的潮汐之旅
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testing;