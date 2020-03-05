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
                <div style={{textAlign: 'left'}} className={this.state.active ? "dropdown is-active" : "dropdown"}>
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
                                    Upload a ".csv" file with any number of columns. Specify which column to analyze (and how many rows are headers).
                                    Data in that column that is an outlier relative to its immediate peers will be
                                    deleted (along with its entire row).
                                </p>
                            </div>
                            <hr className="dropdown-divider" />
                            <div className="dropdown-item"> 
                                <b>Standard Deviation Mode </b><label className="tag">suggested</label>
                                <p>Compares the current data point to the specified amount of values ahead/behind (exclusive of this current point). If it is a 
                                   more than the specified cutoff value from the unbiased standard deviation, will "drop".</p>
                            </div>
                            <div className="dropdown-item"> 
                                <b>Absolute Mode </b>
                                <p>Compares the current data point to the mean of the of values ahead/behind, if it is a static difference away, will "drop."</p>
                            </div>
                            <hr className="dropdown-divider" />
                            <div className="dropdown-item">
                                <p>The program also lets you choose if dropouts can be lower (negative) compared to the average
                                    of the compared period, or higher, or both. This is useful if your sensor when reporting
                                    erroneous values, does so in one consistent direction. 
                                </p>
                                <p>

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InstructionsGuide;