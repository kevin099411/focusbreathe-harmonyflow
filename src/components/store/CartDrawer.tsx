import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { PayPalButton } from "@/components/PayPalButton";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CartDrawer() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  const handleQuantityChange = (id: string, value: string) => {
    const quantity = parseInt(value);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(id, quantity);
    }
  };

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
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-4 top-4 sm:hidden"
              onClick={() => {
                setShowCheckout(false);
                setIsOpen(false);
              }}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
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
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 border-b pb-4"
                      >
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full sm:w-16 h-32 sm:h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex-grow space-y-1">
                          <h3 className="font-medium text-sm">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            NT${parseFloat(item.price).toLocaleString()}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                              className="w-16 h-8 text-center"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive ml-2"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
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
            <div className="flex-1 p-4">
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
                
                <div className="pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">總計</span>
                    <span className="font-bold text-lg">
                      NT${total.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowCheckout(false)}
                    >
                      返回購物車
                    </Button>
                    
                    <div className="w-full">
                      <PayPalButton
                        amount={total.toString()}
                        planTitle={`購物車結帳 - ${customerName}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}