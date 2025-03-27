import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

import MainPage from "./Page/MainPage/MainPage";
import About from "./Page/About/About";
import Leadership from "./Page/Leadership/Leadership";
import Board from "./Page/Board/Board";
import Services from "./Page/Services/Services";
import Contact from "./Page/Contact/contact"; // 소문자임. 주의

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import AdminLogin from './Page/Admin/AdminLogin';

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
        element: <MainPage />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/leadership",
        element: <Leadership />
      },
      {
        path: "/board",
        element: <Board />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/our-services",
        element: <Services />
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
]);

function App() {

  return <RouterProvider router={router} />
}

export default App;
