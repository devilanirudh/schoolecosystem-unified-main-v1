import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StudentsPage from "./pages/StudentsPage";
import TeachersPage from "./pages/TeachersPage";
import ClassesPage from "./pages/ClassesPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import ExamsPage from "./pages/ExamsPage";
import FeesPage from "./pages/FeesPage";
import LiveClassesPage from "./pages/LiveClassesPage";
import LibraryPage from "./pages/LibraryPage";
import TransportPage from "./pages/TransportPage";
import EventsPage from "./pages/EventsPage";
import CMSPage from "./pages/CMSPage";
import CRMPage from "./pages/CRMPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/exams" element={<ExamsPage />} />
            <Route path="/fees" element={<FeesPage />} />
            <Route path="/live-classes" element={<LiveClassesPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/transport" element={<TransportPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/cms" element={<CMSPage />} />
            <Route path="/crm" element={<CRMPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;