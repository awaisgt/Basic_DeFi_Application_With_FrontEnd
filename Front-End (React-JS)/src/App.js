
import './App.css';
import React, { Component } from "react";
import Connect from "./components/Connect";
import {
  DAppProvider,
  ChainId
} from "@usedapp/core";


const config= {
supportedChains: [ChainId.Rinkeby]
};

function App() {
  return (
    <div>
    <DAppProvider config={{supportedChains : [ChainId.Rinkeby],
    notifications:{
      expirationPeriod:1000,
      checkInterval:1000
    }
    }}>
      <h1 className='header'> 
        Welcome To DeFi Center
      </h1>
    <Connect>

    </Connect>
    </DAppProvider>
  </div>
  );
}

export default App;
