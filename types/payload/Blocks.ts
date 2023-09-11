import type { Circle, Media, Organisation, Page } from '@/types/payload/payload-types';
import type { HeadlineLevel } from '@blocks/headlineBlock/Headline';
import type { MediaContentAlignment, MediaContentBackgroundColor } from '@blocks/mediaContent/MediaContentBlock';

export type SlateChildren = Array<Record<string, unknown>>;

export interface BlockLayoutProps {
    blocks: Circle['layout'] | Organisation['layout'] | Page['layout'];
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
    previousBlock?: string;
    effects?: Array<'blur' | 'grayscale' | 'desaturated' | 'darker'>;
}

export interface MediaBlockProps {
    media: Media | string;
    size?: 'normal' | 'wide' | 'event';
    caption?: string;
    effects?: Array<'blur' | 'grayscale' | 'desaturated' | 'darker'>;
}

export interface CallToActionBlockProps {
    title: string | undefined;
    text: string;
    href: string;
}

export interface HeadlineBlockProps {
    title: string;
    anchor?: string | null;
    teaser?: string | null;
    level: HeadlineLevel;
    as?: HeadlineLevel | null;
    teaserLink?: string | null;
    textClass?: string | null;
    backgroundColor?: MediaContentBackgroundColor;
}
