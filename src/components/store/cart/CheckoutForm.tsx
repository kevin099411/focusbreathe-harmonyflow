import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PayPalButton } from "@/components/PayPalButton";
import { ArrowLeft } from "lucide-react";

interface CheckoutFormProps {
  onBack: () => void;
  total: number;
  customerName: string;
  setCustomerName: (name: string) => void;
  address: string;
  setAddress: (address: string) => void;
  city: string;
  setCity: (city: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
  postalCode: string;
  setPostalCode: (postalCode: string) => void;
}

export const CheckoutForm = ({
  onBack,
  total,
  customerName,
  setCustomerName,
  address,
  setAddress,
  city,
  setCity,
  phone,
  setPhone,
  email,
  setEmail,
  postalCode,
  setPostalCode,
}: CheckoutFormProps) => {
  return (
    <div className="flex-1 p-4">
      <div className="space-y-4">
        <Button
          variant="ghost"
          size="icon"
          className="mb-4"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">姓名</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="請輸入姓名"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">地址</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="請輸入地址"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">市區</Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="請輸入市區"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">電話</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="請輸入電話"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">郵箱</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="請輸入郵箱"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="postalCode">郵編</Label>
            <Input
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="請輸入郵編"
              className="w-full"
            />
          </div>
        </div>
        
        <div className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">總計</span>
            <span className="font-bold text-lg">
              NT${total.toLocaleString()}
            </span>
          </div>
          
          <div className="w-full">
            <PayPalButton
              amount={total.toString()}
              planTitle={`購物車結帳 - ${customerName}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};