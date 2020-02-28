import React from 'react';

// Expects a prop called "callback" which takes true (Standard deviation mode) or false (absolute units)
class SDFilter extends React.Component {
    constructor(props) {
        super(props);
        this.beginCallback = this.beginCallback.bind(this);
        this.state = {
            SDmode: true
        }
    }

    beginCallback(event) {
        if (event.target.value === "SDmode") {
            this.setState({ SDmode: true });
            this.props.callback(true);
        } else {
            this.setState({ SDmode: false });
            this.props.callback(false);
        }
    }

    render() {
        return (
            <div>
                <div className="field pad-item-bottom">
                    <label>Filtering mode:</label>
                    <div className="control">
                        <label className="radio">
                            <input
                                type="radio"
                                value="SDmode"
                                style={{ marginRight: '5px' }}
                                checked={this.state.SDmode}
                                onChange={this.beginCallback}
                            />
                            S.D. <span className="tag">Suggested</span>
                    </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="absolute"
                                style={{ marginRight: '5px', marginLeft: '25px' }}
                                checked={!this.state.SDmode}
                                onChange={this.beginCallback}
                            />
                            &nbsp;Absolute 
                    </label>
                    </div>
                </div>

            </div>
        )
    }
}

export default SDFilter;