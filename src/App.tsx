import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { PlaceholderView } from "./pages/PlaceholderView";

function AppRoutes() {
  const location = useLocation();

  return (
    <Layout>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/dorosli" element={<PlaceholderView title="Strefa Dorosłych" description="Kompleksowa opieka dla pacjentów dorosłych." />} />
        <Route path="/pediatria" element={<PlaceholderView title="Pediatria" description="Bezpieczne środowisko leczenia dla najmłodszych." />} />
        <Route path="/diagnostyka" element={<PlaceholderView title="Diagnostyka Obrazowa" description="Precyzyjne i staranne odczyty." />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

