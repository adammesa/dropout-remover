import React from 'react';
import logo from './flask.svg';
import './App.css';
import InstructionsGuide from './instructions';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Built for Krassioukov Lab</p>
      </header>
      <div className="container">
        <div className="columns">
          <div className="column is-one-third box">
            <h2 className="title">Load Data</h2>
            <InstructionsGuide />
          </div>
          <div className="column">

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
