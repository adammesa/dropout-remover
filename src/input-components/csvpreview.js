import React from 'react';

class CsvPreview extends React.Component {
    constructor(props) {
        super(props);
        this.toggleClass = this.toggleClass.bind(this);
        // keep track of current state
        this.state = {
            active: false,
        };
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({ active: !currentState });
    }

    // Pass "csvData" to this component
    render() {
        // @TODO: add logic here to hide when file not chosen
        if (this.props.csvData.length === 0 || !this.props.csvData) {
            return (<div></div>)
        }
        return (
            <div>
                <div className={this.state.active ? "dropdown is-active is-pulled-right" : "dropdown is-pulled-right"}>
                    <div className="dropdown-trigger">
                        <button className="button is-small is-text" aria-haspopup="true" onClick={this.toggleClass}>
                            <span>Snippet</span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-instructions" role="menu">
                        <div className="dropdown-content">
                            <div className="dropdown-item">
                            <button className="delete" onClick={this.toggleClass} style={{ float: 'right' }}>Hide</button>
                                <table className="table is-striped is-narrow is-bordered">
                                    <tbody>
                                        {this.props.csvData.slice(0, 6).map((row, index) => (
                                            <tr key={row + index}>
                                                {row.map((col, cindex) => (
                                                    <td key={cindex}>{col}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}



export default CsvPreview;