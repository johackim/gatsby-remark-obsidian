const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');
const slugify = require('slugify');

const defaultTitleToURL = (title) => `/${slugify(title, { lower: true })}`;

module.exports = ({ markdownAST }, options = {}) => {
    const { titleToURL = defaultTitleToURL, stripBrackets = true, highlightClassName = '' } = options;

    visit(markdownAST, 'linkReference', (node, index, parent) => {
        const siblings = parent.children;
        const previous = siblings[index - 1];
        const next = siblings[index + 1];

        if (!previous?.value?.includes('[') || !next?.value?.includes(']')) {
            return;
        }

        previous.value = previous.value.replace('[', '');
        next.value = next.value.replace(']', '');

        let heading = '';
        node.type = 'link';

        if (node.label.match(/#/)) {
            [node.children[0].value, heading] = node.label.split('#');
            [heading] = heading.split('|');
            node.label = node.label.replace(`#${heading}`, '');
        }

        if (node.label.match(/\|/)) {
            [node.label, node.children[0].value] = node.label.split('|');
        }

        node.url = `${titleToURL(node.label)}${heading && `#${heading}`}`;
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
