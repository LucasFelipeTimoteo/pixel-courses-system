import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeContextProvider } from './contexts/theme/provider/themeProvider';
import { AppRouter } from './router';
import { SelectedCourseProvider } from './contexts/selectedCourseCourse/provider/selectedCourseProvider';

function App() {
  return (
    <ThemeContextProvider>
      <SelectedCourseProvider>
      <Router>
        <AppRouter />
      </Router>
      </SelectedCourseProvider>
    </ThemeContextProvider>
  );
}

export default App