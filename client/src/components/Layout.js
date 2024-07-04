import { Outlet } from "react-router-dom";
import Nav from "./nav-component";
import Footer from "./Footer";

const Layout = ({ currentUser, setCurrentUser, showAlert }) => {
  return (
    <>
      <Nav
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        showAlert={showAlert}
      />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
