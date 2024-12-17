import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Download } from "lucide-react";
import { Button } from "./ui/button";

interface PayPalButtonProps {
  amount: string;
  planTitle: string;
  fileUrl?: string;
}

export const PayPalButton = ({ amount, planTitle, fileUrl }: PayPalButtonProps) => {
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      if (!fileUrl) {
        toast({
          title: "Error",
          description: "No file available for download",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase.storage
        .from('file paypal')
        .download(fileUrl);

      if (error) throw error;

      // Create a download link
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileUrl.split('/').pop() || 'download');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "File downloaded successfully!",
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Error",
        description: "Failed to download the file. Please try again.",
        variant: "destructive",
      });
    }
  };

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

      // If there's a file associated, show the download button
      if (fileUrl) {
        handleDownload();
      }
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
    <div className="space-y-4">
      <PayPalScriptProvider options={{ 
        clientId: process.env.VITE_PAYPAL_CLIENT_ID || '',
        currency: "USD"
      }}>
        <PayPalButtons
          style={{ 
            layout: "horizontal",
            color: "gold",
            shape: "rect",
            label: "pay",
            tagline: false
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: "CAPTURE",
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
      
      {fileUrl && (
        <Button 
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2"
          variant="outline"
        >
          <Download className="h-4 w-4" />
          Download File
        </Button>
      )}
    </div>
  );
};