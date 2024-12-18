import { BoxBreathing } from "@/components/BoxBreathing";

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
        <div className="bg-white rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">今日重點</h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              深呼吸能夠激活副交感神經，幫助身體放鬆
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              規律的呼吸練習可以降低壓力荷爾蒙的分泌
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              專注於呼吸可以幫助我們活在當下，增強正念
            </li>
          </ul>
        </div>
      </div>

      {/* Box Breathing Section */}
      <div className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          方箱呼吸練習
        </h2>
        <p className="text-gray-600 text-center mb-8">
          跟隨動畫指示，進行4-4-4-4呼吸法
        </p>
        <BoxBreathing />
      </div>
    </div>
  );
};

export default Breathwork;