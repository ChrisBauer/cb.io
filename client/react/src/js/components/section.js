var React = require('react');
var HTTP = require('../utils/http');

var http = new HTTP();
module.exports = React.createClass({
	getInitialState: function () {
		http.get('http://localhost:9000/rethink/resume')
			.then(result => {
				console.log(result.data);
				this.setState({resume: result.data});
			});
		return {resume: ''};
	},
    render: function () {
        return (
            <section>
				<h3>{this.props.title}</h3>
				<p>{this.props.contentUrl}</p>
				<p>{this.state.resume}</p>
			</section>
        )
    }
});
