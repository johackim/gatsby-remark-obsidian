# gatsby-remark-obsidian

Gatsby plugin to support Obsidian markdown syntax.

## Requirements

- Nodejs >= 14

## Features

- [x] Support `==highlight text==`
- [x] Support `[[Internal link]]`
- [x] Support `[[Internal link|With custom text]]`
- [ ] Support `[[Internal link#heading]]`
- [ ] Support `[[Internal link#heading|With custom text]]`
- [ ] Support `![[Embed note#heading]]`
- [ ] Support `![[Embed note]]`

## Installation

```bash
npm install gatsby-remark-obsidian
```

## Usage

Add the plugin to your Gatsby config:

```js
{
    resolve: 'gatsby-plugin-mdx',
    options: {
        gatsbyRemarkPlugins: [
            {
                resolve: 'gatsby-remark-obsidian',
                options: {
                    titleToURL: (title) => `/${title}`, // optional
                    highlightClassName: 'highlight', // optional
                },
            },
        ],
    },
},
```
