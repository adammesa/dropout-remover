import React from 'react';

class FileStats extends React.Component {

    render() {
        if (this.props.isProcessing) {
            let rowCount = this.props.csvData.length - this.props.ignoredRows;

            return (
                <div className="card">
                    <p>Stats: {this.props.delRowNums.length} of {rowCount} rows removed </p> 
                </div>
            );
        } else {
            return (<div></div>);
        }

    }
}

export default FileStats;