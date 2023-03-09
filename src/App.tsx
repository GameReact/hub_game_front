import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
