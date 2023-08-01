import type { HeadlineLevel } from '@/components/Blocks/headline/Headline';
import type { MediaContentAlignment, MediaContentBackgroundColor } from '@/components/Blocks/mediaContent/MediaContentBlock';
import type { Circle, Media } from '@/types/payload/payload-types';

export type SlateChildren = Array<Record<string, unknown>>;

export interface BlockLayoutProps {
    blocks: Circle['layout'];
}

export interface ContentColumnProps {
    width: string;
    richText: SlateChildren;
    id?: string;
}

export interface ContentProps {
    columns?: Array<ContentColumnProps>;
    backgroundColor?: string;
    backgroundWidth?: string;
}

export interface MediaContentBlockProps {
    media: Media | string;
    richText: SlateChildren;
    alignment: MediaContentAlignment;
    backgroundColor?: MediaContentBackgroundColor;
    headline?: string;
}

export interface MediaBlockProps {
    media: Media | string;
    size?: 'normal' | 'wide';
    caption?: string;
}

export interface CallToActionBlockProps {
    title: string;
    text: string;
    href: string;
}

export interface HeadlineBlockProps {
    title: string;
    anchor?: string | null;
    teaser?: string | null;
    level: HeadlineLevel;
    as?: HeadlineLevel | null;
}
