import React from 'react';
import classNames from 'classnames';

function ProgressTracker(ScrollKeeper) {
    return React.createClass({
        displayName: 'ProgressTracker',
        getInitialState: function () {
            ScrollKeeper.registerCallback( (anchors, currentAnchor) => {
                this.setState({
                    anchors: anchors,
                    currentAnchor: currentAnchor
                });
            });
            return {
                anchors: [],
                currentAnchor: null,
                active: false
            }
        },
        activate: function () { 
            setTimeout( () => {
                this.setState({active: true});
            });
        },
        deactivate: function () { this.setState({active: false}) },
        handleClick: function (event) {
            if (this.state.active) {
                const anchor = this.state.anchors[event.currentTarget.dataset.rel];
                document.documentElement.scrollTop = document.body.scrollTop = anchor.position + 1;
                this.deactivate();
            }
            else {
            }
        },
        render: function () {
            const options = this.state.anchors.map( (anchor, i) => {
                const optionClasses = classNames({
                    option: true,
                    selected: anchor === this.state.currentAnchor
                });
                return (
                    <div className={optionClasses} key={i}>
                        <a onClick={this.handleClick} data-rel={i} title={anchor.title}>{anchor.title} </a>
                    </div>
                );
            });
            const progressTrackerClasses = classNames({
                'progress-tracker': true,
                active: !!this.state.active
            });
            return (
                <div onMouseEnter={this.activate} onClick={this.activate} onMouseLeave={this.deactivate} className={progressTrackerClasses}>
                    {options}
                </div>
            );
        }
    });
}

ProgressTracker._inject = ['ScrollKeeper'];

export default ProgressTracker;
