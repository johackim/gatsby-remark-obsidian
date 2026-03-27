# gatsby-remark-obsidian

[![Version](https://img.shields.io/github/v/tag/johackim/gatsby-remark-obsidian.svg?colorA=181C31&colorB=212839&label=version&sort=semver&style=flat-square)](https://github.com/johackim/gatsby-remark-obsidian/releases)
[![License](https://img.shields.io/badge/license-GPL%20v3%2B-yellow.svg?style=flat-square&colorA=181C31&colorB=212839)](https://raw.githubusercontent.com/johackim/gatsby-remark-obsidian/master/LICENSE)
[![Code Climate](https://img.shields.io/codeclimate/maintainability/johackim/gatsby-remark-obsidian.svg?style=flat-square&colorA=181C31&colorB=212839)](https://codeclimate.com/github/johackim/gatsby-remark-obsidian)

Gatsby plugin to support Obsidian markdown syntax.

NOTE: I also created a [non-gatsby plugin (remark-obsidian)](https://github.com/johackim/remark-obsidian) if you want 🙂.

## Requirements

- Nodejs >= 14

## Features

- [x] Support `==highlight text==`
- [x] Support `[[Internal link]]`
- [x] Support `[[Internal link|With custom text]]`
- [x] Support `[[Internal link#heading]]`
- [x] Support `[[Internal link#heading|With custom text]]`
- [x] Support `![[Embed note]]`
- [ ] Support `![[Embed note#heading]]`

## Installation

```bash
npm install gatsby-remark-obsidian
```

## Usage

Add the plugin to your Gatsby config:

```js
// gatsby-config.js
plugins: [
    {
        resolve: "gatsby-transformer-remark",
        options: {
            plugins: [
                {
                    resolve: 'gatsby-remark-obsidian',
                    options: {
                        titleToURL: (title) => `/${title}`, // optional
                        markdownFolder: `${__dirname}/content`, // optional
                        highlightClassName: 'highlight', // optional
                    },
                },
            ]
        }
    },
],
```

## Examples

- [Example with remark](https://github.com/johackim/gatsby-remark-obsidian/tree/master/examples/remark)
- [Example with mdx](https://github.com/johackim/gatsby-remark-obsidian/tree/master/examples/mdx)

## Running the tests

```bash
npm test
```

## Support me


Please support me with a one-time or a monthly donation and help me continue my activities.

[![Github sponsor](https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=GitHub-Sponsors)](https://github.com/sponsors/johackim/)
## License

This project is licensed under the GNU GPL v3.0 - see the [LICENSE](https://raw.githubusercontent.com/johackim/gatsby-remark-obsidian/master/LICENSE) file for details

**Free Software, Hell Yeah!**
