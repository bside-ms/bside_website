import type { Circle, Media } from '@/types/payload/payload-types';

export type SlateChildren = Array<Record<string, string>>;

export interface BlockLayoutProps {
    blocks: Circle['layout'];
}

export interface ContentColumnProps {
    width: string;
    richText: SlateChildren;
    id: string;
}

export interface ContentProps {
    columns: Array<ContentColumnProps>;
    backgroundColor?: string;
    backgroundWidth?: string;
}

export interface MediaContentBlockProps {
    media: Media;
    richText: SlateChildren;
    alignment: string;
    backgroundColor?: string;
    headline?: string;
}

export interface MediaBlockProps {
    media: Media;
    size: string;
    caption?: string;
}

export interface CallToActionBlockProps {
    title: string;
    text: string;
    href: string;
}

export interface HeadlineBlockProps {
    title: string;
    anchor: string;
    teaser: string | null;
    level: string;
    as?: string | null;
}
