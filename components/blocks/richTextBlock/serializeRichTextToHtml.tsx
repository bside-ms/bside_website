/* eslint-disable react/no-array-index-key */
import { Fragment } from 'react';
import escapeHTML from 'escape-html';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { Text } from 'slate';
import EventImage from '@/components/events/detail/EventImage';
import type { SlateChildren } from '@/types/payload/Blocks';
import type { Media as MediaType } from '@/types/payload/payload-types';
import InlineButton from '@blocks/buttonBlock/InlineButton';
import HeadlineTag from 'components/blocks/headlineBlock/HeadlineTag';

export interface RichTextUploadNodeType {
    value?: MediaType;
    relationTo: string;
}

const serializeText = (node: Record<string, unknown> & Text, index: number): ReactElement => {

    let text = (
        <span
            key={index}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: escapeHTML(node.text).replaceAll(/\n/g, '<br/>') }}
        />
    );

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
            case 'h2':
            case 'h3':
            case 'h4':
                return (
                    <div key={index} className="mt-4 mb-1">
                        <HeadlineTag level={nodeType}>
                            {serializeRichTextToHtml(nodeChildren)}
                        </HeadlineTag>
                    </div>
                );

            case 'link':
                // @ts-expect-error Needs to be typed.
                if (node.fields?.appearance === 'button') {
                    return (
                        <InlineButton
                            key={index}
                            title=""
                            text={(nodeChildren[0] !== undefined) ? nodeChildren[0].text as string : ''}
                            // @ts-expect-error Need to find more type safe solution in future
                            href={escapeHTML(node.url)}
                            target={node.newTab === true ? '_blank' : '_self'}
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        // @ts-expect-error Need to find more type safe solution in future
                        href={escapeHTML(node.url)}
                        target={node.newTab === true ? '_blank' : '_self'}
                        className="underline underline-offset-4 italic hover:text-orange-500 sm:text-lg"
                    >
                        {serializeRichTextToHtml(nodeChildren)}
                    </Link>
                );

            case 'ul':
                return (
                    <ul className="md:text-lg list-disc ml-4" key={index}>
                        {serializeRichTextToHtml(nodeChildren)}
                    </ul>
                );

            case 'ol':
                return (
                    <ul className="md:text-lg list-decimal ml-5" key={index}>
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
