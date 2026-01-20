import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import Navbar from "./components/ui/navbar";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import DeleteAccount from "@/pages/DeleteAccount.tsx";
import TermsOfService from "@/pages/TermsOfService.tsx";
import Eula from "@/pages/Eula.tsx";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div className="overflow-x-hidden max-w-[100vw]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-service" element={<TermsOfService />} />
          <Route path="/eula" element={<EULA />} />
          <Route path="/delete-accounts" element={<DeleteAccount />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
