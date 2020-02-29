import React from 'react';

// Expects props:
// - "callback" which takes an integer
// - "default" (optional) which takes the starting number
// Specifies how many values ahead (and behind) to calculate if the current value is an outlier

class LookDistance extends React.Component {
    render() {
        return (
            <div className="field">
                <label>Compare {this.props.default} ahead &amp; behind</label>
                <div className="control">
                    <input 
                    className="input" 
                    type="number" 
                    onChange={this.props.callback} 
                    min="1"
                    step="1"
                    value={this.props.default}
                    placeholder="(Integers only)" />
                </div>
            </div>
        )
    }
}

export default LookDistance;