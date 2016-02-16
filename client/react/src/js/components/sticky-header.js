var React = require('react');
var SwapPage = require('./swap-page');
var classNames = require('classnames');

const HEADER_HEIGHT = 240;

module.exports = React.createClass({
	displayName: 'StickyHeader',
	getInitialState: function getInitialState () {
		this.setupScrollHandler();
		return {
			isVisible: this.isVisible()
	   	};
	},
	isVisible: function isVisible () {
		return (document.documentElement.scrollTop || document.body.scrollTop) > HEADER_HEIGHT;
	},
	setupScrollHandler: function setupScrollHandler () {
		window.onscroll = () => {
			if (this.isVisible() !== this.state.isVisible) {
				this.setState({isVisible: !this.state.isVisible});
			}
		};
	},
	render: function render () {
		var classes = classNames({
			sticky: true,
			visible: this.state.isVisible
		});
		return (
			<header className={classes}>
				<div className="title">Chris Bauer</div>
				<SwapPage options={this.props.frontEnds} />
			</header>
		);
	}
});
