import React from 'react';
import CSVReader from 'react-csv-reader';
import CsvPreview from './csvpreview';

class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.beginCallback = this.beginCallback.bind(this);
        this.state = {
            innerCSVData: []
        }
    }

    beginCallback(newdata) {
        this.setState({ innerCSVData: newdata });
        this.props.callback(newdata);
    }

    render() {
        return (
            <div>
                <div className="pad-item-bottom">
                    <div className="columns">
                        <div className="column">
                            {/* <CSVReader onFileLoaded={data => console.log(data)} /> */}
                            <CSVReader
                                cssClass="control"
                                onFileLoaded={data => this.beginCallback(data)}
                            />
                        </div>
                        <div className="column">
                            <CsvPreview csvData={this.state.innerCSVData} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Uploader;