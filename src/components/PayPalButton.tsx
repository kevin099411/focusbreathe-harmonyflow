import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

interface PayPalButtonProps {
  amount: string;
  planTitle: string;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

export const PayPalButton = ({ amount, planTitle }: PayPalButtonProps) => {
  const { toast } = useToast();
  const paypalRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    console.log(`Initializing PayPal button for ${planTitle} with amount $${amount}`);

    const loadPayPalScript = () => {
      if (scriptLoaded.current) {
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=AZwwE0pNpx1qeR_mB9Qt2TxsNT1ADDRpRl9_6fIsZ89WLaOO9UHqP5DmY51tAhs_JgOcSnhWFgQXMR5L&currency=USD`;
        script.async = true;
        
        // Add crossorigin attribute to handle CORS issues
        script.crossOrigin = "anonymous";
        
        script.onload = () => {
          scriptLoaded.current = true;
          // Add a small delay to ensure PayPal is fully initialized
          setTimeout(resolve, 100);
        };
        
        script.onerror = (err) => {
          console.error('Failed to load PayPal SDK:', err);
          reject(err);
        };
        
        document.body.appendChild(script);
      });
    };

    const renderPayPalButton = async () => {
      if (!paypalRef.current || !window.paypal) {
        console.error('PayPal container or SDK not available');
        return;
      }

      try {
        paypalRef.current.innerHTML = '';
        
        // Check if Buttons API is available
        if (typeof window.paypal.Buttons !== 'function') {
          throw new Error('PayPal Buttons API not available');
        }
        
        await window.paypal.Buttons({
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
        }).render(paypalRef.current);
      } catch (error) {
        console.error('Error rendering PayPal button:', error);
        toast({
          title: "Error",
          description: "Failed to render PayPal button. Please try again.",
          variant: "destructive",
        });
      }
    };

    const initializePayPal = async () => {
      try {
        await loadPayPalScript();
        await renderPayPalButton();
      } catch (error) {
        console.error('PayPal initialization error:', error);
        toast({
          title: "Error",
          description: "Failed to initialize PayPal. Please try again.",
          variant: "destructive",
        });
      }
    };

    initializePayPal();

    return () => {
      if (paypalRef.current) {
        paypalRef.current.innerHTML = '';
      }
    };
  }, [amount, planTitle, toast]);

  return <div ref={paypalRef} className="w-full" />;
};