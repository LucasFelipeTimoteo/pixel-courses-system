import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeContextProvider } from './contexts/theme/provider/themeProvider';
import { AppRouter } from './router';

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <AppRouter />
      </Router>
    </ThemeContextProvider>
  );
}

export default App