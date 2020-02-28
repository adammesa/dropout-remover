import React from 'react';

// Expects props:
// - "callback" which takes a number (of the cutoff value range)

class FilterCutoff extends React.Component {
    render() {
        return (
            <div className="field">
                <label>Cutoff value:</label>
                <div className="control">
                    <input 
                    className="input" 
                    type="number" 
                    onChange={this.props.callback} 
                    min="0"
                    step="0.1"
                    value={this.props.default}
                    placeholder="(A S.D. cutoff of 1.5 is recommended)" />
                </div>
            </div>
        )
    }
}

export default FilterCutoff;