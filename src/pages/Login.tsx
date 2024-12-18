import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Wind } from "lucide-react";
import { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useSessionContext();

  useEffect(() => {
    if (session) {
      toast({
        title: "登入成功",
        description: "歡迎回來！",
      });
      navigate("/");
    }
  }, [session, navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 to-secondary/10 px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center text-center">
          <Wind className="h-12 w-12 text-primary mb-2" />
          <h2 className="text-2xl font-bold text-gray-900">歡迎回來</h2>
          <p className="text-gray-600 mb-8">使用以下方式登入</p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'rgb(var(--primary))',
                  brandAccent: 'rgb(var(--primary))',
                },
              },
            },
          }}
          providers={["google", "facebook"]}
          view="sign_in"
          showLinks={false}
        />
      </div>
    </div>
  );
};

export default Login;