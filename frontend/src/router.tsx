import { CssBaseline } from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import Header from "./components/Header/header";
import Hero from "./components/Hero/hero";
import CoursesPage from "./pages/Courses/coursesPage";
import { CourseReportPage } from "./pages/CourseReport/courseReportPage";
import { RegisterPage } from "./pages/Register/registerPage";
import Footer from "./components/Footer/footer";
import { LoginPage } from "./pages/Login/loginPage";

export const AppRouter: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isForm = location.pathname === '/register' || location.pathname === '/login';

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken && !isForm) {
      navigate("/login", { replace: true });
    }
  }, [location.pathname, isForm, navigate]);

  return (
    <>
      <CssBaseline />
      {!isForm && <Header />}
      {!isForm && <Hero />}
      <Routes>
        <Route path="/" element={<CoursesPage />} />
        <Route path="/courseReport" element={<CourseReportPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/subscriptions" element={<SubscriptionsPage />} /> */}
      </Routes>
      {!isForm && <Footer />}
    </>
  );
}