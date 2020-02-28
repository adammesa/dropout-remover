import React from 'react';
import logo from './flask.svg';
import './App.css';
import InstructionsGuide from './components/instructions';
import Uploader from './components/uploader';
import SDFilter from './components/sdfilter';
import FilterCutoff from './components/filtercutoff';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvData: [],
      delRowNums: [],
      SDmode: true,
      filterCutoff: 1.5,
      lookbehind: 3,
      lookahead: 3,
    }

    this.loadNewData = this.loadNewData.bind(this);
    this.loadSDmode = this.loadSDmode.bind(this);
    this.loadFilterCutoff = this.loadFilterCutoff.bind(this);
  }

  // Callback for bringing up the selected file's csv data 
  loadNewData(newdata) {
    this.setState({ csvData: newdata });
  }

  // Callback for enabling/disabling standard deviation mode.
  loadSDmode(isEnabled) {
    this.setState({SDmode: isEnabled});
  }

  // Callback for getting the filter cutoff input
  loadFilterCutoff(event) {
    console.log(event.target.value);
    this.setState({filterCutoff: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Built by Krassioukov Lab</p>
        </header>
        <div className="container" style={{paddingLeft: '25px'}}>
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
              <label className="label">Filter Settings</label>
              <SDFilter callback={this.loadSDmode} />
              <FilterCutoff callback={this.loadFilterCutoff} default={this.state.filterCutoff} />
            </div>
            <div className="column">
              {/* Right-hand Column - draw graphs here!*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
