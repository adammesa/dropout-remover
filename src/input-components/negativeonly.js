import React from 'react';

// Expects props:
// - "callback" which takes a toggle function(value, lower/higher)
// - "lowerDefault"
// - "higherDefault"
// Specifies whether or not to only drop numbers that are standard deviation/absolute amt lower/higher than the surrounding
//   values 

class NegativeOnly extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterLower: this.props.lowerDefault,
            filterHigher: this.props.higherDefault
        }
        this.beginHigherCallback = this.beginHigherCallback.bind(this);
        this.beginLowerCallback = this.beginLowerCallback.bind(this);
    }

    beginHigherCallback(event) {
        const bool = !this.state.filterHigher;
        this.setState({ filterHigher: bool });
        this.props.callback(bool, 'higher');
    }

    beginLowerCallback(event) {
        const bool = !this.state.filterLower;
        this.setState({ filterLower: bool });
        this.props.callback(bool, 'lower');
    }

    render() {
        return (
            <div className="field">
                <label>Dropouts are:</label>
                <label style={{marginLeft: '10px'}}className="checkbox">
                    <input checked={this.state.filterLower} onChange={this.beginLowerCallback} type="checkbox" />&nbsp;
                    Lower
                </label>
                <label style={{marginLeft: '10px'}} className="checkbox">
                    <input checked={this.state.filterHigher} onChange={this.beginHigherCallback} type="checkbox" />&nbsp;
                    Higher
                </label>
            </div>
        )
    }
}

export default NegativeOnly;