var React = require('react');
var ScrollKeeper = require('../scroll-keeper')();

function buildAnchor (anchorId, anchorTitle) {
    var ret = {
        id: anchorId,
        title: anchorTitle,
        location: '#' + anchorId,
        element: document.getElementById(anchorId).parentElement
    };
    ret.updateOffset = () => {
        ret.position = ret.element.offsetTop - 1;
        return ret.position;
    };
    ret.updateOffset();
    
    return ret;
}

module.exports = React.createClass({
    displayName: 'Anchor',
    componentDidMount: function componentDidMount () {
        ScrollKeeper.registerAnchor(buildAnchor(this.props.anchorId, this.props.anchorTitle));
    },
    render: function () {
        return (
            <div className="anchor-wrapper">
                <a className="anchor" id={this.props.anchorId}></a>
            </div>
        );
    }
})