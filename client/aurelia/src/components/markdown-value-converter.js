import marked from 'marked';

export class MarkdownValueConverter {
  toView (val) {
    return val ? marked.parse(val) : '';
  }
}
