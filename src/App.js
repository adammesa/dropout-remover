import React from 'react';
import './App.css';
import { mean } from 'mathjs';
import InstructionsGuide from './input-components/instructions';
import Uploader from './input-components/uploader';
import SDFilter from './input-components/sdfilter';
import FilterCutoff from './input-components/filtercutoff';
import LookDistance from './input-components/lookdistance';
import TableHeaders from './input-components/tableheaders';
import AnalysisColumn from './input-components/analysiscolumn';
import NegativeOnly from './input-components/negativeonly';
import Results from './output-components/results';
import FileStats from './output-components/filestats';
import ZoomButtons from './output-components/zoombuttons';
import Processor from './processing/processor.js';
import ErrorMsg from './input-components/errormsg';
import About from './input-components/about';
import InterpolateMode from './input-components/interpolatemode';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvData: [],
      cleanedCsvData: [],
      SDmode: true,
      InterpolateMode: true,
      filterCutoff: 1.5,
      filterLower: true,
      filterHigher: false,
      lookDistance: 5,
      ignoredRows: 1,
      analysisColumn: 0,
      isProcessing: false,
      dropoutRowNums: [],
      graphWidth: 700,
      errorMsg: '',
    }

    this.toggleProcessingData = this.toggleProcessingData.bind(this);
    this.checkForErrors = this.checkForErrors.bind(this);
    this.changeGraphSize = this.changeGraphSize.bind(this);
    this.loadNegativeOnly = this.loadNegativeOnly.bind(this);
    this.loadNewData = this.loadNewData.bind(this);
    this.loadSDmode = this.loadSDmode.bind(this);
    this.loadInterpolateMode = this.loadInterpolateMode.bind(this);
    this.loadFilterCutoff = this.loadFilterCutoff.bind(this);
    this.loadLookDistance = this.loadLookDistance.bind(this);
    this.loadIgnoredRows = this.loadIgnoredRows.bind(this);
    this.loadAnalysisColumn = this.loadAnalysisColumn.bind(this);
  }

  // Trigger data processing
  toggleProcessingData() {
    this.setState({ isProcessing: !this.state.isProcessing });
  }

  // Calls the analysis function if any of the filter settings have been changed,
  // or, if processing is disabled, checks to make sure that valid #'s are supplied
  // - without checking, the analysis function would in-turn update cleanedCsvData 
  //   and delRowNums, causing an infinite loop. 
  componentDidUpdate(prevProps, prevState, snapshot) {
    const errCheck = this.checkForErrors();
    if (errCheck === '' && this.state.errorMsg !== '') {
      this.setState({ errorMsg: '' });
    }
    if (this.state.isProcessing) {
      if (prevState.csvData !== this.state.csvData
        || prevState.isProcessing !== this.state.isProcessing
        || prevState.SDmode !== this.state.SDmode
        || prevState.InterpolateMode !== this.state.InterpolateMode
        || prevState.lookDistance !== this.state.lookDistance
        || prevState.analysisColumn !== this.state.analysisColumn
        || prevState.ignoredRows !== this.state.ignoredRows
        || prevState.filterCutoff !== this.state.filterCutoff
        || prevState.filterLower !== this.state.filterLower
        || prevState.filterHigher !== this.state.filterHigher) {
        if (errCheck === '') {
          // console.log("graphing: ignoreRows: " + this.state.ignoredRows);
          let results = Processor.cleanData(this.state.csvData, this.state.SDmode, this.state.InterpolateMode,
            this.state.filterCutoff, this.state.filterLower, this.state.filterHigher,
            parseInt(this.state.lookDistance), this.state.ignoredRows, this.state.analysisColumn);
          this.setState({ cleanedCsvData: results.cleanedCsvData, dropoutRowNums: results.dropoutRowNums });
        } else {
          this.setState({ errorMsg: errCheck, isProcessing: false });
        }
      }
    } 
  }

  // Returns any validation errors with the current settings, or empty string if valid
  checkForErrors() {
    let errors = [];
    if (isNaN(this.state.filterCutoff)) { errors.push("cutoff"); }
    if (isNaN(this.state.lookDistance)) { errors.push("comparison distance"); }
    if (this.state.analysisColumn < 0 || this.state.analysisColumn > this.state.csvData[0].length) { 
      errors.push("a valid column number to analyze"); 
    }
    if (this.state.ignoredRows === "") { errors.push("header rows"); }
    if (errors.length !== 0) {
      errors = ["Please enter " + errors.join(", ") + "."];
    }
    if (this.state.csvData.length !== 0) {
      try {
        let colOfInterest = [];
        for (let row = this.state.ignoredRows; row < this.state.csvData.length; row++) {
          colOfInterest.push(this.state.csvData[row][this.state.analysisColumn]);
        }
        mean(colOfInterest);
      } catch (e) {
        errors.push('Non-number values detected (did you forget to set header rows).');
      }
    }
    if (errors.length === 0) { return '' }
    return errors.join(' ');
  }

  // Callback for resizing the visualizer chart (takes '+' or any other value will decrease width)
  changeGraphSize(direction) {
    let newWidth;
    if (direction === '+') {
      newWidth = this.state.graphWidth + 200;
    } else {
      newWidth = this.state.graphWidth - 200;
    }
    this.setState({ graphWidth: newWidth });
  }

  // Callback for filtering lower/higher values only
  loadNegativeOnly(value, higherOrLower) {
    if (higherOrLower === 'lower') {
      this.setState({ filterLower: value });
    } else {
      this.setState({ filterHigher: value });
    }
  }

  // Callback for updating analysis column
  loadAnalysisColumn(event) {
    let confirmValue = event.target.value - 1;
    if (confirmValue === -1) { confirmValue = 0; }
    this.setState({ analysisColumn: confirmValue });
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

  // Callback for enabling/disabling interpolation
  loadInterpolateMode(isEnabled) {
    this.setState({ InterpolateMode: isEnabled });
  }

  // Callback for updating the filter cutoff input
  loadFilterCutoff(event) {
    this.setState({ filterCutoff: parseFloat(event.target.value) });
  }

  // Callback for updating the look distance
  loadLookDistance(event) {
    this.setState({ lookDistance: parseInt(event.target.value) });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div><About /></div>
        </header>
        <div className="app-body" style={{ paddingLeft: '25px' }}>
          {/* Left-hand Column - draw input/settings here! */}
          <div className="columns">
            <div className="column is-two-fifths max-450-px">
              <div
                className={this.state.isProcessing ? 'box dropout-controls isProcessing is-clearfix' : 'box dropout-controls is-clearfix'} >
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
                    <AnalysisColumn
                      callback={this.loadAnalysisColumn}
                      maxColumns={this.state.csvData.length === 0 ? '1' : this.state.csvData[0].length}
                      default={this.state.analysisColumn}
                    />
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
                <div className="columns">
                  <div className="column">
                    <InterpolateMode callback={this.loadInterpolateMode} />
                  </div>
                </div>
                <ErrorMsg errorMsg={this.state.errorMsg} />
                <button
                  className="button is-link is-light is-pulled-right"
                  disabled={this.state.csvData.length === 0 || this.state.errorMsg !== ''}
                  onClick={this.toggleProcessingData}
                >
                  {this.state.isProcessing ? 'Auto-processing' : 'Process'}
                </button>
                <ZoomButtons
                  graphWidth={this.state.graphWidth}
                  callback={this.changeGraphSize}
                  isProcessing={this.state.isProcessing} />
              </div>
              <FileStats
                {...this.state}
              />
            </div>

            <div className="column max-without-450-px">
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
