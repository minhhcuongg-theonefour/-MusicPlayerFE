import "./App.css";
import React from "react";
import RouterCfg from "./RouterCfg";
import { useRoutes, BrowserRouter, Routes, Route } from "react-router-dom";

import { LeftMenu } from "./Components/LeftMenu";
import { MainContainer } from "./Components/MainContainer";
import { RightMenu } from "./Components/RightMenu";

const App = () => {
  const routing = useRoutes(RouterCfg);

  return (
    <>
      <div className="App">
        {routing}
        <div className="background"></div>
      </div>
    </>
  );
};

export default App;
