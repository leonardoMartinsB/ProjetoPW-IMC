import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import IMCCalculator from './pages/IMCCalculator';
import HealthInfo from './pages/HealthInfo';
import History from './pages/History';
import NotFound from './pages/NotFound';

const AppRouter = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/imc" element={<IMCCalculator />} />
        <Route path="/info" element={<HealthInfo />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default AppRouter;