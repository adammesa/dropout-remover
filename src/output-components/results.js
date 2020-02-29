import React from 'react';

// Props expected:
// - all state vars in app.js (csvData, SDmode, filterCutoff...)
// - callback function for when data is finished processing
class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valsDropped: 0,
            delRowNums: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isProcessing) {
            this.processData();
        } 
    }

    processData() {
        console.log("Processed!");
        // @TODO: Call-back function for when processing is complete
    }

    render() {
        return (
            <div>...</div>
        );
    }
}

export default Results;