import React from 'react';

// Expects a prop called "callback" which 
//  takes true (interpolate values) or false (blank whole row)
class InterpolateMode extends React.Component {
    constructor(props) {
        super(props);
        this.beginCallback = this.beginCallback.bind(this);
        this.state = {
            InterpolateMode: true
        }
    }

    beginCallback(event) {
        if (event.target.value === "Interpolate") {
            this.setState({ InterpolateMode: true });
            this.props.callback(true);
        } else {
            this.setState({ InterpolateMode: false });
            this.props.callback(false);
        }
    }

    render() {
        return (
            <div>
                <div className="field pad-item-bottom">
                    <label>Action to take with dropouts:</label>
                    <div className="control">
                        <label className="radio">
                            <input
                                type="radio"
                                value="Interpolate"
                                style={{ marginRight: '5px' }}
                                checked={this.state.InterpolateMode}
                                onChange={this.beginCallback}
                            />
                            Interpolate values
                    </label>
                        <label className="radio">
                            <input
                                type="radio"
                                value="blank-row"
                                style={{ marginRight: '5px', marginLeft: '25px' }}
                                checked={!this.state.InterpolateMode}
                                onChange={this.beginCallback}
                            />
                            &nbsp;Erase values
                    </label>
                    </div>
                </div>

            </div>
        )
    }
}

export default InterpolateMode;