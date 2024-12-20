import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Index from "./pages/Index";
import Meditate from "./pages/Meditate";
import Breathwork from "./pages/Breathwork";
import Pricing from "./pages/Pricing";
import Testing from "./pages/Testing";
import Login from "./pages/Login";
import ProductManagement from "./pages/ProductManagement";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      meta: {
        onError: (error: Error) => {
          console.error('Query error:', error);
          toast({
            title: "數據加載錯誤",
            description: "無法加載數據，請重試。",
            variant: "destructive",
          });
        },
      },
    },
  },
});

const App = () => {
  return (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        <SessionContextProvider supabaseClient={supabase}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/meditate" element={<Meditate />} />
                <Route path="/breathwork" element={<Breathwork />} />
                <Route path="/testing" element={<Testing />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<ProductManagement />} />
                <Route path="*" element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-4">頁面未找到</h2>
                      <p className="text-gray-600 mb-6">抱歉，您請求的頁面不存在。</p>
                      <Button onClick={() => window.location.href = '/'}>
                        返回首頁
                      </Button>
                    </div>
                  </div>
                } />
              </Routes>
            </Layout>
          </BrowserRouter>
        </SessionContextProvider>
      </QueryClientProvider>
    </TooltipProvider>
  );
};

export default App;