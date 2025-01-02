import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PayPalButton } from "@/components/PayPalButton";
import { useEffect, useRef, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const paypalRef = useRef<HTMLDivElement>(null);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'bank'>('paypal');
  const [bankDetails, setBankDetails] = useState<any>(null);

  useEffect(() => {
    const fetchBankDetails = async () => {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching bank details:', error);
      } else {
        setBankDetails(data);
      }
    };

    fetchBankDetails();
  }, []);

  useEffect(() => {
    if (paypalRef.current && paymentMethod === 'paypal') {
      paypalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [paymentMethod]);

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4 max-w-md mx-auto">
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
        
        <div className="pt-4 space-y-4">
          <Label>付款方式</Label>
          <RadioGroup
            value={paymentMethod}
            onValueChange={(value: 'paypal' | 'bank') => setPaymentMethod(value)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal">PayPal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bank" id="bank" />
              <Label htmlFor="bank">銀行轉帳</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">總計</span>
            <span className="font-bold text-lg">
              NT${total.toLocaleString()}
            </span>
          </div>
          
          {paymentMethod === 'paypal' ? (
            <div className="w-full" ref={paypalRef}>
              <PayPalButton
                amount={total.toString()}
                planTitle={`購物車結帳 - ${customerName}`}
              />
            </div>
          ) : bankDetails && (
            <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold text-lg">銀行轉帳資訊</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">銀行名稱：</span>{bankDetails.bank_name}</p>
                <p><span className="font-medium">分行：</span>{bankDetails.branch_name}</p>
                <p><span className="font-medium">帳號：</span>{bankDetails.account_number}</p>
                <p><span className="font-medium">戶名：</span>{bankDetails.account_holder}</p>
                <p><span className="font-medium">Swift Code：</span>{bankDetails.swift_code}</p>
              </div>
              <div className="pt-2 text-sm text-gray-600">
                <p>請在完成轉帳後，將匯款收據和訂單編號寄送至我們的客服信箱。</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};