import React, { Component } from 'react';
import Icon from '@mdi/react';
import { mdiAlert } from '@mdi/js';

class ErrorMsg extends Component {
    render() {
        if (this.props.errorMsg === '') {
            return (<div></div>);
        } else {
            return (
            <div className='tag is-warning is-light'>
                <Icon path={mdiAlert} size={0.5} color={'#947600'} />&nbsp;{this.props.errorMsg}
            </div>
            );
        }
    }
}

export default ErrorMsg;