import React from 'react';

// Expects props:
// - "callback" which takes an array of numbers
// - "default" (optional) which takes the starting array
// - min row number
// - max row number
// Specifies which column to analyze 

class DropoutColumns extends React.Component {
    constructor(props) {
        super(props);
        const myVals = props.default;
        let inputVals = [];
        myVals.forEach(myVal => {
            inputVals.push(myVal + 1);
        });
        this.state = {
            inputVal: inputVals.join(', '),
            isSuccess: true
        }

        this.processInput = this.processInput.bind(this);
    }

    // String-processing helper function
    processInput(event) {
        const newValue = event.target.value;
        let newValueArray = newValue.replace(/\s/g, "").split(',');
        let zeroIndexArray = [];
        let valid = true;
        for (let i = 0; i < newValueArray.length; i++) {
            const val = parseInt(newValueArray[i]);
            if (!isNaN(val)) {
                const indexVal = val - 1;
                if (indexVal >= 0 && indexVal < this.props.maxColumns) {
                    
                    zeroIndexArray.push(indexVal);
                } else { 
                    valid = false; 
                }
            } else if (val === "") {
                // do nothing, but not invalid val
            } else {
                valid = false;
            }
        }
        if (valid) {
            this.props.callback(zeroIndexArray);
            this.setState({ inputVal: event.target.value, 
                isSuccess: true });
        } else {
            this.props.callback([]); //put empty array so it generates error message
            this.setState({
                inputVal: event.target.value, 
                isSuccess: false });
        }
    }


    render() {
        return (
            <div className="field">
                <label className="tag is-white">Columns to modify (comma separated)</label>
                <div className="control">
                    <input 
                    className={this.state.isSuccess 
                        ? "input is-small" : "input is-small is-danger"}
                    type="string" 
                    onChange={this.processInput} 
                    value={this.state.inputVal}
                    placeholder="(Comma separated (e.g. '1, 3, 4, 5'))" />
                </div>
            </div>
        )
    }
}

export default DropoutColumns;