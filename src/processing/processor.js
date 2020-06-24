import { std, mean } from 'mathjs'
/**
 *  Data Processor Code
 *  - Created by Adam Mesa (Krassioukov Lab, Faculty of Medicine, 
 *      The University of British Columbia, BC, Canada)
 *  - this simple algorithm takes in the user's settings/csvData and returns an 
 *      array of row numbers to be dropped from the given csv data, as well as a
 *      new array which has said numbers dropped.
 **/
class Processor {
    // Cleans the given csvData according to the passed variables and returns a map of: 
    // (1) cleanedCsvData, (2) array of dropped rows
    static cleanData(
        csvData,
        SDmode,
        interpolateMode,
        filterCutoff,
        filterLower,
        filterHigher,
        lookDistance,
        ignoredRows,
        analysisColumn,
        dropoutColumns) {
        let cleanData = [];
        let dropoutRows = [];
        // Push header columns onto CSV
        for (let row = 0; row < ignoredRows; row++) { cleanData.push(csvData[row]); }
        // Begin filtering the data
        for (let row = ignoredRows; row < csvData.length; row++) {
            if (this._isOutlier(row, csvData, SDmode, filterCutoff, filterLower,
                filterHigher, lookDistance, ignoredRows, analysisColumn)) {
                dropoutRows.push(row);
            } 
        }

        for (let row = ignoredRows; row < csvData.length; row++) {
            if (dropoutRows.includes(row)) {
                cleanData.push(this._modifyDropoutRow(row, csvData, interpolateMode, 
                    lookDistance, ignoredRows, dropoutColumns, dropoutRows));
            } else {
                cleanData.push(csvData[row]);
            }
        }
        return { cleanedCsvData: cleanData, dropoutRowNums: dropoutRows };
    }

    /***
     * Modifies the values of a row flagged as a dropout according to interpolateMode.
     * - @param row a dropout row to modify 
     * - @param dropoutRowNums all dropout rows (to ensure neighbouring dropout values aren't included in interpolation
     *                         calculations)
     * - returns the complete, adjusted row (with both adjusted values and values not flagged for adjustment)
     */
    static _modifyDropoutRow(row, csvData, interpolateMode, lookDistance, ignoredRows, dropoutColumns, dropoutRowNums) {
        let modifiedRow = [];
        for (let col = 0; col < csvData[row].length; col++) {
            if (dropoutColumns.includes(col)) {
                if (interpolateMode) {
                    modifiedRow.push(this._interpolatePoint(row, csvData, lookDistance, ignoredRows, col, dropoutRowNums));
                } else {
                    modifiedRow.push(null);
                }
            } else {
                modifiedRow.push(csvData[row][col]);
            }
        }
        return modifiedRow; 
    }

    /*****
     * Checks if a value is an outlier compared to the neighbouring values 
     * @returns bool - true if the value is an outlier, otherwise false
     * */
    static _isOutlier(
        row,
        csvData,
        SDmode,
        filterCutoff,
        filterLower,
        filterHigher,
        lookDistance,
        ignoredRows,
        analysisColumn) {
        let neighbouringVals = [];
        let firstComparisonPoint = row - lookDistance;
        let lastComparisonPoint = row + lookDistance;
        let isOutlier = false;
        let currentVal;

        if (firstComparisonPoint < ignoredRows) {
            // Values "behind" of the current point aren't enough for lookDistance, so process current point as best possible
            firstComparisonPoint = ignoredRows;
        } else if (lastComparisonPoint > (csvData.length - 1)) {
            // Values "ahead" of the current point aren't enough for lookDistance, so process current point as best possible
            lastComparisonPoint = (csvData.length - 1);
        }
        for (let pos = firstComparisonPoint; pos < lastComparisonPoint; pos++) {
            if (pos === row) {
                currentVal = csvData[pos][analysisColumn];
            } else {
                neighbouringVals.push(csvData[pos][analysisColumn]);
            }
        }
        /**
         * Dropout logic
         */
        let average = mean(neighbouringVals);
        let currentDifference = currentVal - average;
        // Is current value lower than its peers and are we filtering lower?
        if (currentDifference < 0 && filterLower) {
            if (SDmode) {
                let stdeviation = std(neighbouringVals);
                isOutlier = currentDifference < (-stdeviation * filterCutoff);
            } else {
                isOutlier = currentDifference < (-filterCutoff);
            }
        } else
            // Is current value higher than its peers and are we filtering higher?
            if (currentDifference > 0 && filterHigher) {
                if (SDmode) {
                    let stdeviation = std(neighbouringVals);
                    isOutlier = currentDifference > (stdeviation * filterCutoff);
                } else {
                    isOutlier = currentDifference > (filterCutoff);
                }
            }
        return isOutlier;
    }

