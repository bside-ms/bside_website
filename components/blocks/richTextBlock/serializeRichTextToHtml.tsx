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
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { stringContainsEmail } from '@/lib/common/url';

interface LinkSlateChild {
    type: 'link';
    linkType?: 'custom' | 'internal';
    url: string | null;
    newTab: boolean;
    fields?: { appearance: 'link' | 'button' };
    children: Array<{ text: string }>;
}

export interface RichTextUploadNodeType {
    value?: MediaType;
    relationTo: string;
}

const serializeText = (node: Record<string, unknown> & Text, index: number): ReactElement => {
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
        text = <span key={index} />;
    }

    return <Fragment key={index}>{text}</Fragment>;
};

const serializeMedia = (node: Record<string, unknown>): ReactElement | null => {
    const justify =
        typeof node.fields === 'object' && node.fields !== null && 'alignment' in node.fields && typeof node.fields.alignment === 'string'
            ? node.fields.alignment
            : 'center';

    const media = node.value as MediaType;

    // ToDo: Add this to the CMS.
    let width = media.sizes?.event?.width ?? media.width!;
    width = width / 3.3;
    let height = media.sizes?.event?.height ?? media.height!;
    height = height / 3.3;

    const justifyRight = justify === 'right' ? { marginLeft: 'auto', marginRight: 0 } : {};
    const justifyLeft = justify === 'left' ? { marginLeft: 0, marginRight: 'auto' } : {};

    return (
        <Image
            key={`rt-image-${media.id}`}
            src={media.url!}
            alt={media.alt === '-' ? '' : media.alt}
            width={width}
            height={height}
            className="mx-auto"
            style={justify === 'right' ? justifyRight : justifyLeft}
        />
    );
};

const serializeLink = (node: LinkSlateChild, index: number): ReactElement => {
    if (node.linkType === 'internal') {
        console.warn('RichTextSerialization: Link type "internal" is currently not supported!');
        return <></>;
    }

    const linkText = node.children[0]?.text;

    if (isNotEmptyString(node.url) && node.url.startsWith('mailto:')) {
        let mail = node.url.substring(7);
        mail = mail.startsWith('//') ? mail.substring(2) : mail;
        mail = mail.replace('.spam', '.ms');

        return (
            <Obfuscate email={mail} key={`mail-${mail}`} className="italic underline underline-offset-4 hover:text-orange-500 sm:text-lg" />
        );
    }

    /*
    if (isNotEmptyString(node.url) && (node.url.includes('instagram.com') || node.url.includes('facebook.com'))) {
        console.debug('RichTextSerialization: removed Meta-URL received from CMS: "' + node.url + '" with text: "' + linkText + '"');
        return <></>;
    }
    */

    if (isEmptyString(node.url) || isEmptyString(linkText)) {
        // Might accidentally happen while pasting copied text into the rich text editor, or by some other mistake.
        console.debug('RichTextSerialization: incorrect link received from CMS: "' + node.url + '" with text "' + linkText + '"');
        return <></>;
    }

    if (stringContainsEmail(node.url) || stringContainsEmail(linkText)) {
        // Use Obfuscate instead.
        console.debug('RichTextSerialization: removed mail in link received from CMS: "' + node.url + '" with text: "' + linkText + '"');
        return <></>;
    }

    if (node.fields?.appearance === 'button') {
        return <InlineButton key={index} title="" text={linkText} href={escapeHTML(node.url)} target={node.newTab ? '_blank' : '_self'} />;
    }

    return (
        <Link
            key={index}
            href={escapeHTML(node.url)}
            target={node.newTab ? '_blank' : '_self'}
            className="italic underline underline-offset-4 hover:text-orange-500 sm:text-lg"
        >
            {linkText}
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
                        <HeadlineTag level={nodeType}>{serializeRichTextToHtml(nodeChildren)}</HeadlineTag>
                    </div>
                );

            case 'link':
                return serializeLink(node as unknown as LinkSlateChild, index);

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
