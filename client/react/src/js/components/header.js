var React = require('react');
var injector = require('js-di').Injector;
var StaticHeader = injector.invoke(require('./static-header'));
var StickyHeader = injector.invoke(require('./sticky-header'));
var CONSTANTS = require('../Constants.js');
var Utils = require('../../../../dist/js/utils').default;

var HTTP = require('../utils/http');
var http = new HTTP();

module.exports = function () { 
    return React.createClass({
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
                    <StickyHeader frontEnds={this.state.frontEnds} />
                </div>
            );
        }
    })
};
