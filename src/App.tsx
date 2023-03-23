import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/global.css";
import Authpage from "./pages/auth/Authpage";
import About from "./pages/about/About";
import Stats from "./pages/stats/Stats";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <Authpage />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/stats",
    element: <Stats />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
