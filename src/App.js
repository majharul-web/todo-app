import React from "react";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Home />
      <Toaster position='bottom-right' />
    </div>
  );
};

export default App;
