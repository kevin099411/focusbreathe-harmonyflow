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
    // Load PayPal SDK
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${import.meta.env.VITE_PAYPAL_CLIENT_ID}&components=hosted-buttons&disable-funding=venmo&currency=USD`;
    script.async = true;
    
    script.onload = () => {
      // @ts-ignore
      if (window.paypal) {
        // @ts-ignore
        window.paypal.HostedButtons({
          hostedButtonId: hostedButtonId,
        }).render(`#paypal-container-${hostedButtonId}`);
      }
    };

    script.onerror = () => {
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