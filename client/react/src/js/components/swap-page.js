import React from 'react';

export default function SwapPage () {
    return React.createClass({
        displayName: 'SwapPage',
        render: function () {
            const options = Object.keys(this.props.options).map(key => {
                let option = this.props.options[key];
                return (
                    <div key={key} className="option">
                        <a href={option.location} title={option.title}>{option.title} </a>
                    </div>
                );
            });

            return (
                <div className="swap-page">
                    {options}
                </div>
            );
        }
    });
};
