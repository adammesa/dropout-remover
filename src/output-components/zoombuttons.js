import React, { Component } from 'react';
import Icon from '@mdi/react';
import { mdiMagnifyPlusOutline, mdiMagnifyMinusOutline } from '@mdi/js';

/** 
 * Creates the zoom in / zoom out buttons for the graph. Props expected:
 *  - isProcessing (decides whether or not to include the buttons)
 *  - callback (updates graph width)
 *  - graphWidth (current graph width, used for disabling when too small)
 */
class ZoomButtons extends Component {
    render() {
        if (this.props.isProcessing) {
            return (
                <div className="is-pulled-right">
                    <button
                        className="button is-white"
                        disabled={this.props.graphWidth < 701}
                        onClick={() => this.props.callback('-')}
                    >
                        <Icon path={mdiMagnifyMinusOutline} size={1} />
                    </button>
                    &nbsp;
                    <button
                        className="button is-white"
                        onClick={() => this.props.callback('+')}
                    >
                        <Icon path={mdiMagnifyPlusOutline} size={1} />
                    </button>
                    &nbsp;
                </div>
            );
        } else {
            return (<div></div>);
        }

    }
}

export default ZoomButtons;