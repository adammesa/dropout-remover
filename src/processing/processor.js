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
        filterCutoff,
        filterLower,
        filterHigher,
        lookDistance,
        ignoredRows,
        analysisColumn) {
        let cleanData = [];
        let removedRows = [];
        // Push header columns onto CSV
        for (let row = 0; row < ignoredRows; row++) { cleanData.push(csvData[row]); }
        // Begin filtering the data
        for (let row = ignoredRows; row < csvData.length; row++) {
            if (this._isOutlier(row, csvData, SDmode, filterCutoff, filterLower,
                filterHigher, lookDistance, ignoredRows, analysisColumn)) {
                let emptyRow = [];
                for (let col = 0; col < csvData[row].length; col++) {
                    // Push empty values corresponding to amount of rows in original dataset
                    if (isNaN(parseInt(csvData[row][col]))) {
                        // looks like col contained text, don't delete
                        emptyRow.push(csvData[row][col]);
                    } else {
                        emptyRow.push(null);
                    }
                }
                cleanData.push(emptyRow);
                removedRows.push(row);
            } else {
                cleanData.push(csvData[row]);
            }
        }
        return { cleanedCsvData: cleanData, delRowNums: removedRows };
    }

    /*****
     * Checks if a value is an outlier compared to the neighbouring values 
     *
     * returns true if the value is an outlier, otherwise false
     * */
    static _isOutlier(row, csvData, SDmode, filterCutoff, filterLower, filterHigher, lookDistance, ignoredRows, analysisColumn) {
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
            if(pos === row) { 
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

    // Prepares are Nivo-ready dataset from (original) csvData, delrows, and
    //    new cleanedCsvData, with ignoredRows becoming the title of each dataset
    //    Returns a map of:
    //    { data: LineData, axisBottomTickValues: tickValues, colours: colour scheme }
    static toGraphData(
        csvData,
        cleanedCsvData,
        ignoredRows,
        analysisColumn,
        delRowNums) {
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
            let dataPoints = Processor.getCleanedDataPoints(ignoredRows, cleanedCsvData, delRowNums, analysisColumn);

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
    static getCleanedDataPoints(ignoredRows, cleanedCsvData, delRowNums, analysisColumn) {
        let dataPoints = [];
        let xPoint = 1;
        for (let row = ignoredRows; row < cleanedCsvData.length; row++) {
            if (delRowNums.includes(row)) {
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