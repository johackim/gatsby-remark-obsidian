const fs = require('fs');
const find = require('unist-util-find');
const Remark = require('remark');
const breaks = require('remark-breaks');
const toHast = require('mdast-util-to-hast');
const toHtml = require('hast-util-to-html');
const { createMdxAstCompiler } = require('@mdx-js/mdx');
const plugin = require('../index');

const compiler = createMdxAstCompiler({ remarkPlugins: [] });
const remark = new Remark().use(breaks);
const removeFrontmatter = (content) => content.replace(/^---[\s\S]+?---/, '');

test('Should support ==highlight text==', () => {
    const text = '==highlight text==';
    const markdownAST = remark.parse(text);
    const transformed = plugin({ markdownAST });

    expect(find(transformed, { type: 'html' }).value).toEqual('<p><mark className="">highlight text</mark></p>');
});

test('Should support ==highlight text== with highlightClassName option', () => {
    const text = '==highlight text==';
    const markdownAST = remark.parse(text);
    const options = { highlightClassName: 'highlight' };
    const transformed = plugin({ markdownAST }, options);

    expect(find(transformed, { type: 'html' }).value).toEqual('<p><mark className="highlight">highlight text</mark></p>');
});

test('Should support [[Internal link]]', () => {
    const text = '[[Internal link]]';
    const markdownAST = remark.parse(text);
    const transformed = plugin({ markdownAST });

    const hast = toHast(transformed, { allowDangerousHtml: true });
    const html = toHtml(hast, { allowDangerousHtml: true });

    expect(html).toContain('<a href="/internal-link" title="Internal link">Internal link</a>');
});

test('Should support [[Internal link]] with text around', () => {
    const text = 'start [[Internal link]] end';
    const markdownAST = remark.parse(text);
    const transformed = plugin({ markdownAST });

    const hast = toHast(transformed, { allowDangerousHtml: true });
    const html = toHtml(hast, { allowDangerousHtml: true });

    expect(html).toContain('<a href="/internal-link" title="Internal link">Internal link</a>');
});

test.skip('Should support multiple [[Internal link]] on the same paragraph', () => {
    const text = 'start [[Internal link]] [[Second link]] end';
    const markdownAST = remark.parse(text);
    const transformed = plugin({ markdownAST });

    const hast = toHast(transformed, { allowDangerousHtml: true });
    const html = toHtml(hast, { allowDangerousHtml: true });

    expect(html).toContain('<a href="/internal-link" title="Internal link">Internal link</a>');
    expect(html).toContain('<a href="/second-link" title="Second link">Second link</a>');
});

test('Should support [[Internal link]] with titleToURL option', () => {
    const text = '[[Internal link]]';
    const markdownAST = remark.parse(text);
    const options = { titleToURL: (title) => `/${title}` };
    const transformed = plugin({ markdownAST }, options);

    const hast = toHast(transformed, { allowDangerousHtml: true });
    const html = toHtml(hast, { allowDangerousHtml: true });

    expect(html).toContain('<a href="/Internal link" title="Internal link">Internal link</a>');
});

test('Should support [[Internal link|With custom text]]', () => {
    const text = '[[Internal link|With custom text]]';
    const markdownAST = remark.parse(text);
    const transformed = plugin({ markdownAST });

    const hast = toHast(transformed, { allowDangerousHtml: true });
    const html = toHtml(hast, { allowDangerousHtml: true });

    expect(html).toContain('<a href="/internal-link" title="With custom text">With custom text</a>');
});

test('Should support [[Internal link#heading]]', () => {
    const text = '[[Internal link#heading]]';
    const markdownAST = remark.parse(text);
    const transformed = plugin({ markdownAST });

    const hast = toHast(transformed, { allowDangerousHtml: true });
    const html = toHtml(hast, { allowDangerousHtml: true });

    expect(html).toContain('<a href="/internal-link#heading" title="Internal link">Internal link</a>');
});

test('Should support [[Internal link#heading|With custom text]]', () => {
    const text = '[[Internal link#heading|With custom text]]';
    const markdownAST = remark.parse(text);
    const transformed = plugin({ markdownAST });

    const hast = toHast(transformed, { allowDangerousHtml: true });
    const html = toHtml(hast, { allowDangerousHtml: true });

    expect(html).toEqual('<a href="/internal-link#heading" title="With custom text">With custom text</a>');
});

test('Should support ![[Embed note]]', () => {
    const text = fs.readFileSync(`${__dirname}/fixtures/Test.md`, 'utf8');
    const markdownAST = remark.parse(removeFrontmatter(text));

    const options = { markdownFolder: `${__dirname}/fixtures` };
    const transformed = plugin({ markdownAST }, options);

    const hast = toHast(transformed, { allowDangerousHtml: true });
    const html = toHtml(hast, { allowDangerousHtml: true });

    expect(html).toContain('Hello world');
    expect(html).not.toContain('Embed note');
    expect(html).not.toContain('!');
});

test('Should enable MDX', () => {
    const text = '# Hello MDX';
    const options = { enableMdx: true };
    const markdownAST = compiler.parse(text);
    const transformed = plugin({ markdownAST }, options);

    const hast = toHast(transformed);
    const html = toHtml(hast);

    expect(html).toEqual('<h1>Hello MDX</h1>');
});
