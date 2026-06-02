import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Router from '../components/Routes/Routers';
import { useDarkMode } from '../components/context/DarkModeContext';

const Layout = () => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
