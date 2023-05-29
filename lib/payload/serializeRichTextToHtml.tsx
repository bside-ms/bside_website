/* eslint-disable react/no-array-index-key */
import { Fragment } from 'react';
import escapeHTML from 'escape-html';
import type { ReactElement } from 'react';
import { Text } from 'slate';

type SlateChildren = Array<Record<string, unknown>>;

const serializeRichTextToHtml = (children: SlateChildren): Array<ReactElement | null> => {

    return children.map((node, index): ReactElement | null => {

        if (Text.isText(node)) {

            // eslint-disable-next-line react/no-danger
            let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />;

            if (node.bold === true) {
                text = (
                    <span className="font-bold" key={index}>
                        {text}
                    </span>
                );
            }

            if (node.underline === true) {
                text = (
                    <span className="underline" key={index}>
                        {text}
                    </span>
                );
            }

            if (node.italic === true) {
                text = (
                    <span className="italic" key={index}>
                        {text}
                    </span>
                );
            }

            return (
                <Fragment key={index}>
                    {text}
                </Fragment>
            );
        }

        const nodeType = node.type;
        const nodeChildren = node.children as SlateChildren;

        switch (nodeType) {
            case 'h1':
                return (
                    <h1 key={index} className="text-4xl">
                        {serializeRichTextToHtml(nodeChildren)}
                    </h1>
                );

            case 'h2':
                return (
                    <h2 key={index} className="text-3xl">
                        {serializeRichTextToHtml(nodeChildren)}
                    </h2>
                );

            case 'h3':
                return (
                    <h3 key={index} className="text-2xl">
                        {serializeRichTextToHtml(nodeChildren)}
                    </h3>
                );

            case 'h4':
                return (
                    <h4 key={index} className="text-xl">
                        {serializeRichTextToHtml(nodeChildren)}
                    </h4>
                );

            case 'h5':
                return (
                    <h5 key={index} className="text-lg">
                        {serializeRichTextToHtml(nodeChildren)}
                    </h5>
                );

            case 'h6':
                return (
                    <h6 key={index} className="text-md">
                        {serializeRichTextToHtml(nodeChildren)}
                    </h6>
                );

            case 'link':
                return (
                    <a
                        key={index}
                        // @ts-expect-error Need to find more type safe solution in future
                        href={escapeHTML(node.url)}
                        target={node.newTab === true ? '_blank' : '_self'}
                        className="underline hover:text-orange-500"
                    >
                        {serializeRichTextToHtml(nodeChildren)}
                    </a>
                );

            default:
                return (
                    <p key={index} className="py-1">
                        {serializeRichTextToHtml(nodeChildren)}
                    </p>
                );
        }
    });
};

export default serializeRichTextToHtml;
