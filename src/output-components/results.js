import React from 'react';
import Processor from '../processing/processor';
import Visualizer from './visualizer';
import FileStats from './filestats';

// Props expected:
// - all state vars in app.js (csvData, SDmode, filterCutoff...)
// - callback function for when data is finished processing
class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delRowNums: [],
            valsDropped: 0,
            cleanedCsvData: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isProcessing) {
            this.processData();
        }
    }

    processData() {
        let result;
        if (!this.props.SDmode) {
            // Process absolute mode 
            result = Processor.processAbsolute(
                this.props.csvData,
                this.props.filterCutoff, this.props.filterLower,
                this.props.filterHigher, this.props.lookDistance,
                this.props.ignoredRows, this.props.analysisColumn
            );

            this.setState({
                delRowNums: result[0],
                cleanedCsvData: result[1]
            });
            console.log(result[2]);
        } else {
            // Process SD mode
        }
        console.log(Processor.processAbsolute(this.props.csvData));
    }

    render() {
        return (
            <div style={{ height: '100%' }}>
                <FileStats
                    {...this.state}
                    csvData={this.props.csvData}
                    ignoredRows={this.props.ignoredRows}
                />
                <Visualizer
                    {...this.state}
                    csvData={this.props.csvData}
                    ignoredRows={this.props.ignoredRows}
                    analysisColumn={this.props.analysisColumn}
                />
            </div>
        );
    }
}

export default Results;