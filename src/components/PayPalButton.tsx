import { useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

interface PayPalButtonProps {
  amount: string;
  planTitle: string;
  hostedButtonId: string;
}

export const PayPalButton = ({ amount, planTitle, hostedButtonId }: PayPalButtonProps) => {
  const { toast } = useToast();
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const containerId = `paypal-container-${hostedButtonId}`;

  useEffect(() => {
    // Only create and append the script if it hasn't been created yet
    if (!scriptRef.current) {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=AZwwE0pNpx1qeR_mB9Qt2TxsNT1ADDRpRl9_6fIsZ89WLaOO9UHqP5DmY51tAhs_JgOcSnhWFgQXMR5L&currency=USD`;
      script.async = true;
      script.crossOrigin = "anonymous";
      
      script.onload = () => {
        console.log('PayPal SDK loaded successfully');
        const container = document.getElementById(containerId);
        if (container && window.paypal) {
          try {
            // Clear any existing content
            container.innerHTML = '';
            
            // @ts-ignore
            window.paypal.Buttons({
              style: {
                layout: 'vertical',
                color: 'gold',
                shape: 'rect',
                label: 'paypal'
              },
              createOrder: (data: any, actions: any) => {
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
                  description: "Your payment has been processed successfully.",
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
        } else {
          console.error('PayPal container not found or PayPal not loaded');
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

    // Cleanup function
    return () => {
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
      // Clear the container
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [amount, containerId, planTitle, toast]);

  return (
    <div id={containerId} className="w-full" />
  );
};