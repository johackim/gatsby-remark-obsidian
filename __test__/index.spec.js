const remark = require('remark');
const find = require('unist-util-find');
const plugin = require('../index');

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
