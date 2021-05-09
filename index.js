const fs = require('fs');
const Remark = require('remark');
const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');
const slugify = require('slugify');
const { createRequireFromPath } = require('gatsby-core-utils');

const defaultTitleToURL = (title) => `/${slugify(title, { lower: true })}`;

const removeFrontmatter = (content) => content.replace(/^---[\s\S]+?---/, '');

const requireFromMDX = createRequireFromPath(require.resolve('@mdx-js/mdx'));
const toMDAST = requireFromMDX('remark-parse');
const remark = new Remark().use(toMDAST);

const plugin = ({ markdownAST }, options = {}) => {
    const { titleToURL = defaultTitleToURL, stripBrackets = true, highlightClassName = '', markdownFolder = '' } = options;

    visit(markdownAST, 'linkReference', (node, index, parent) => {
        const siblings = parent.children;
        const previous = siblings[index - 1];
        const next = siblings[index + 1];

        const isEmbed = previous?.value?.includes('![');

        if (!previous?.value?.includes('[', '![') || !next?.value?.includes(']')) {
            return;
        }

        previous.value = previous.value.replace('![', '');
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

        node.url = `${titleToURL(node.label)}${heading && `#${slugify(heading, { lower: true })}`}`;
        node.title = node.label;

        if (!stripBrackets) {
            node.children[0].value = `[[${node.children[0].value}]]`;
        }

        if (isEmbed && markdownFolder) {
            const filePath = `${markdownFolder}/${node.title}.md`;

            if (fs.existsSync(filePath)) {
                const content = removeFrontmatter(fs.readFileSync(filePath, 'utf8'));
                const embedAst = plugin({ markdownAST: remark.parse(content) });
                parent.children.splice(index, 1);
                embedAst.children.map((children) => parent.children.push(children));
            }
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

module.exports = plugin;
