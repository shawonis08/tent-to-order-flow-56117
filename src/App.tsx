import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import MaterialRequest from "./pages/MaterialRequest";
import PurchaseOrder from "./pages/PurchaseOrder";
import RFQ from "./pages/RFQ";
import SupplierQuotation from "./pages/SupplierQuotation";
import PurchaseReceipt from "./pages/PurchaseReceipt";
import Suppliers from "./pages/Suppliers";
import ComparativeStatement from "./pages/ComparativeStatement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/material-request" element={<AppLayout><MaterialRequest /></AppLayout>} />
          <Route path="/purchase-order" element={<AppLayout><PurchaseOrder /></AppLayout>} />
          <Route path="/rfq" element={<AppLayout><RFQ /></AppLayout>} />
          <Route path="/supplier-quotation" element={<AppLayout><SupplierQuotation /></AppLayout>} />
          <Route path="/comparative-statement" element={<AppLayout><ComparativeStatement /></AppLayout>} />
          <Route path="/purchase-receipt" element={<AppLayout><PurchaseReceipt /></AppLayout>} />
          <Route path="/suppliers" element={<AppLayout><Suppliers /></AppLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
