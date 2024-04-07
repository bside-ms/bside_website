/* eslint-disable react/no-array-index-key */
import { Fragment } from 'react';
import { Obfuscate } from '@south-paw/react-obfuscate-ts';
import escapeHTML from 'escape-html';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { Text } from 'slate';
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
        text = <span key={index} />;
    }

    return <Fragment key={index}>{text}</Fragment>;
};

const serializeMedia = (node: Record<string, unknown>): ReactElement | null => {
    // @ts-expect-error Find typesave method.
    const justify = node.fields?.alignment ?? 'center';
    const media = node.value as MediaType;

    // ToDo: Add this to the CMS.
    let width = media.sizes?.event?.width ?? media.width!;
    width = width / 3.3;
    let height = media.sizes?.event?.height ?? media.height!;
    height = height / 3.3;

    return (
        <Image
            key={`rt-image-${media.id}`}
            src={media.url!}
            alt={media.alt === '-' ? '' : media.alt}
            width={width}
            height={height}
            className="mx-auto"
            style={
                justify === 'right'
                    ? { marginLeft: 'auto', marginRight: 0 }
                    : justify === 'left'
                      ? { marginLeft: 0, marginRight: 'auto' }
                      : undefined
            }
        />
    );
};

const serializeLink = (
    nodeChildren: SlateChildren,
    node: Record<string, unknown>,
    index: number,
): ReactElement => {
    // @ts-expect-error Needs to be typed.
    if (node.fields?.appearance === 'button') {
        return (
            <InlineButton
                key={index}
                title=""
                text={nodeChildren[0] !== undefined ? (nodeChildren[0].text as string) : ''}
                // @ts-expect-error Need to find more type safe solution in future
                href={escapeHTML(node.url)}
                target={node.newTab === true ? '_blank' : '_self'}
            />
        );
    }

    if ((node.url as string).startsWith('mailto:')) {
        let mail = (node.url as string).substring(7);
        mail = mail.startsWith('//') ? mail.substring(2) : mail;
        mail = mail.replace('.spam', '.ms');

        return (
            <Obfuscate
                email={mail}
                key={`mail-${mail}`}
                className="italic underline underline-offset-4 hover:text-orange-500 sm:text-lg"
            />
        );
    }
    return (
        <Link
            key={index}
            // @ts-expect-error Need to find more type safe solution in future
            href={escapeHTML(node.url)}
            target={node.newTab === true ? '_blank' : '_self'}
            className="italic underline underline-offset-4 hover:text-orange-500 sm:text-lg"
        >
            {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
            {serializeRichTextToHtml(nodeChildren)}
        </Link>
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
                    <div key={index} className="mb-1 mt-4">
                        <HeadlineTag level={nodeType}>
                            {serializeRichTextToHtml(nodeChildren)}
                        </HeadlineTag>
                    </div>
                );

            case 'link':
                return serializeLink(nodeChildren, node, index);

            case 'ul':
                return (
                    <ul className="ml-4 list-disc sm:text-lg" key={index}>
                        {serializeRichTextToHtml(nodeChildren)}
                    </ul>
                );

            case 'ol':
                return (
                    <ul className="ml-5 list-decimal sm:text-lg" key={index}>
                        {serializeRichTextToHtml(nodeChildren)}
                    </ul>
                );

            case 'li':
                return <li key={index}>{serializeRichTextToHtml(nodeChildren)}</li>;

            case 'upload':
                return serializeMedia(node);

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
