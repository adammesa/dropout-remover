import React from 'react';

class CsvPreview extends React.Component {
    render() {
        if (this.props.csvData) {
            return (
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
            )
        } else {
            return (<div></div>);
        }

    }

}

export default CsvPreview;