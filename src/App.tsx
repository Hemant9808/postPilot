import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import Header from './components/Header';
import { AnimatePresence } from 'framer-motion';
import FacebookLogin from './pages/FacebookLogin';

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <BrowserRouter>
      <div className={isDarkMode ? 'dark' : 'light'}>
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<FacebookLogin />} />
          </Routes>
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

export default App;