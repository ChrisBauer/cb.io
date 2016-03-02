var React = require('react');
var classNames = require('classnames');

function ProgressTracker(ScrollKeeper) {
    return React.createClass({
        displayName: 'ProgressTracker',
        getInitialState: function () {
            ScrollKeeper.registerCallback( (anchors, currentAnchor) => {
                this.setState({
                    anchors: anchors,
                    currentAnchor: currentAnchor
                });
            });
            return {
                anchors: [],
                currentAnchor: null
            }
        },
        render: function () {
            var options = this.state.anchors.map( (anchor, i) => {
                var classes = classNames({
                    option: true,
                    selected: anchor === this.state.currentAnchor
                });
                return (
                    <div className={classes} key={i}>
                        <a href={anchor.location} title={anchor.title}>{anchor.title} </a>
                    </div>
                );
            });
            return (
                <div className="progress-tracker">
                    {options}
                </div>
            );
        }
    });
}

ProgressTracker._inject = ['ScrollKeeper'];

module.exports = ProgressTracker;
