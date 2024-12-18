import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PricingCard } from "./PricingCard";

export const RandomPricingPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    // Show popup randomly between 30-60 seconds
    const timeout = setTimeout(() => {
      console.log("Checking if pricing popup should be shown...");
      const shouldShow = Math.random() > 0.5;
      if (shouldShow) {
        console.log("Showing pricing popup");
        setIsOpen(true);
      }
    }, Math.random() * (60000 - 30000) + 30000);

    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    console.log("Closing pricing popup");
    setIsOpen(false);
  };

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
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4 text-[#0EA5E9]">
            升級您的冥想之旅
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              isPopular={plan.isPopular}
              isSelected={selectedPlan === plan.title}
              onSelect={() => setSelectedPlan(plan.title)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};