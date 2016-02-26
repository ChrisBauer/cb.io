var React = require('react');
var StaticHeader = require('./static-header');
var StickyHeader = require('./sticky-header');
var CONSTANTS = require('../Constants.js');
var Utils = require('../../../../dist/js/utils').default;

var HTTP = require('../utils/http');
var http = new HTTP();

module.exports = React.createClass({
    displayName: 'Header',
    getInitialState: function () {
        http.get(CONSTANTS.FRONT_ENDS_URL)
			.then(http.parseJSON)
			.then(result => Utils.processFrontEnds(result.data.frontEnds, CONSTANTS.REACT_NAME))
            .then(frontEnds => {
                this.setState({
                    frontEnds: frontEnds
                });
            })
			.catch(errResult => {
				console.error(errResult.status, errResult.data);
			});
        return {frontEnds: [{title: 'React', location: '#'}] };
    },
	render: function () {
		return (
			<div className="header-wrapper">
				<StaticHeader frontEnds={this.state.frontEnds} />
				<StickyHeader frontEnds={this.state.frontEnds} registrar={this.props.registrar} />
			</div>
		);
	}
});
