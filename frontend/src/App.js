import React from 'react';
import Layout from './Layout/Layout';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './components/context/AuthContext';
import { DarkModeProvider } from './components/context/DarkModeContext';

export default function App() {
  return (
    <AuthContextProvider>
      <DarkModeProvider>
        <Toaster
          autoClose={3000}
          closeOnClick
          pauseOnHover={false}
          containerStyle={{ zIndex: "3453534" }}
        />
        <Layout />
      </DarkModeProvider>
    </AuthContextProvider>
  );
}
