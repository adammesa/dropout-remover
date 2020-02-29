/**
 *  Data Processor Code
 *  - Created by Adam Mesa (Krassioukov Lab, Faculty of Medicine, 
 *      The University of British Columbia, BC, Canada)
 *  - this simple algorithm takes in the user's settings/csvData and returns an 
 *      array of row numbers to be dropped from the given csv data, as well as a
 *      new array which has said numbers dropped.
 **/
class Processor {
    // returns an array of (1) list of row #s pruned, (2) new csv Data after pruning
    static processAbsolute(csvData, filterCutoff, filterLower,
        filterHigher, lookDistance, ignoredRows, analysisColumn) {
        let delRowNums = [];
        let currRow = ignoredRows + 1;
        let cleanedCsvData = [];

        return [
            delRowNums,
            cleanedCsvData
        ];
    }

    // Prepares are Nivo-ready dataset from (original) csvData, delrows, and
    //    new cleanedCsvData, with ignoredRows becoming the title of each dataset
    static toGraphData(
        csvData,
        cleanedCsvData,
        ignoredRows,
        analysisColumn,
        delRowNums) {
        let columns = csvData[0].length;
        let graphData = [];
        for (let col = 1; col <= columns; col++) {
            let dataPoints = [];
            let xPoint = 1;
            for (let row = ignoredRows; row < csvData.length; row++) {
                if (analysisColumn === col && delRowNums.includes(row)) {
                    // Skip this data point; create null so it shows up as break
                    dataPoints.push({x: xPoint, y: null});
                } else {
                    dataPoints.push({
                        x: xPoint,
                        y: csvData[row][col]
                    });
                }
                xPoint++;
            }

            let currentLine = {
                id: this.getColName(csvData, col, ignoredRows),
                data: dataPoints
            };
            graphData.push(currentLine);
        }
        console.log('Returning graphdata for ' + this.getColName(csvData, 1, ignoredRows));
        return graphData;
    }

    // Combines the contents of the ignored rows to form a column title
    static getColName(csvData, column, ignoredRows) {
        let title;
        for (let row = 0; row < ignoredRows; row++) {
            title = title + ' ' + csvData[row][column];
        }
        return title;
    }

    /** Chart Data
     * Array<{
     *   id:   string | number
     *   color: hsl(int, %, %)     (optional)
     *   data: Array<{
     *     x: number | string | Date
     *     y: number | string | Date
     *   }>
     * }>
     */
}

export default Processor;