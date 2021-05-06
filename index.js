const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');
const slugify = require('slugify');

const defaultTitleToURL = (title) => {
    const segments = title.split('/');
    const slugifiedTitle = slugify(segments.pop());
    return `${segments.join('/')}/${slugifiedTitle}`;
};

module.exports = ({ markdownAST }, options = {}) => {
    const { titleToURL = defaultTitleToURL, stripBrackets = true, highlightClassName = '' } = options;

    visit(markdownAST, 'linkReference', (node, index, parent) => {
        const siblings = parent.children;
        const previous = siblings[index - 1];
        const next = siblings[index + 1];

        if (previous?.value !== '[' || next?.value !== ']') {
            return;
        }

        previous.value = previous.value.replace('[', '');
        next.value = next.value.replace(']', '');

        if (node.label.match(/\|/)) {
            [node.label, node.children[0].value] = node.label.split('|');
        }

        node.type = 'link';
        node.url = titleToURL(node.label);
        node.title = node.label;

        if (!stripBrackets) {
            node.children[0].value = `[[${node.children[0].value}]]`;
        }

        delete node.label;
        delete node.referenceType;
        delete node.identifier;
    });

    visit(markdownAST, 'paragraph', (node) => {
        const paragraph = toString(node);

        const regex = /==(.*)==/g;

        if (paragraph.match(regex)) {
            const html = paragraph.replace(regex, `<mark className="${highlightClassName}">$1</mark>`);
            node.type = 'html';
            node.children = undefined;
            node.value = `<p>${html}</p>`;
        }
    });

    return markdownAST;
};
