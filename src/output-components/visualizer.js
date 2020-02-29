import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import Processor from '../processing/processor';
/**
 *  See Nivo docs for more information: https://nivo.rocks/line/
 *  - will transform each column into a dataset/line
 * 
 * 
 **/
class Visualizer extends React.Component {
    constructor(props) {
        super(props);
        // console.log('visualizer loaded');
    }

    componentDidUpdate() {
        // console.log('visualizer updated');
    }

    render() {
        if (this.props.cleanedCsvData.length === 0) {
            return (<div></div>);
        }
        return (
            <div>
                <div style={{ height: '100%', width: '100%' }}>
                    <ResponsiveLine
                        data={Processor.toGraphData(
                            this.props.csvData,
                            this.props.cleanedCsvData,
                            this.props.ignoredRows,
                            this.props.delRowNums)}
                    />
                </div>
            </div>
        );
    }
}

export default Visualizer;