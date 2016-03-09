var React = require('react');
var marked = require('marked');
var injector = require('js-di').Injector;
var Anchor = injector.invoke(require('./anchor'));
var HTTP = require('../utils/http');

var http = new HTTP();

module.exports = function () {
    return React.createClass({
        displayName: 'Section',
        getInitialState: function () {
            http.get(this.props.contentUrl)
                .then(http.parseJSON)
                .then(result => {
                    this.setState({content: this.generateMarkdown(result.data.content)});
                })
                .catch(errResult => {
                    console.error(errResult.status, errResult.data);
                });
            return {content: {__html: ''}};
        },
        generateMarkdown: function (mdContent) {
            return { __html: marked(mdContent, {sanitize: true}) };
        },
        render: function () {
            var lc = this.props.title.toLowerCase();
            return (
                
                    <section className={lc}>
                        <Anchor anchorId={lc} anchorTitle={this.props.title} />
                        <h3>{this.props.title}</h3>
                        <p dangerouslySetInnerHTML={this.state.content} />
                    </section>
            );
        }
    });
};
