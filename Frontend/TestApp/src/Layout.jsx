import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import { Outlet, useLocation } from "react-router-dom";
const Layout = () => {
  const location = useLocation()

  console.log(location.pathname)
  return (
    <>
      {location.pathname=='/quiz'?"":<Navbar />}
    <Outlet/>
      {location.pathname=='/quiz'?"":<Footer />}
    </>
  );
};

export default Layout;
