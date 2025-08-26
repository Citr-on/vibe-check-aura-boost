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
import Profile from "./pages/Profile";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/review" element={<ProtectedRoute><Review /></ProtectedRoute>} />
          <Route path="/analysis/:id" element={<ProtectedRoute><AnalysisReport /></ProtectedRoute>} />
          <Route path="/credits" element={<ProtectedRoute><Credits /></ProtectedRoute>} />
          <Route path="/studio-ia" element={<ProtectedRoute><StudioIA /></ProtectedRoute>} />
          <Route path="/studio-ia/retouche-photo" element={<ProtectedRoute><PhotoRetouchStudio /></ProtectedRoute>} />
          <Route path="/studio-ia/generateur-bio" element={<ProtectedRoute><BioGeneratorStudio /></ProtectedRoute>} />
          <Route path="/parametres" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/faq" element={<FAQ />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
