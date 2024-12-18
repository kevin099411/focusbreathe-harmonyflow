import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { AuthChangeEvent } from "@supabase/supabase-js";

const Login = () => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    console.log("Setting up auth state change listener");
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
      console.log("Auth event received:", event);
      console.log("Session state:", session);
      
      if (event === "SIGNED_IN" && session) {
        console.log("User signed in successfully:", session.user.id);
        navigate("/");
      }
      
      if (event === "SIGNED_UP") {
        console.log("User signed up, showing confirmation");
        setShowConfirmation(true);
      }
    });

    // Check if user is already signed in
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Checking existing session:", session);
      if (session) {
        console.log("Existing session found, redirecting");
        navigate("/");
      }
    });

    return () => {
      console.log("Cleaning up auth listener");
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            登入您的帳戶
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            或立即開始免費試用
          </p>
        </div>

        {showConfirmation && (
          <Alert className="mb-4">
            <Info className="h-4 w-4" />
            <AlertTitle>請檢查您的電子郵件</AlertTitle>
            <AlertDescription>
              我們已發送確認郵件到您的信箱。請點擊郵件中的連結以完成註冊。
              如果您沒有收到郵件，請檢查垃圾郵件資料夾。
            </AlertDescription>
          </Alert>
        )}

        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#2563eb',
                  brandAccent: '#1d4ed8',
                }
              }
            }
          }}
          theme="light"
          providers={[]}
          redirectTo={window.location.origin}
          localization={{
            variables: {
              sign_in: {
                email_label: "電子郵件",
                password_label: "密碼",
                button_label: "登入",
                loading_button_label: "登入中...",
                email_input_placeholder: "您的電子郵件",
                password_input_placeholder: "您的密碼",
                link_text: "已經有帳戶了？登入",
              },
              sign_up: {
                email_label: "電子郵件",
                password_label: "密碼",
                button_label: "註冊",
                loading_button_label: "註冊中...",
                email_input_placeholder: "您的電子郵件",
                password_input_placeholder: "建立密碼",
                link_text: "還沒有帳戶？註冊",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Login;