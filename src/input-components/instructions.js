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
                                    Upload a ".csv" file with any number of columns. Specify which column to analyze.
                                    Data in that column that is an outlier relative to its peers will be
                                    deleted (along with all numbers in that row).
                                </p>
                            </div>
                            <hr className="dropdown-divider" />
                            <div className="dropdown-item"> 
                                <b>Standard Deviation Mode </b><label className="tag">suggested</label>
                                <p>Compares the current data point to the specified amount of values ahead/behind (exclusive of this current point). If 
                                    the point is more than the specified cutoff value different from the unbiased standard deviation, the row will be removed.</p>
                            </div>
                            <div className="dropdown-item"> 
                                <b>Absolute Mode </b>
                                <p>Compares the current data point to the mean of the of values ahead/behind, if it is a static difference away, will be deleted."</p>
                            </div>
                            <hr className="dropdown-divider" />
                            <div className="dropdown-item">
                                <p>The program also lets you choose if dropouts can be lower (negative) compared to the average
                                    of the compared period, or higher, or both. This is useful if your sensor when reporting
                                    erroneous values, does so in one consistent direction. 
                                </p>
                                <p>
                                    <b>First/Last values</b>: If the program is unable to "look" the specified amount of cells
                                    behind or ahead of the current value, it will attempt to do so with the values that do exist
                                    within the current look range. (It will not attempt to look further "ahead" if there are not
                                    enough values "behind", however)
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