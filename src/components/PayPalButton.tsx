import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PayPalButtonProps {
  amount: string;
  planTitle: string;
}

export const PayPalButton = ({ amount, planTitle }: PayPalButtonProps) => {
  const { toast } = useToast();

  const handlePaymentSuccess = async (details: any) => {
    console.log("Payment successful", details);
    
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { error } = await supabase.from('payments').insert({
        amount: parseFloat(amount),
        status: 'completed',
        payment_method: 'paypal',
        payment_id: details.id,
        user_id: user.id
      });

      if (error) throw error;

      toast({
        title: "Payment Successful!",
        description: `Thank you for purchasing the ${planTitle} plan!`,
      });
    } catch (error) {
      console.error("Error saving payment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error processing your payment. Please try again.",
      });
    }
  };

  return (
    <PayPalScriptProvider options={{ 
      clientId: process.env.VITE_PAYPAL_CLIENT_ID || '',
      currency: "USD"
    }}>
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: `${planTitle} Plan`,
                amount: {
                  currency_code: "USD",
                  value: amount
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          if (actions.order) {
            const details = await actions.order.capture();
            handlePaymentSuccess(details);
          }
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          toast({
            variant: "destructive",
            title: "Payment Error",
            description: "There was an error processing your PayPal payment. Please try again.",
          });
        }}
      />
    </PayPalScriptProvider>
  );
};