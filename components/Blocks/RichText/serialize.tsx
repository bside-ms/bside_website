/* eslint-disable react/no-array-index-key */
import { Fragment } from 'react';
import clsx from 'clsx';
import escapeHTML from 'escape-html';
import type { ReactElement } from 'react';
import { Text } from 'slate';
import { HeadlineLevels } from '@/components/Blocks/Headline';
import EventImage from '@/components/events/EventImage';
import type { Media as MediaType } from 'types/payload/payload-types'; 

type SlateChildren = Array<Record<string, unknown>>;

export interface RichTextUploadNodeType {
    value?: MediaType;
    relationTo: string;
}

const serializeText = (node: Record<string, unknown>, index: number): ReactElement => {
    // @ts-expect-error eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // eslint-disable-next-line react/no-danger
    let text = <span key={index} dangerouslySetInnerHTML={{ __html: escapeHTML(node.text).replaceAll(/\n/g, '<br/>') }} />;

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

    if (node.strikethrough === true) {
        text = (
            <span className="line-through sm:decoration-2" key={index}>
                {text}
            </span>
        );
    }

    if (node.text === '') {
        text = (
            <span key={index} />
        );
    }

    return (
        <Fragment key={index}>
            {text}
        </Fragment>
    );
};

const serializeMedia = (node: Record<string, unknown>, index: number): ReactElement | null => {

    return (
        <EventImage
            key={index}
            eventImage={node.value as MediaType}
            // @ts-expect-error Need to find more type safe solution in future
            justify={node.fields?.alignment}
            eventTitle={node.alt as string}
        />
    );
};

const serializeRichTextToHtml = (children: SlateChildren): Array<ReactElement | null> => {

    return children.map((node, index): ReactElement | null => {
        if (Text.isText(node)) {
            return serializeText(node, index);
        }

        const nodeType = node.type;
        const nodeChildren = node.children as SlateChildren;

        switch (nodeType) {
            case 'h1':
                return (
                    <h1
                        key={index}
                        className={clsx(
                            HeadlineLevels.h1,
                            'mt-4 mb-1'
                        )}
                    >
                        {serializeRichTextToHtml(nodeChildren)}
                    </h1>
                );

            case 'h2':
                return (
                    <h2
                        key={index}
                        className={clsx(
                            HeadlineLevels.h2,
                            'mt-4 mb-1'
                        )}
                    >
                        {serializeRichTextToHtml(nodeChildren)}
                    </h2>
                );

            case 'h3':
                return (
                    <h3
                        key={index}
                        className={clsx(
                            HeadlineLevels.h3,
                            'mt-4 mb-1'
                        )}
                    >
                        {serializeRichTextToHtml(nodeChildren)}
                    </h3>
                );

            case 'h4':
                return (
                    <h4
                        key={index}
                        className={clsx(
                            HeadlineLevels.h4,
                            'mt-4 mb-1'
                        )}
                    >
                        {serializeRichTextToHtml(nodeChildren)}
                    </h4>
                );

            case 'link':
                return (
                    <a
                        key={index}
                        // @ts-expect-error Need to find more type safe solution in future
                        href={escapeHTML(node.url)}
                        target={node.newTab === true ? '_blank' : '_self'}
                        className="underline text-blue-800 hover:text-orange-500 sm:text-lg"
                    >
                        {serializeRichTextToHtml(nodeChildren)}
                    </a>
                );

            case 'ul':
                return (
                    <ul key={index}>
                        {serializeRichTextToHtml(nodeChildren)}
                    </ul>
                );

            case 'li':
                return (
                    <li key={index}>
                        {serializeRichTextToHtml(nodeChildren)}
                    </li>
                );

            case 'upload':
                return serializeMedia(node, index);

            default:
                return (
                    <p key={index} className="py-1 sm:text-lg">
                        {serializeRichTextToHtml(nodeChildren)}
                    </p>
                );
        }
    });
};

export default serializeRichTextToHtml;
