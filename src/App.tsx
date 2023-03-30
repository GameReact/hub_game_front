import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/global.css";
import Authpage from "./pages/auth/Authpage";
import About from "./pages/about/About";
import Stats from "./pages/stats/Stats";
import { useContext } from "react";
import { UserContext } from "./context/UserContextProvider";


function App() {
  const { state } = useContext(UserContext);

  let router = createBrowserRouter([
    {
      path: "/",
      element: <Authpage />,
    }
  ]);  if(state.token){
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
        path: "/stats",
        element: <Stats />,
      },
    ]);
  } else {

  }

  console.log(router)
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
