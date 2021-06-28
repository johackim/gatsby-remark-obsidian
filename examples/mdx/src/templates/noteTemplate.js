import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

export default function Template({ pageContext }) {
    const { body } = pageContext;

    return (
        <div id="content">
            <MDXProvider>
                <MDXRenderer>{body}</MDXRenderer>
            </MDXProvider>
        </div>
    );
}
