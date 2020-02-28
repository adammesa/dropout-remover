import React from 'react';
import CSVReader from 'react-csv-reader';

class Uploader extends React.Component {
    render() {
        return (
            <div>
                {/* <CSVReader onFileLoaded={data => console.log(data)} /> */}
                <CSVReader onFileLoaded={data => this.props.callback(data)} />
            </div>
        )
    }
}

export default Uploader;