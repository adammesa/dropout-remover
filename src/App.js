import React from 'react';
import logo from './flask.svg';
import './App.css';
import InstructionsGuide from './components/instructions';
import Uploader from './components/uploader';
import CsvPreview from './components/csvpreview';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvData: [],
      delRowNums: [],
      removeBySD: true,
      unitDifferenceCutoff: 1,
      lookbehind: 3,
      lookahead: 3,
    }

    this.loadNewData = this.loadNewData.bind(this);
  }

  loadNewData(newdata) {
    console.log('loadNewData ran.')
    this.setState({ csvData: newdata });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Built by Krassioukov Lab</p>
        </header>
        <div className="container">
          {/* Left-hand Column - draw input/settings here! */}
          <div className="columns">
            <div className="column is-two-fifths box">
              <div className="columns">
                <div className="column">
                  <h2 style={{ marginTop: '5px' }} className="title is-4">Dropout remover</h2>
                </div>
                <div className="column is-two-fifths" style={{ textAlign: 'right' }}>
                  <InstructionsGuide />
                </div>
              </div>
              <p>Load .csv file:</p>
              <Uploader callback={this.loadNewData} />
            </div>
            <div className="column">
              {/* Right-hand Column - draw graphs here!*/}
              <CsvPreview csvData={this.state.csvData} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
