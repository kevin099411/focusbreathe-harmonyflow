import { PricingCard } from "@/components/PricingCard";
import { Navigation } from "@/components/Navigation";

const Pricing = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
      <Navigation />
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">選擇您的正念之路</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            選擇最適合您冥想之旅的方案，解鎖獨家內容
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8 max-w-6xl mx-auto px-4 md:px-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="w-full">
              <PricingCard
                title={plan.title}
                price={plan.price}
                features={plan.features}
                isPopular={plan.isPopular}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;