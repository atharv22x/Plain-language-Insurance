import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import HomePage from '../pages/Home/HomePage';
import DashPage from '../pages/Dash/DashPage';
import SignUpPage from '../pages/SignUp/SignUpPage';
import UserAccountPage from '../pages/UserAccount/UserAccountPage';
import InsurancePage from '../pages/Insurance/InsurancePage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dash" element={<DashPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/account" element={<UserAccountPage />} />
          <Route path="/insurance" element={<InsurancePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
