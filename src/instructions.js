import React from 'react';


class InstructionsGuide extends React.Component {
    constructor(props) {
        super(props);
        this.toggleClass = this.toggleClass.bind(this);
        this.state = {
            active: false,
        };
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    }

    render() {
        return (
            <div>
                <div className={this.state.active ? "dropdown is-active" : "dropdown"}>
                    <div className="dropdown-trigger">
                        <button className="button is-text" aria-haspopup="true" onClick={this.toggleClass}>
                            <span>Instructions</span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-instructions" role="menu">
                        <div className="dropdown-content">
                            <div className="dropdown-item">
                                <p>
                                    <button className="delete" onClick={this.toggleClass} style={{ float: 'right' }}>Hide</button>
                                    Upload a ".csv" file with any number of columns, and specify which column to analyze.
                                    Data in that column that is an outlier relative to its immediate peers will be
                                    deleted (along with its entire row).
                                </p>
                            </div>
                            <hr className="dropdown-divider" />
                            <div className="dropdown-item">
                                <p>Audit the code on github</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InstructionsGuide;