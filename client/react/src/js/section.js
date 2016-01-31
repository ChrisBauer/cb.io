var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            <section>
				<h3>{this.props.title}</h3>
				<p>{this.props.content}</p>
			</section>
        )
    }
});