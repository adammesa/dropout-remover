import React from 'react';
import './App.css';
import InstructionsGuide from './input-components/instructions';
import Uploader from './input-components/uploader';
import SDFilter from './input-components/sdfilter';
import FilterCutoff from './input-components/filtercutoff';
import LookDistance from './input-components/lookdistance';
import TableHeaders from './input-components/tableheaders';
import AnalysisColumn from './input-components/analysiscolumn';
import NegativeOnly from './input-components/negativeonly';
import Results from './output-components/results';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvData: [],
      SDmode: true,
      filterCutoff: 1.5,
      filterLower: true,
      filterHigher: false,
      lookDistance: 5,
      ignoredRows: 1,
      analysisColumn: 1,
      isProcessing: false
    }

    this.beginProcessingData = this.beginProcessingData.bind(this);
    this.loadNegativeOnly = this.loadNegativeOnly.bind(this);
    this.loadNewData = this.loadNewData.bind(this);
    this.loadSDmode = this.loadSDmode.bind(this);
    this.loadFilterCutoff = this.loadFilterCutoff.bind(this);
    this.loadLookDistance = this.loadLookDistance.bind(this);
    this.loadIgnoredRows = this.loadIgnoredRows.bind(this);
    this.loadAnalysisColumn = this.loadAnalysisColumn.bind(this);
  }

  // Trigger data processing
  beginProcessingData() {
    this.setState({ isProcessing: !this.state.isProcessing });
    console.log("ran beginProcessingData");
    // Will cause re-build of Processor Component, now will turn back state to prevent
    //      the next update causing a rebuild
  }

  // Callback for filtering lower/higher values only
  loadNegativeOnly(value, higherOrLower) {
    if (higherOrLower === 'lower') {
      this.setState({ filterLower: value });
    } else {
      this.setState({ filterHigher: value });
    }
  }

  // Callback for updating the row to analyze
  loadAnalysisColumn(event) {
    this.setState({ analysisColumn: event.target.value });
  }


  // Callback for updating the amount of row to ignore
  loadIgnoredRows(event) {
    this.setState({ ignoredRows: event.target.value });
  }

  // Callback for bringing up the selected file's csv data 
  loadNewData(newdata) {
    this.setState({ csvData: newdata });
  }

  // Callback for enabling/disabling standard deviation mode.
  loadSDmode(isEnabled) {
    this.setState({ SDmode: isEnabled });
  }

  // Callback for updating the filter cutoff input
  loadFilterCutoff(event) {
    this.setState({ filterCutoff: event.target.value });
  }

  // Callback for updating the look distance
  loadLookDistance(event) {
    this.setState({ lookDistance: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header container">
          <p>Built by Krassioukov Lab</p>
        </header>
        <div className="container" style={{ paddingLeft: '25px' }}>
          {/* Left-hand Column - draw input/settings here! */}
          <div className="columns">
            <div className={this.state.isProcessing ? 'column is-two-fifths box dropout-controls isProcessing' : 'column is-two-fifths box dropout-controls'}>
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
              <div className="columns">
                <div className="column">
                  <TableHeaders callback={this.loadIgnoredRows} default={this.state.ignoredRows} />
                </div>
                <div className="column">
                  <AnalysisColumn callback={this.loadAnalysisColumn} default={this.state.analysisColumn} />
                </div>
              </div>
              <label className="label">Filter Settings</label>
              <SDFilter callback={this.loadSDmode} />
              <div className="columns">
                <div className="column is-two-fifths">
                  <FilterCutoff
                    callback={this.loadFilterCutoff}
                    default={this.state.filterCutoff}
                    mode={this.state.SDmode}
                  />
                </div>
                <div className="column">
                  <LookDistance callback={this.loadLookDistance} default={this.state.lookDistance} />
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <NegativeOnly
                    callback={this.loadNegativeOnly}
                    lowerDefault={this.state.filterLower}
                    higherDefault={this.state.filterHigher}
                  />
                </div>
              </div>
              <button
                className="button is-link is-light is-pulled-right"
                disabled={this.state.csvData.length === 0}
                onClick={this.beginProcessingData}
              >
                {this.state.isProcessing ? 'Auto-processing' : 'Process'}
              </button>
          </div>
          <div className="column">
            {/* Right-hand Column - draw graphs here!*/}
            <Results {...this.state} />
          </div>
        </div>
      </div>
      </div >
    );
  }
}

export default App;
