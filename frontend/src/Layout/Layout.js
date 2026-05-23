import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Router from '../components/Routes/Routers';

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
