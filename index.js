const fs = require('fs');
const visit = require('unist-util-visit');
const Remark = require('remark');
const toString = require('mdast-util-to-string');
const breaks = require('remark-breaks');
const slugify = require('slugify');
const { createMdxAstCompiler } = require('@mdx-js/mdx');

const defaultTitleToURL = (title) => `/${slugify(title, { lower: true })}`;

const removeFrontmatter = (content) => content.replace(/^---[\s\S]+?---/, '');

const compiler = createMdxAstCompiler({ remarkPlugins: [] });

const remark = new Remark().use(breaks);

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
                const embedAst = plugin({ markdownAST: compiler.parse(content) }, options);
                parent.children.splice(index, 1);
                embedAst.children.map((children) => parent.children.push(children));
            }
        }

        delete node.label;
        delete node.referenceType;
        delete node.identifier;
    });

    visit(markdownAST, 'paragraph', (node, index, parent) => {
        const text = toString(node);

        const internalLinkRegex = /!?\[\[([a-zA-Z-'À-ÿ|# ]+)\]\]/;

        if (text.match(internalLinkRegex)) {
            const isEmbed = text.includes('![');

            let label = text.match(internalLinkRegex)[0].replace(/!?\[|\]/g, '');
            let heading = '';

            if (label.match(/#/)) {
                [, heading] = label.split('#');
                [heading] = heading.split('|');
                label = label.replace(`#${heading}`, '');
            }

            let url = titleToURL(label);

            if (label.match(/\|/)) {
                [url, label] = label.split('|');
                url = titleToURL(url);
            }

            url = `${url}${heading && `#${slugify(heading, { lower: true })}`}`;
            const aHref = `<a href="${url}" title="${label}">${label}</a>`;
            const html = text.replace(internalLinkRegex, aHref);

            if (isEmbed && markdownFolder) {
                const filePath = `${markdownFolder}/${label}.md`;

                if (fs.existsSync(filePath)) {
                    const content = removeFrontmatter(fs.readFileSync(filePath, 'utf8'));
                    const embedAst = plugin({ markdownAST: remark.parse(content) }, options);
                    parent.children.splice(index, 1);
                    parent.children.splice(index, 0, ...embedAst.children);
                }
            }

            node.type = 'html';
            node.children = undefined;
            node.value = html;
        }
    });

    visit(markdownAST, 'paragraph', (node) => {
        const paragraph = toString(node);

        const highlightRegex = /==(.*)==/g;

        if (paragraph.match(highlightRegex)) {
            const html = paragraph.replace(highlightRegex, `<mark className="${highlightClassName}">$1</mark>`);
            node.type = 'html';
            node.children = undefined;
            node.value = `<p>${html}</p>`;
        }
    });

    return markdownAST;
};

module.exports = plugin;
