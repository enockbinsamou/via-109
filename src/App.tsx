import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LearnCategoryScreen from "./screens/LearnCategoryScreen";
import LearnSenalesScreen from "./screens/LearnSenalesScreen";
import LearnNormasScreen from "./screens/LearnNormasScreen";
import LearnAgenteScreen from "./screens/LearnAgenteScreen";
import LearnNormasBasicasScreen from "./screens/LearnNormasBasicasScreen";
import LearnHorizontalesScreen from "./screens/LearnHorizontalesScreen";
import LearnPrioridadInterseccionesScreen from "./screens/LearnPrioridadInterseccionesScreen";
import LearnPeatonesScreen from "./screens/LearnPeatonesScreen";
import LearnAccidenteScreen from "./screens/LearnAccidenteScreen";
import LearnListScreen from "./screens/LearnListScreen";
import SignalDetailScreen from "./screens/SignalDetailScreen";
import QuizModeScreen from "./screens/QuizModeScreen";
import QuizRunScreen from "./screens/QuizRunScreen";
import QuizResultScreen from "./screens/QuizResultScreen";
import ExamSetupScreen from "./screens/ExamSetupScreen";
import ExamRunScreen from "./screens/ExamRunScreen";
import ExamResultScreen from "./screens/ExamResultScreen";
import ProgressScreen from "./screens/ProgressScreen";
import SettingsScreen from "./screens/SettingsScreen";
import GuardadosScreen from "./screens/GuardadosScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/learn" element={<LearnCategoryScreen />} />
          <Route path="/learn/senales" element={<LearnSenalesScreen />} />
          <Route path="/learn/normas" element={<LearnNormasScreen />} />
          <Route path="/learn/agente" element={<LearnAgenteScreen />} />
          <Route path="/learn/normas-basicas" element={<LearnNormasBasicasScreen />} />
          <Route path="/learn/horizontales" element={<LearnHorizontalesScreen />} />
          <Route path="/learn/prioridad-intersecciones" element={<LearnPrioridadInterseccionesScreen />} />
          <Route path="/learn/peatones" element={<LearnPeatonesScreen />} />
          <Route path="/learn/accidente" element={<LearnAccidenteScreen />} />
          <Route path="/learn/:category" element={<LearnListScreen />} />
          <Route path="/signal/:id" element={<SignalDetailScreen />} />
          <Route path="/quiz" element={<QuizModeScreen />} />
          <Route path="/quiz/run" element={<QuizRunScreen />} />
          <Route path="/quiz/result" element={<QuizResultScreen />} />
          <Route path="/exam" element={<ExamSetupScreen />} />
          <Route path="/exam/run" element={<ExamRunScreen />} />
          <Route path="/exam/result" element={<ExamResultScreen />} />
          <Route path="/progress" element={<ProgressScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/guardados" element={<GuardadosScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
