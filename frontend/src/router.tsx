import { CssBaseline } from "@mui/material";
import { Route, Routes, useLocation } from "react-router";
import Header from "./components/Header/header";
import Hero from "./components/Hero/hero";
import CoursesPage from "./pages/Courses/coursesPage";
import { CourseReportPage } from "./pages/CourseReport/courseReportPage";
import { RegisterPage } from "./pages/Register/registerPage";
import Footer from "./components/Footer/footer";
import { LoginPage } from "./pages/Login/loginPage";

export const AppRouter: React.FC = () => {
  const location = useLocation();
  const isForm = location.pathname === '/register' || location.pathname === '/login';

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