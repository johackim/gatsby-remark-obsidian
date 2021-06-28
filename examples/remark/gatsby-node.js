exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;

    const result = await graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        id
                        html
                        parent {
                            ... on File {
                                name
                            }
                        }
                    }
                }
            }
        }
    `);

    if (result.errors) {
        reporter.panicOnBuild('Error while running GraphQL query.');
        return;
    }

    const markdowns = result.data.allMarkdownRemark.edges;

    const noteTemplate = require.resolve('./src/templates/noteTemplate.js');

    markdowns.forEach(({ node }) => {
        const { id, html } = node;

        createPage({
            path: `/${node.parent.name}`,
            component: noteTemplate,
            context: { id, html },
        });
    });
};
