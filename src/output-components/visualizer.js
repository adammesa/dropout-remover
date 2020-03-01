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
    // constructor(props) {
    //     super(props);
    //     // console.log('visualizer loaded');
    // }

    // componentDidUpdate() {
    //     // console.log('visualizer updated');
    // }

    render() {
        let graphData = Processor.toGraphData(
            this.props.csvData,
            this.props.cleanedCsvData,
            this.props.ignoredRows,
            this.props.delRowNums);
        let graphTickVals = graphData.pop();
        console.log(graphTickVals);
        return (
            <div>
                <div style={{ height: '700px', width: '700px', maxHeight: '100%', maxWidth: '100%' }}>
                    <ResponsiveLine
                        data={graphData}
                        enableGridX={false}
                        margin={{ left: 60, bottom: 50 }}
                        axisLeft={{
                            orient: 'left',
                            legend: 'Value',
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                        axisBottom={{
                            orient: 'bottom',
                            legend: 'Reading #',
                            legendPosition: 'middle',
                            legendOffset: 36,
                            tickValues: {...graphTickVals}
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default Visualizer;