var React = require('react');

module.exports = function () {
    return React.createClass({
        displayName: 'SwapPage',
        render: function () {
            var options = Object.keys(this.props.options).map(key => {
                var option = this.props.options[key];
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
