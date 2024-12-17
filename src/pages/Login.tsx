import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        console.log("User signed in:", session?.user.id);
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {language === "en" ? "Sign in to your account" : "登入您的帳戶"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {language === "en" 
              ? "Or start your free trial today" 
              : "或立即開始免費試用"}
          </p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                email_label: language === "en" ? "Email" : "電子郵件",
                password_label: language === "en" ? "Password" : "密碼",
                button_label: language === "en" ? "Sign in" : "登入",
              },
              sign_up: {
                email_label: language === "en" ? "Email" : "電子郵件",
                password_label: language === "en" ? "Password" : "密碼",
                button_label: language === "en" ? "Sign up" : "註冊",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Login;