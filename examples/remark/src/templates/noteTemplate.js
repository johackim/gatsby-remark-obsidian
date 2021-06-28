import React from 'react';

export default function Template({ pageContext }) {
    const { html } = pageContext;

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
