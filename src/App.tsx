import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Meditate from "./pages/Meditate";
import Breathwork from "./pages/Breathwork";
import ProductCatalog from "./pages/ProductCatalog";
import Testing from "./pages/Testing";
import Pricing from "./pages/Pricing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout>{null}</Layout>}>
        <Route index element={<Index />} />
        <Route path="meditate" element={<Meditate />} />
        <Route path="breathwork" element={<Breathwork />} />
        <Route path="products" element={<ProductCatalog />} />
        <Route path="testing" element={<Testing />} />
        <Route path="pricing" element={<Pricing />} />
      </Route>
    </Routes>
  );
}

export default App;