    /**
     * Creates an interpolated value based on lookDistance, ignoring any surrounding values
     *   that are also below or above the cutoffs. 
     * @param targetRow the row to interpolate
     * @param csvData the file's CSV data
     * @param lookDistance used for fetching values to interpolate between
     * @param ignoredRows the starting point accounted for by 'header rows'
     * @param targetColumn The column to average across
     * @param dropoutRowNums the list of all dropouts; to be ignored in interpolation if encountered
     * @return the interpolated value of the surrounding values
     */
    static _interpolatePoint(targetRow, csvData, lookDistance, ignoredRows, targetColumn, dropoutRowNums) {
        let neighbouringVals = [];
        let firstComparisonPoint = targetRow - lookDistance;
        let lastComparisonPoint = targetRow + lookDistance;
        if (firstComparisonPoint < ignoredRows) { firstComparisonPoint = ignoredRows; }
        if (lastComparisonPoint > (csvData.length - 1)) { lastComparisonPoint = csvData.length - 1; }
        for (let pos = firstComparisonPoint; pos < lastComparisonPoint; pos++) {
            if (dropoutRowNums.includes(pos)) {
                // The current row is a row flagged for modification, don't include it in averaging
            } else {
                neighbouringVals.push(csvData[pos][targetColumn]);
            }
        }
        const average = mean(neighbouringVals);
        return average;
    }

    // Prepares are Nivo-ready dataset from (original) csvData, delrows, and
    //    new cleanedCsvData, with ignoredRows becoming the title of each dataset
    //    Returns a map of:
    //    { data: LineData, axisBottomTickValues: tickValues, colours: colour scheme }
    static toGraphData(
        csvData,
        cleanedCsvData,
        ignoredRows,
        interpolateMode,
        analysisColumn,
        dropoutRowNums) {
        let columns = csvData[0].length;
        let graphData = [];
        let colorsList = [];
        let defaultColorsList = ["#b3e2cd", "#fdcdac", "#f4cae4", "#fff2ae", "#f1e2cc"]
        let endPoint = 0;
        for (let col = 0; col < columns; col++) {
            let dataPoints = [];
            let xPoint = 1;
            for (let row = ignoredRows; row < csvData.length; row++) {
                // Must first check that row val is a number, otherwise don't push
                if (!isNaN(parseInt(csvData[row][col]))) {
                    dataPoints.push({
                        x: xPoint,
                        y: parseFloat(csvData[row][col])
                    });
                    if (xPoint > endPoint) {
                        // Used in axis tick calculations
                        endPoint = xPoint;
                    }
                }
                xPoint++;
            }
            let currentLine;
            if (analysisColumn === col) {
                /// Sets a light blue colour so the pruned dataset can be darker and stand out
                currentLine = {
                    id: this._getColName(csvData, col, ignoredRows),
                    data: dataPoints
                }
                colorsList.push("hsl(204, 100%, 85%");
            } else {
                currentLine = {
                    id: this._getColName(csvData, col, ignoredRows),
                    data: dataPoints
                };
                // use a pastel colour
                colorsList.push(defaultColorsList[col % defaultColorsList.length]);
            }
            graphData.push(currentLine);
        }
        if (cleanedCsvData.length > 0) {
            let dataPoints = Processor.getCleanedDataPoints(ignoredRows,
                cleanedCsvData, interpolateMode, dropoutRowNums, analysisColumn);

            graphData.push({
                id: this._getColName(cleanedCsvData, analysisColumn, ignoredRows) + ' dropped',
                data: dataPoints
            });
            colorsList.push("hsl(204, 100%, 50%)");
        }
        let tenthPoint = Math.round(endPoint / 10);
        let tickVals = [1, tenthPoint,
            tenthPoint * 2,
            tenthPoint * 3,
            tenthPoint * 4,
            tenthPoint * 5,
            tenthPoint * 6,
            tenthPoint * 7,
            tenthPoint * 8,
            tenthPoint * 9,
            endPoint
        ];

        return { data: graphData, axisBottomTickValues: tickVals, colors: colorsList };
    }

    /***
     *  Helper function to get plottable datapoints of the desired line from the
     *  clean data set.
     **/
    static getCleanedDataPoints(ignoredRows, cleanedCsvData, interpolateMode,
        dropoutRowNums, analysisColumn) {
        let dataPoints = [];
        let xPoint = 1;
        for (let row = ignoredRows; row < cleanedCsvData.length; row++) {
            if (!interpolateMode && dropoutRowNums.includes(row)) {
                dataPoints.push({ x: xPoint, y: null });
            }
            else {
                if (!isNaN(parseInt(cleanedCsvData[row][analysisColumn]))) {
                    dataPoints.push({ x: xPoint, y: cleanedCsvData[row][analysisColumn] });
                }
            }
            xPoint++;
        }
        return dataPoints;
    }

    // Returns an csv matrix with all empty trailing rows removed
    static removeTrailingEmpties(csvData) {
        let originalLength = csvData.length
        let encounteredLastVal = false;
        // Declaring this func outside of for loop avoids 'no-loop-func' error
        function isLastVal(val) {
            if (!isNaN(parseInt(val))) {
                encounteredLastVal = true;
            }
        }

        for (let row = 0; row < originalLength; row++) {
            if (!encounteredLastVal) {
                let rowVals = csvData.pop();
                rowVals.forEach((val) => isLastVal(val));
                if (encounteredLastVal) {
                    csvData.push(rowVals);
                    row = row + csvData.length; // shortcut to end pointless looping
                }
            }
        }
        return csvData;
    }



    // Combines the contents of the ignored rows to form a column title
    static _getColName(csvData, column, ignoredRows) {
        let title = '';
        for (let row = 0; row < ignoredRows; row++) {
            title = title + csvData[row][column] + ' ';
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