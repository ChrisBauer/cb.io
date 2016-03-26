import React from 'react';
import classNames from 'classnames';

export default function SwapPage () {
    return React.createClass({
        displayName: 'SwapPage',
        getInitialState: function () {
            return {
                active: false
            };
        },
        activate: function () { 
            setTimeout( () => {
                this.setState({active: true});
            });
        },
        deactivate: function () { this.setState({active: false}) },
        handleClick: function (event) {
            if (this.state.active) {
                window.location.href = event.currentTarget.dataset.rel;
            }
        },
        render: function () {
            const options = Object.keys(this.props.options).map(key => {
                let option = this.props.options[key];
                return (
                    <div key={key} className="option">
                        <a onClick={this.handleClick} data-rel={option.location} title={option.title}>{option.title} </a>
                    </div>
                );
            });

            const classes = classNames({
                'swap-page': true,
                active: this.state.active
            });

            return (
                <div onMouseEnter={this.activate} onClick={this.activate} onMouseLeave={this.deactivate} className={classes}>
                    {options}
                </div>
            );
        }
    });
};
