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

I'd love to work on this project, but my time on this earth is limited, support my work to give me more time!

Please support me with a one-time or a monthly donation and help me continue my activities.

[![Github sponsor](https://img.shields.io/badge/github-Support%20my%20work-lightgrey?style=social&logo=github)](https://github.com/sponsors/johackim/)
[![ko-fi](https://img.shields.io/badge/ko--fi-Support%20my%20work-lightgrey?style=social&logo=ko-fi)](https://ko-fi.com/johackim)
[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-Support%20my%20work-lightgrey?style=social&logo=buy%20me%20a%20coffee&logoColor=%23FFDD00)](https://www.buymeacoffee.com/johackim)
[![liberapay](https://img.shields.io/badge/liberapay-Support%20my%20work-lightgrey?style=social&logo=liberapay&logoColor=%23F6C915)](https://liberapay.com/johackim/donate)
[![Github](https://img.shields.io/github/followers/johackim?label=Follow%20me&style=social)](https://github.com/johackim)
[![Mastodon](https://img.shields.io/mastodon/follow/1631?domain=https%3A%2F%2Fmastodon.ethibox.fr&style=social)](https://mastodon.ethibox.fr/@johackim)
[![Twitter](https://img.shields.io/twitter/follow/_johackim?style=social)](https://twitter.com/_johackim)

## License

This project is licensed under the GNU GPL v3.0 - see the [LICENSE](https://raw.githubusercontent.com/johackim/gatsby-remark-obsidian/master/LICENSE) file for details

**Free Software, Hell Yeah!**
