import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

interface PayPalButtonProps {
  amount: string;
  planTitle: string;
  hostedButtonId: string;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export const PayPalButton = ({ amount, planTitle, hostedButtonId }: PayPalButtonProps) => {
  const { toast } = useToast();
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const containerId = `paypal-container-${hostedButtonId}`;
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(`Initializing PayPal button for ${planTitle} with amount $${amount}`);
    
    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=AZwwE0pNpx1qeR_mB9Qt2TxsNT1ADDRpRl9_6fIsZ89WLaOO9UHqP5DmY51tAhs_JgOcSnhWFgQXMR5L&currency=USD`;
      script.async = true;
      script.crossOrigin = "anonymous";
      
      script.onload = () => {
        console.log('PayPal SDK loaded successfully');
        if (buttonContainerRef.current && window.paypal) {
          try {
            buttonContainerRef.current.innerHTML = '';
            
            window.paypal.Buttons({
              style: {
                layout: 'vertical',
                color: 'gold',
                shape: 'rect',
                label: 'paypal'
              },
              createOrder: (data: any, actions: any) => {
                console.log(`Creating order for ${planTitle} with amount $${amount}`);
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: amount,
                      currency_code: 'USD'
                    },
                    description: `${planTitle} Subscription`
                  }]
                });
              },
              onApprove: async (data: any, actions: any) => {
                const order = await actions.order.capture();
                console.log('Payment successful:', order);
                toast({
                  title: "Success!",
                  description: `Your payment of $${amount} for ${planTitle} has been processed successfully.`,
                });
              },
              onError: (err: any) => {
                console.error('PayPal error:', err);
                toast({
                  title: "Error",
                  description: "There was a problem processing your payment.",
                  variant: "destructive",
                });
              }
            }).render(`#${containerId}`);
            console.log('PayPal button rendered successfully');
          } catch (error) {
            console.error('Error rendering PayPal button:', error);
            toast({
              title: "Error",
              description: "Failed to render PayPal button. Please try again.",
              variant: "destructive",
            });
          }
        }
      };

      script.onerror = (error) => {
        console.error('Failed to load PayPal SDK:', error);
        toast({
          title: "Error",
          description: "Failed to load PayPal. Please try again.",
          variant: "destructive",
        });
      };

      document.body.appendChild(script);
      scriptRef.current = script;
    }

    return () => {
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
      if (buttonContainerRef.current) {
        buttonContainerRef.current.innerHTML = '';
      }
    };
  }, [amount, containerId, planTitle, toast]);

  return (
    <div id={containerId} ref={buttonContainerRef} className="w-full" />
  );
};