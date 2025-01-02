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
        console.log('PayPal script already loaded');
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=AZwwE0pNpx1qeR_mB9Qt2TxsNT1ADDRpRl9_6fIsZ89WLaOO9UHqP5DmY51tAhs_JgOcSnhWFgQXMR5L&currency=USD`;
        script.async = true;
        script.defer = true;
        
        // Set proper attributes for CORS
        script.setAttribute('crossorigin', 'anonymous');
        script.setAttribute('data-namespace', 'paypal_sdk');
        
        script.onload = () => {
          console.log('PayPal script loaded successfully');
          scriptLoaded.current = true;
          resolve(undefined);
        };
        
        script.onerror = (err) => {
          console.error('Failed to load PayPal SDK:', err);
          scriptLoaded.current = false;
          reject(err);
        };
        
        // Clean up any existing PayPal scripts
        const existingScript = document.querySelector('script[src*="paypal"]');
        if (existingScript) {
          existingScript.remove();
        }
        
        document.body.appendChild(script);
      });
    };

    const renderPayPalButton = async () => {
      if (!paypalRef.current) {
        console.error('PayPal container not available');
        return;
      }

      try {
        if (!window.paypal) {
          await loadPayPalScript();
          // Give PayPal SDK time to initialize
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        if (!window.paypal?.Buttons) {
          throw new Error('PayPal Buttons API not available');
        }

        // Clear existing content
        paypalRef.current.innerHTML = '';

        const paypalButtonsComponent = window.paypal.Buttons({
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
            try {
              const order = await actions.order.capture();
              console.log('Payment successful:', order);
              toast({
                title: "Success!",
                description: `Your payment of $${amount} for ${planTitle} has been processed successfully.`,
              });
            } catch (error) {
              console.error('Error capturing PayPal order:', error);
              toast({
                title: "Error",
                description: "Failed to process payment. Please try again.",
                variant: "destructive",
              });
            }
          },
          onError: (err: any) => {
            console.error('PayPal error:', err);
            toast({
              title: "Error",
              description: "There was a problem processing your payment.",
              variant: "destructive",
            });
          }
        });

        if (await paypalButtonsComponent.isEligible()) {
          await paypalButtonsComponent.render(paypalRef.current);
        } else {
          throw new Error('PayPal Buttons not eligible');
        }
      } catch (error) {
        console.error('Error rendering PayPal button:', error);
        toast({
          title: "Error",
          description: "Failed to load PayPal. Please refresh and try again.",
          variant: "destructive",
        });
        scriptLoaded.current = false;
      }
    };

    // Initialize PayPal with retry logic
    const initializeWithRetry = async (retries = 3) => {
      for (let i = 0; i < retries; i++) {
        try {
          await renderPayPalButton();
          break;
        } catch (error) {
          console.error(`PayPal initialization attempt ${i + 1} failed:`, error);
          if (i === retries - 1) {
            toast({
              title: "Error",
              description: "Could not initialize PayPal. Please refresh the page.",
              variant: "destructive",
            });
          } else {
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
          }
        }
      }
    };

    initializeWithRetry();

    return () => {
      if (paypalRef.current) {
        paypalRef.current.innerHTML = '';
      }
    };
  }, [amount, planTitle, toast]);

  return <div ref={paypalRef} className="w-full" />;
};