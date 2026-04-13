import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface">
      {/* We can place shared Navbars/Footers here later */}
      <Outlet />
    </div>
  );
};

export default MainLayout;
