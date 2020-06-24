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
                <div style={{ textAlign: 'left' }} className={this.state.active ? "dropdown is-active" : "dropdown"}>
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
                                    marked as an outlier. All outlier rows will have the values under "columns to modify" either 
                                    deleted or interpolated based on your settings. <br/>
                                    <b>Note:</b> The preview graph currently only supports showing the modified values
                                    of your column of analysis: if you choose not to modify the column of analysis, you won't see any
                                    of your changes in the preview.
                                </p>
                            </div>
                            <hr className="dropdown-divider" />
                            <div className="dropdown-item">
                                <b>Standard Deviation Mode </b><label className="tag">default</label>
                                <p>Compares the current data point to the specified amount of values ahead/behind (exclusive of this
                                current point). If the difference is more than the specified cutoff value from the standard
                                    deviation (of the mean), the point is flagged as dropout.</p>
                            </div>
                            <div className="dropdown-item">
                                <b>Absolute Mode </b>
                                <p>Compares the current data point to the mean of the of values ahead/behind, if it is a static difference
                                    away from the mean, it will be modified."</p>
                            </div>
                            <div className="dropdown-item">
                                <p>
                                    <b>Interpolation</b> looks at the surrounding lookDistance-away values of the analysis column, and 
                                    calculates the mean of these values, ignoring any that would be considered a dropout themselves. 
                                    A new, "unbiased" mean is calculated which is taken as the interpolated value. For modifying
                                    columns that are not the analysis column, it calculates the mean of values from that column, but
                                    references the analysis column for guidance on which rows are dropouts and should be ignored from
                                    calculations of the mean.
                                </p>
                            </div>
                            <hr className="dropdown-divider" />
                            <div className="dropdown-item">
                                <p>
                                    The program also lets you choose if dropouts can be lower (negative) compared to the average
                                    of the compared period, or higher, or both. This is useful if your sensor reports
                                    erroneous values in one consistent direction.
                                </p>
                                <p>
                                    <i>First/Last values</i>: If the program is unable to "look" the specified amount of cells
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