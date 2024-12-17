import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface PayPalButtonProps {
  amount: string;
  planTitle: string;
  hostedButtonId: string;
}

export const PayPalButton = ({ hostedButtonId }: PayPalButtonProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AZwwE0pNpx1qeR_mB9Qt2TxsNT1ADDRpRl9_6fIsZ89WLaOO9UHqP5DmY51tAhs_JgOcSnhWFgQXMR5L&components=hosted-buttons&disable-funding=venmo&currency=USD`;
    script.async = true;
    
    script.onload = () => {
      console.log('PayPal SDK loaded successfully');
      // @ts-ignore
      if (window.paypal) {
        try {
          // @ts-ignore
          window.paypal.HostedButtons({
            hostedButtonId: hostedButtonId,
          }).render(`#paypal-container-${hostedButtonId}`);
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

    return () => {
      document.body.removeChild(script);
    };
  }, [hostedButtonId, toast]);

  return (
    <div id={`paypal-container-${hostedButtonId}`} className="w-full" />
  );
};