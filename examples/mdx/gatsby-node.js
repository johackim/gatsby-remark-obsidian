exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions;

    const result = await graphql(`{
        allMdx {
            nodes {
                id
                body
                parent {
                    ... on File {
                        name
                    }
                }
            }
        }
    }`);

    if (result.errors) {
        reporter.panicOnBuild('Error while running GraphQL query.');
        return;
    }

    const markdowns = result.data.allMdx.nodes;

    const noteTemplate = require.resolve('./src/templates/noteTemplate.js');

    markdowns.forEach((node) => {
        const { id, body } = node;

        createPage({
            path: `/${node.parent.name}`,
            component: noteTemplate,
            context: { id, body },
        });
    });
};
