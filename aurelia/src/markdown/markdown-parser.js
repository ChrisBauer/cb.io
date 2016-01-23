
const UL_MATCH = '^[-*\+]';
const OL_MATCH = '^[0-9]+\.';
const ALL = '.*';

export default class MarkdownParser {


    constructor() {
        this.inUl = false;
        this.inOl = false;
    }

    parse(mdString) {
        var lines = mdString.split('\n');

        var a = lines.map(line => this.parseLine(line.trim())).join('\n');
        return a;
    }

    parseLine(line) {
        var parsedLineVal = '';
        if (line.match(this.createRegex(UL_MATCH))) {
            if (!this.inUl) {
                parsedLineVal += '<ul>\n';
                this.inUl = true;
            }
            parsedLineVal += line.replace(this.createRegex(UL_MATCH, ALL), (line, match, rest) => {
                return this.wrapWithTag('li', rest);
            });
        }
        else if (line.match(this.createRegex(OL_MATCH))) {
            if(!this.inOl) {
                parsedLineVal += '<ol>\n';
                this.inOl = true;
            }
            parsedLineVal += line.replace(this.createRegex(OL_MATCH, ALL), (line, match, rest) => {
                return this.wrapWithTag('li', rest);
            });
        }
        else {
            if (this.inUl) {
                parsedLineVal += '</ul>\n';
                this.inUl = false;
            }
            else if (this.inOl) {
                parsedLineVal += '</ol>\n';
                this.inOl = false;
            }

            if (line.match(/^#+/)) {
                parsedLineVal += line.replace(/(^\#+)(.*)/, (line, match, rest) => {
                    return this.wrapWithTag(('h' + (match.length < 7 ? match.length : 6)), rest.trim());
                });
            }
            else {
                parsedLineVal += this.wrapWithTag('p', line.trim());
            }

        }
        return parsedLineVal;
    }

    makeTag(tag, end) {
        return '<' + (end ? '/' : '') + tag + '>';
    }

    makeStartTag(tag) {
        return this.makeTag(tag, false);
    }

    makeEndTag(tag) {
        return this.makeTag(tag, true) + '\n';
    }

    wrapWithTag(tag, content) {
        return this.makeStartTag(tag) + content + this.makeEndTag(tag);
    }

    createRegex() {
        if (arguments.length === 1) {
            return new RegExp(arguments[0]);
        }
        return new RegExp(Array.prototype.map.call(arguments, arg => {
            return '(' + arg + ')';
        }).join(''));
    }
}