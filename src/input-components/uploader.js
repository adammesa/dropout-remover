import React from 'react';
import CSVReader from 'react-csv-reader';
import CsvPreview from './csvpreview';
import Processor from '../processing/processor';

class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.beginCallback = this.beginCallback.bind(this);
        this.state = {
            innerCSVData: []
        }
    }

    beginCallback(newdata) {
        /// Removes trailing rows from the uploaded file as well (CSVs commonly have hundreds of empty rows)
        let newCsvData = Processor.removeTrailingEmpties(newdata);
        this.setState({ innerCSVData: newCsvData });
        this.props.callback(newCsvData);
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