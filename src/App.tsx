import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/global.css";
import Authpage from "./pages/auth/Authpage";
import Stats from "./pages/stats/Stats";
import About from "./pages/about/About";
import { useContext } from "react";
import { UserContext } from "./context/UserContextProvider";

import TicTacToe from "./pages/tic_tac_toe/TicTacToe";
import { HeaderAction } from "./components/Header";
import { Contact } from "./pages/contact/Contact";
import { NotFoundTitle } from "./pages/error/Error";
import Worldle from "./pages/worldle/Worldle"

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
    element: <TicTacToe />,
  },
  {
    path: "/games/worldle",
    element: <Worldle />,
  },
]);

function App() {
  const { state } = useContext(UserContext);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <Authpage />,
    },
  ]);
  if (state.token) {
    router = createBrowserRouter([
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
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },
      {
        path: "/games/1",
        element: <TicTacToe />,
      },
      {
        path: "/games/worldle",
        element: <Worldle />,
      },
      // ERROR Page
      {
        path: "*",
        element: <NotFoundTitle />,
      },
    ]);
  } else {
  }

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
