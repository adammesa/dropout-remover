import React from 'react';

class FileStats extends React.Component {

    render() {
        let rowCount = this.props.csvData.length - this.props.ignoredRows;

        return (
            <div>
                <p>Stats: {this.props.delRowNums.length} of {rowCount} rows removed </p> 
            </div>
        );
    }
}

export default FileStats;