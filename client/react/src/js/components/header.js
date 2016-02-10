var React = require('react');
var SwapPage = require('./swap-page');
var CONSTANTS = require('../Constants.js');
var HTTP = require('../utils/http');

var http = new HTTP();

module.exports = React.createClass({
    displayName: 'Header',
    getInitialState: function () {
        http.get(CONSTANTS.FRONT_ENDS_URL)
			.then(http.parseJSON)
			.then(result => {
                var frontEnds = result.data.frontEnds;
                var newState = Object.keys(frontEnds)
                    .map(key => { return {key: key, title: frontEnds[key].title, location: frontEnds[key].location}; })
                    .sort( (a, b) => {
                        if (a.title === CONSTANTS.REACT_NAME) {
                            return -1;
                        }
                        if (b.title === CONSTANTS.REACT_NAME) {
                            return 1;
                        }
                        return a.title < b.title ? -1 : a.title === b.title ? 0 : 1;
                    })
                    .reduce( (acc, el) => {
                        acc[el.key] = el;
                        delete el.key;
                        return acc;
                    }, {})
				this.setState({frontEnds: newState});
			})
			.catch(errResult => {
				console.error(errResult.status, errResult.data);
			});
        return {frontEnds: { title: 'React', location: '#'}};
    },
	render: function () {
		return (
			<header>
				<div className="title">Chris Bauer</div>
				<SwapPage options={this.state.frontEnds} />
			</header>
		);
	}
});
