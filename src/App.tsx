import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Review from "./pages/Review";
import AnalysisReport from "./pages/AnalysisReport";
import Credits from "./pages/Credits";
import StudioIA from "./pages/StudioIA";
import PhotoRetouchStudio from "./pages/PhotoRetouchStudio";
import BioGeneratorStudio from "./pages/BioGeneratorStudio";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/review" element={<Review />} />
          <Route path="/analysis/:id" element={<AnalysisReport />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/studio-ia" element={<StudioIA />} />
          <Route path="/studio-ia/retouche-photo" element={<PhotoRetouchStudio />} />
          <Route path="/studio-ia/generateur-bio" element={<BioGeneratorStudio />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
