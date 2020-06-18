import React from 'react';


class About extends React.Component {
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
                            <span>about & security</span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-instructions" role="menu">
                        <div className="dropdown-content">
                            <div className="dropdown-item">
                                <p>
                                    <button className="delete" onClick={this.toggleClass} style={{ float: 'right' }}>Hide</button>
                                    <b>About</b><br/> 
                                    This tool was created by Adam Mesa in Krassioukov Lab (Autonomic Research Unit, ICORD, University of British
                                    Columbia, BC, Canada). It was made to help with physiologic devices re-calibrating mid-reading that would
                                    report values far below expected before returning to the expected/consensus readings of our other devices.<br/>
                                </p>
                                <p>
                                    <b>Interpolation</b> looks at the surrounding lookDistance-away values, and calculates the mean of these values,
                                    ignoring any that would be considered a dropout themselves. This mean value is the interpolated value.
                                </p>
                            </div>
                            <hr className="dropdown-divider" />
                            <div className="dropdown-item">
                                <p>
                                    <b>Security</b><br />
                                    This tool is offline-only: all processing happens on your computer (via JavaScript). Nothing is sent to any
                                    external servers - all your sensitive data stays on your PC. It is also possible to "install" this application
                                    via Google Chrome/FireFox, allowing you to have a start-menu icon if you prefer.
                                </p>
                            </div>
                            <hr className="dropdown-divider" />
                            <div className="dropdown-item"> 
                                <b>Versions </b>
                                <label className="tag">Current: v1.1</label>&nbsp;
                                <a className="tag is-link" href="https://github.com/adammesa/dropout-remover" target="_blank">
                                    Source Code &#8594;
                                </a>
                                <div>
                                    <ul>
                                        <li>v1.1 - June 2020; Added Interpolation, bugfixes, & better error catches</li>
                                        <li>v1.0.1 - June 2020; Bugfixes, minor usability improvements</li>
                                        <li>v1.0 - March 2020; Initial Release</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;