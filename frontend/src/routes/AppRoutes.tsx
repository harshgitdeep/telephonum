import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import NotFound from "../pages/NotFound";
import CallDetail from "../pages/Dashboard/CallDetail";
import Dashboard from "../pages/Dashboard/Dashboard";
import CallsPage from "../pages/Dashboard/CallsPage";
import UploadPage from "../pages/Dashboard/UploadPage";
import AnalyticsPage from "../pages/Dashboard/AnalyticsPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/calls/:id" element={<CallDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calls" element={<CallsPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;