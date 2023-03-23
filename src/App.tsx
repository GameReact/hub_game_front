import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/global.css";
import Authpage from "./pages/auth/Authpage";
import About from "./pages/about/About";
import Stats from "./pages/stats/Stats";
import TicTacToe from "./pages/tic_tac_toe/TicTacToe";

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
  {
    path: "games/tictactoe",
    element: <TicTacToe />
  }
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
