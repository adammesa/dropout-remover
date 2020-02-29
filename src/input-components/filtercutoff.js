import React from 'react';

// props:
// - "callback" which takes a number (of the cutoff value range)
// - "default" (optional) which takes the starting number

class FilterCutoff extends React.Component {
    render() {
        return (
            <div className="field">
                <label>Cutoff {this.props.mode ? 'deviation' : 'difference' }:</label>
                <div className="control">
                    <input 
                    className="input" 
                    type="number" 
                    onChange={this.props.callback} 
                    min="0"
                    step={this.props.mode ? '0.1' : '2'}
                    value={this.props.default}
                    placeholder="(A S.D. cutoff of 1.5 is recommended)" />
                </div>
            </div>
        )
    }
}

export default FilterCutoff;