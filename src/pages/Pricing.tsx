import { useState } from "react";
import { PayPalButton } from "@/components/PayPalButton";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">會員中心</h1>
        
        {/* Premium Banner */}
        <div className="bg-[#FDF6E9] p-4 rounded-lg mb-8 text-center">
          <p className="text-lg">開通潮汐 Plus，享更多權益</p>
        </div>

        {/* Pricing Cards */}
        <div className="space-y-4">
          {/* Monthly Plan */}
          <div className={`bg-white rounded-xl p-6 ${selectedPlan === 'monthly' ? 'border-2 border-[#D4AF37]' : 'border border-gray-200'}`}
               onClick={() => handlePlanSelect('monthly')}>
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="bg-[#D4AF37] text-white text-xs px-2 py-1 rounded-full">最受歡迎</span>
                <h3 className="text-lg font-semibold mt-2">連續包月</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$220</p>
                <p className="text-sm text-gray-500">/月</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">次月 $220 自動續訂，可隨時取消</p>
            {selectedPlan === 'monthly' && (
              <div className="mt-4">
                <PayPalButton amount="220" planTitle="Monthly Subscription" />
              </div>
            )}
          </div>

          {/* Yearly Plan */}
          <div className={`bg-white rounded-xl p-6 ${selectedPlan === 'yearly' ? 'border-2 border-[#D4AF37]' : 'border border-gray-200'}`}
               onClick={() => handlePlanSelect('yearly')}>
            <div className="flex justify-between items-center mb-2">
              <div>
                <span className="bg-[#F3F4F6] text-gray-600 text-xs px-2 py-1 rounded-full">免費試用</span>
                <h3 className="text-lg font-semibold mt-2">連續包年</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$1,190</p>
                <p className="text-sm text-gray-500">/年</p>
              </div>
            </div>
            {selectedPlan === 'yearly' && (
              <div className="mt-4">
                <PayPalButton amount="1190" planTitle="Yearly Subscription" />
              </div>
            )}
          </div>
        </div>

        {/* Features List */}
        <div className="mt-8 space-y-4">
          <h3 className="text-xl font-semibold mb-4">Plus 權益</h3>
          <div className="space-y-6">
            <Feature
              icon="🎯"
              title="250+ 正念與冥想練習"
              description="專業內容團隊研發，隨時隨地平靜身心"
            />
            <Feature
              icon="🌙"
              title="匠心打磨的睡眠故事"
              description="在人文、藝術和自然旅程中，開啟美好睡眠"
            />
            <Feature
              icon="🎵"
              title="海量白噪音與自然聲音"
              description="社比全景聲與環繞立體聲，一秒迴歸大自然"
            />
            <Feature
              icon="🎼"
              title="放鬆與專注的旋律音樂"
              description="由專業藝術家與音樂人創作的功能性音樂，開啟聲音健康革命"
            />
            <Feature
              icon="⌚"
              title="全新 Apple Watch App"
              description="HRV 壓力檢測、冥想室、久坐與日落提醒..."
            />
            <Feature
              icon="💤"
              title="睡眠監測與夢話脈聲記錄"
              description="基於機器學習技術打造，洞悉每夜睡眠質量"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <div className="flex items-start space-x-4">
    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full flex-shrink-0">
      <span className="text-2xl">{icon}</span>
    </div>
    <div>
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

export default Pricing;