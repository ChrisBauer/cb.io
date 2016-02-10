var React = require('React');

module.exports = React.createClass({
    displayName: 'SwapPage',
	render: function () {
		console.log(this.props.options);
		var options = Object.keys(this.props.options).map(key => {
			var option = this.props.options[key];
			return (
				<div key={key} className="option">
					<a href={option.location} title={option.title}>{option.title}</a>
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
