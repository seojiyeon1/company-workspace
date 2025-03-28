import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import MainPage from "./Page/MainPage/MainPage";
import About from "./Page/About/About";
import Leadership from "./Page/Leadership/Leadership";
import Board from "./Page/Board/Board";
import Services from "./Page/Services/Services";
import Contact from "./Page/Contact/contact"; // 소문자임. 주의

import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import AdminLogin from "./Page/Admin/AdminLogin";
import { useState, useEffect } from "react";

function AuthRedirectRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/verify-token",
          {},
          { withCredentials: true }
        );
        setIsAuthenticated(true);
      } catch (error) {
        console.log("토큰 인증 실패 : ", error);
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if(isAuthenticated === null){
    return null;
  }

  return isAuthenticated ? <Navigate to="/admin/posts" replace /> : <Outlet />;
}

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/leadership",
        element: <Leadership />,
      },
      {
        path: "/board",
        element: <Board />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/our-services",
        element: <Services />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AuthRedirectRoute />,
    children: [{ index: true, element: <AdminLogin /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
