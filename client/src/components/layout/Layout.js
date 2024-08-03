import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const Footer = lazy(() => import("./Footer"));

const Layout = ({ currentUser, setCurrentUser, showAlert }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        showAlert={showAlert}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Suspense fallback={<div className="h-16"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Layout;
