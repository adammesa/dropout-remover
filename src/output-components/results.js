import React from 'react';
import Visualizer from './visualizer';

// Props expected:
// - all state vars in app.js (csvData, SDmode, filterCutoff...)
// - callback function for when data is finished processing
class Results extends React.Component {
    render() {
        if (this.props.csvData.length > 0 && this.props.isProcessing) {
            return (
                <div style={{ height: '100%' }}>
                    <Visualizer
                        csvData={this.props.csvData}
                        cleanedCsvData={this.props.cleanedCsvData}
                        ignoredRows={this.props.ignoredRows}
                        analysisColumn={this.props.analysisColumn}
                        interpolateMode={this.props.InterpolateMode}
                        dropoutRowNums={this.props.dropoutRowNums}
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