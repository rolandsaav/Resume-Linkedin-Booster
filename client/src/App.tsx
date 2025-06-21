import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import GetStarted from "./pages/GetStarted";
import ResumeBuilderStep1 from "./pages/resume-builder/ResumeBuilderStep1";
import ManualEntryForm from "./pages/resume-builder/ManualEntryForm";
import ResumeInProgress from "./pages/resume-builder/ResumeInProgress";
import { SessionProvider } from "./context/SessionContext";

const queryClient = new QueryClient();

// Layout for the resume builder flow to provide context
const ResumeBuilderLayout = () => (
  <SessionProvider>
    <Outlet />
  </SessionProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/get-started" element={<GetStarted />} />
          
          {/* Resume Builder Flow */}
          <Route path="/resume-builder" element={<ResumeBuilderLayout />}>
            <Route index element={<ResumeBuilderStep1 />} />
            <Route path="manual-form" element={<ManualEntryForm />} />
            <Route path="in-progress" element={<ResumeInProgress />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
