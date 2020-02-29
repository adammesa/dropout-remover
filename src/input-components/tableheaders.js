import React from 'react';

// Expects props:
// - "callback" which takes an integer
// - "default" (optional) which takes the starting number
// Specifies how many rows from the top are tables / should be ignored

class TableHeaders extends React.Component {
    render() {
        return (
            <div className="field">
                <label className="tag is-white">Header rows</label>
                <div className="control">
                    <input 
                    className="input is-small" 
                    type="number" 
                    onChange={this.props.callback} 
                    min="0"
                    step="1"
                    value={this.props.default}
                    placeholder="(Integers only)" />
                </div>
            </div>
        )
    }
}

export default TableHeaders;