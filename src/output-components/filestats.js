import React from 'react';

class FileStats extends React.Component {
    render() {
        if (this.props.isProcessing) {
            let droppedRowCount = this.props.delRowNums.length;
            return (
                <div className="box dropout-stats has-background-link has-text-white">
                    <div className="columns">
                        <div className="column">
                            <p className="is-size-4">
                                {this.props.csvData.length}
                            </p>
                            <p className="is-size-7">
                                Total Rows
                            </p>
                        </div>
                        <div className="column">
                        <p className="is-size-4">
                                {droppedRowCount}
                            </p>
                            <p className="is-size-7">
                                Rows Dropped
                            </p>
                        </div>
                        <div className="column">
                            <button className="button is-light is-pulled-right">
                                Download 
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div></div>);
        }

    }
}

export default FileStats;