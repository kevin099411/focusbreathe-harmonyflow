import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { Layout } from "./components/Layout";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Meditate from "./pages/Meditate";
import Breathwork from "./pages/Breathwork";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider supabaseClient={supabase}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LanguageSwitcher />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/meditate" element={<Meditate />} />
                <Route path="/breathwork" element={<Breathwork />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);

export default App;