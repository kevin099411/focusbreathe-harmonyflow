import { useState } from "react";
import { PricingCard } from "@/components/PricingCard";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const pricingPlans = [
    {
      title: "基礎冥想",
      price: "9.99",
      features: [
        "5個引導冥想",
        "基礎呼吸練習",
        "每日正念提示",
        "社區論壇訪問",
      ]
    },
    {
      title: "高級禪修",
      price: "19.99",
      features: [
        "20個引導冥想",
        "進階呼吸技巧",
        "個人冥想追蹤",
        "每週直播課程",
        "高級冥想指南"
      ],
      isPopular: true
    },
    {
      title: "大師套餐",
      price: "49.99",
      features: [
        "無限制引導冥想",
        "一對一冥想指導",
        "定制冥想計劃",
        "優先支持",
        "完整冥想庫",
        "獨家工作坊"
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex justify-between items-center mb-6 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-[#0EA5E9]">選擇方案</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-2 md:px-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="w-full">
              <PricingCard
                title={plan.title}
                price={plan.price}
                features={plan.features}
                isPopular={plan.isPopular}
                isSelected={selectedPlan === plan.title}
                onSelect={() => setSelectedPlan(plan.title)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;