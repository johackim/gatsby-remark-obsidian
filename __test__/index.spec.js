const Remark = require('remark');
const find = require('unist-util-find');
const toHast = require('mdast-util-to-hast');
const toHtml = require('hast-util-to-html');
const { createRequireFromPath } = require('gatsby-core-utils');
const plugin = require('../index');

const requireFromMDX = createRequireFromPath(require.resolve('@mdx-js/mdx'));
const toMDAST = requireFromMDX('remark-parse');

const remark = new Remark().use(toMDAST);

test('Should support ==highlight text==', async () => {
    const text = '==highlight text==';
    const markdownAST = remark.parse(text);
    const transformed = plugin({ markdownAST });

    expect(find(transformed, { type: 'html' }).value).toEqual('<p><mark className="">highlight text</mark></p>');
});

test('Should support ==highlight text== with highlightClassName option', async () => {
    const text = '==highlight text==';
    const markdownAST = remark.parse(text);
    const options = { highlightClassName: 'highlight' };
    const transformed = plugin({ markdownAST }, options);

    expect(find(transformed, { type: 'html' }).value).toEqual('<p><mark className="highlight">highlight text</mark></p>');
});

test('Should support [[Internal link]]', async () => {
    const text = '[[Internal link]]';
    const markdownAST = remark.parse(text);
    const transformed = plugin({ markdownAST });

    const hast = toHast(transformed);
    const html = toHtml(hast);

    expect(html).toContain('<a href="/internal-link" title="Internal link">Internal link</a>');
});

test('Should support [[Internal link|With custom text]]', async () => {
    const text = '[[Internal link|With custom text]]';
    const markdownAST = remark.parse(text);
    const transformed = plugin({ markdownAST });

    const hast = toHast(transformed);
    const html = toHtml(hast);

    expect(html).toContain('<a href="/internal-link" title="Internal link">With custom text</a>');
});
