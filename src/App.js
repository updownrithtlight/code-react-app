import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import AppRoutes from './routes/AppRoutes';
import './assets/styles/global.css';

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
