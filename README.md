# gatsby-remark-obsidian

[![Version](https://img.shields.io/github/v/tag/johackim/gatsby-remark-obsidian.svg?colorA=181C31&colorB=212839&label=version&sort=semver&style=flat-square)](https://github.com/johackim/gatsby-remark-obsidian/releases)
[![License](https://img.shields.io/badge/license-GPL%20v3%2B-yellow.svg?style=flat-square&colorA=181C31&colorB=212839)](https://raw.githubusercontent.com/johackim/gatsby-remark-obsidian/master/LICENSE)
[![Code Climate](https://img.shields.io/codeclimate/maintainability/johackim/gatsby-remark-obsidian.svg?style=flat-square&colorA=181C31&colorB=212839)](https://codeclimate.com/github/johackim/gatsby-remark-obsidian)

Gatsby plugin to support Obsidian markdown syntax.

## Requirements

- Nodejs >= 14
- [gatsby-plugin-mdx](https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/)

## Features

- [x] Support `==highlight text==`
- [x] Support `[[Internal link]]`
- [x] Support `[[Internal link|With custom text]]`
- [x] Support `[[Internal link#heading]]`
- [x] Support `[[Internal link#heading|With custom text]]`
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
