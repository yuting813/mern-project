import React, { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const Footer = lazy(() => import('./Footer'));

const Layout = ({ currentUser, setCurrentUser, showAlert }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Nav
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        showAlert={showAlert}
      />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Suspense fallback={<div className="h-16"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Layout;
