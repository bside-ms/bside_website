import type { Circle, Media } from '@/types/payload/payload-types';

export type SlateChildren = Array<Record<string, string>>;

export interface BlockLayoutProps {
    blocks: Circle['layout'];
}

export interface ContentColumnProps {
    width: string;
    alignment: string;
    richText: SlateChildren;
    id: string;
}

export interface ContentProps {
    columns: Array<ContentColumnProps>;
}

export interface MediaContentBlockProps {
    media: Media;
    richText: SlateChildren;
    alignment: string;
}

export interface MediaBlockProps {
    media: Media;
    size: string;
    caption?: SlateChildren;
}
