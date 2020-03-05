import React from 'react';
import { ResponsiveLineCanvas } from '@nivo/line'
import Processor from '../processing/processor';
/**
 *  See Nivo docs for more information: https://nivo.rocks/line/
 *  - will transform each column into a dataset/line
 *  Props expected:
 *  - graphWidth, csvData cleanedCsvData, ignoredRows, delRowNums
 **/
class Visualizer extends React.Component {
    render() {
        let graphData = Processor.toGraphData(
            this.props.csvData,
            this.props.cleanedCsvData,
            this.props.ignoredRows,
            this.props.delRowNums);
        console.log(graphData.colors);
        return (
            <div style={{ maxWidth: '700px', height: '630px', overflow: 'auto' }}>
                <div style={{
                    height: '600px',
                    width: this.props.graphWidth,
                }}>
                    <ResponsiveLineCanvas
                        data={graphData.data}
                        enableGridX={false}
                        margin={{ left: 60, bottom: 50, right: 50, top: 50 }}
                        axisLeft={{
                            orient: 'left',
                            legend: 'Value',
                            legendPosition: 'middle',
                            legendOffset: -40
                        }}
                        colors={[...graphData.colors]}
                        axisBottom={{
                            orient: 'bottom',
                            legend: 'Reading #',
                            legendPosition: 'start',
                            legendOffset: 40,
                            tickValues: [...graphData.axisBottomTickValues]
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