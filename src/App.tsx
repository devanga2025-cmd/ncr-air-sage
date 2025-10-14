import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Sources from "./pages/Sources";
import Forecast from "./pages/Forecast";
import Citizen from "./pages/Citizen";
import Policy from "./pages/Policy";
import SafetyGuidelines from "./pages/SafetyGuidelines";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<><Navigation /><Index /></>} />
          <Route path="/dashboard" element={<><Navigation /><Dashboard /></>} />
          <Route path="/sources" element={<><Navigation /><Sources /></>} />
          <Route path="/forecast" element={<><Navigation /><Forecast /></>} />
          <Route path="/citizen" element={<><Navigation /><Citizen /></>} />
          <Route path="/policy" element={<><Navigation /><Policy /></>} />
          <Route path="/safety-guidelines" element={<><Navigation /><SafetyGuidelines /></>} />
          <Route path="/contact" element={<><Navigation /><ContactUs /></>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
