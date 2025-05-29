import { CssBaseline } from '@mui/material';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer/footer';
import Header from './components/Header/header';
import { ThemeContextProvider } from './contexts/theme/provider/themeProvider';

function App() {
  return (
    <>
      <ThemeContextProvider>

        <Router>
          <CssBaseline />
          <Header />
          {/* <Hero /> */}
          {/* <Routes>
          <Route path="/" element={<CoursesPage />} />
          <Route path="/courseReport" element={<CourseReportPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          </Routes> */}
          <Footer />
        </Router>
      </ThemeContextProvider>
    </>
  )
}

export default App
