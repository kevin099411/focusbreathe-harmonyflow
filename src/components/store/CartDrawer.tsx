import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { CartItem } from "./cart/CartItem";
import { CheckoutForm } from "./cart/CheckoutForm";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleProceedToCheckout = () => {
    if (items.length > 0) {
      setShowCheckout(true);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-lg p-0 flex flex-col h-full"
      >
        <div className="p-4 border-b">
          <SheetHeader className="flex items-center">
            {showCheckout && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-4 top-4"
                onClick={() => setShowCheckout(false)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <SheetTitle className="text-center w-full">
              {showCheckout ? "結帳資訊" : "購物車"}
            </SheetTitle>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col h-full">
          {!showCheckout ? (
            <>
              <ScrollArea className="flex-1 px-4">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-300 mb-4" />
                    <p className="text-center text-muted-foreground">
                      購物車是空的
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 py-4">
                    {items.map((item) => (
                      <CartItem
                        key={item.id}
                        {...item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </div>
                )}
              </ScrollArea>
              
              {items.length > 0 && (
                <div className="border-t p-4 space-y-4 bg-white">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">總計</span>
                    <span className="font-bold text-lg">
                      NT${total.toLocaleString()}
                    </span>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={handleProceedToCheckout}
                  >
                    前往結帳
                  </Button>
                </div>
              )}
            </>
          ) : (
            <CheckoutForm
              onBack={() => setShowCheckout(false)}
              total={total}
              customerName={customerName}
              setCustomerName={setCustomerName}
              address={address}
              setAddress={setAddress}
              city={city}
              setCity={setCity}
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
              postalCode={postalCode}
              setPostalCode={setPostalCode}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}