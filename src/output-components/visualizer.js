import React from 'react';
import { ResponsiveLineCanvas } from '@nivo/line'
import Processor from '../processing/processor';
/**
 *  See Nivo docs for more information: https://nivo.rocks/line/
 *  - will transform each column into a dataset/line
 * 
 * 
 **/
class Visualizer extends React.Component {
    render() {
        let graphData = Processor.toGraphData(
            this.props.csvData,
            this.props.cleanedCsvData,
            this.props.ignoredRows,
            this.props.delRowNums);
        let graphTickVals = graphData.pop();
        console.log(graphTickVals);
        return (
            <div style={{maxWidth: '700px', height: '630px', overflow: 'auto'}}>
                <div style={{
                    height: '600px',
                    width: '1600px',
                }}>
                    <ResponsiveLineCanvas
                        data={graphData}
                        enableGridX={false}
                        margin={{ left: 60, bottom: 50, right: 50, top: 50 }}
                        axisLeft={{
                            orient: 'left',
                            legend: 'Value',
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                        axisBottom={{
                            orient: 'bottom',
                            legend: 'Reading #',
                            legendPosition: 'start',
                            legendOffset: 40,
                            tickValues: [ ...graphTickVals]
                        }}
                        legends={[{
                            anchor: 'bottom-left',
                            direction: 'row',
                            translateX: 100,
                            translateY: 50,
                            itemWidth: 180,
                            itemHeight: 20
                        }]}
                    />
                </div>
            </div>
        );
    }
}

export default Visualizer;