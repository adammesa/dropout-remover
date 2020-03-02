import React from 'react';
import Processor from '../processing/processor';
import Visualizer from './visualizer';

// Props expected:
// - all state vars in app.js (csvData, SDmode, filterCutoff...)
// - callback function for when data is finished processing
class Results extends React.Component {
    constructor(props) {
        super(props);
        // @TODO: not necessary here, need to move upward to main app
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
        } else {
            // Process SD mode
        }
        console.log(Processor.processAbsolute(this.props.csvData));
    }

    render() {
        if (this.props.csvData.length > 0 && this.props.isProcessing) {
            return (
                <div style={{ height: '100%' }}>
                    <Visualizer
                        {...this.state}
                        csvData={this.props.csvData}
                        ignoredRows={this.props.ignoredRows}
                        analysisColumn={this.props.analysisColumn}
                        graphWidth={this.props.graphWidth}
                    />
                </div>
            );
        } else {
            return (<div></div>);
        }

    }
}

export default Results;