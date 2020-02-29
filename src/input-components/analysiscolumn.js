import React from 'react';

// Expects props:
// - "callback" which takes an integer
// - "default" (optional) which takes the starting number
// Specifies which column to analyze 

class AnalysisColumn extends React.Component {
    render() {
        return (
            <div className="field">
                <label className="tag is-white">Column to analyze</label>
                <div className="control">
                    <input 
                    className="input is-small" 
                    type="number" 
                    onChange={this.props.callback} 
                    min="1"
                    max={this.props.maxColumns}
                    step="1"
                    value={this.props.default}
                    placeholder="(Integers only)" />
                </div>
            </div>
        )
    }
}

export default AnalysisColumn;