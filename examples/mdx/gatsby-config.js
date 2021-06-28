module.exports = {
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: './content',
            },
        },
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                extensions: ['.md'],
                gatsbyRemarkPlugins: [
                    {
                        resolve: 'gatsby-remark-obsidian',
                        options: {
                            titleToURL: (title) => `/${title}`,
                        },
                    },
                ],
            },
        },
    ],
};
