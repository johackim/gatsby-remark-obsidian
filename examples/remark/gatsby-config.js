module.exports = {
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: './content',
            },
        },
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
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
