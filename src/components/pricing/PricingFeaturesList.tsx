import { PricingFeature } from './PricingFeature';

export const PricingFeaturesList = () => {
  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-xl font-semibold mb-4">Plus 權益</h3>
      <div className="space-y-6">
        <PricingFeature
          icon="🎯"
          title="250+ 正念與冥想練習"
          description="專業內容團隊研發，隨時隨地平靜身心"
        />
        <PricingFeature
          icon="🌙"
          title="匠心打磨的睡眠故事"
          description="在人文、藝術和自然旅程中，開啟美好睡眠"
        />
        <PricingFeature
          icon="🎵"
          title="海量白噪音與自然聲音"
          description="社比全景聲與環繞立體聲，一秒迴歸大自然"
        />
        <PricingFeature
          icon="🎼"
          title="放鬆與專注的旋律音樂"
          description="由專業藝術家與音樂人創作的功能性音樂，開啟聲音健康革命"
        />
        <PricingFeature
          icon="⌚"
          title="全新 Apple Watch App"
          description="HRV 壓力檢測、冥想室、久坐與日落提醒..."
        />
        <PricingFeature
          icon="💤"
          title="睡眠監測與夢話脈聲記錄"
          description="基於機器學習技術打造，洞悉每夜睡眠質量"
        />
      </div>
    </div>
  );
};