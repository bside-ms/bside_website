import type { ReactElement } from 'react';
import type { MediaContentBlockProps } from '@/types/payload/Blocks';
import MediaContent from '@blocks/mediaContent/MediaContent';
import MediaContentOverlay from '@blocks/mediaContent/MediaContentOverlay';

export type MediaContentAlignment = 'contentOnLeft' | 'contentOnRight' | 'contentOnBottom';
export type MediaContentBackgroundColor = 'black' | 'white';

const MediaContentBlock = ({
    alignment,
    backgroundColor,
    headline,
    media,
    richText,
    effects,
}: MediaContentBlockProps): ReactElement | null => {
    if (typeof media === 'string') {
        console.warn('Media of type string currently not supported');

        return null;
    }

    if (alignment === 'contentOnBottom') {
        return (
            <MediaContentOverlay
                media={media}
                richText={richText}
                headlineText={headline ?? undefined}
                effects={effects ?? []}
            />
        );
    }

    if (backgroundColor === 'black') {
        return (
            <div className="grow">
                <div className="bg-black text-white">
                    <MediaContent
                        media={media}
                        richText={richText}
                        alignment={alignment}
                        effects={effects ?? []}
                    />
                </div>
            </div>
        );
    }

    return (
        <MediaContent
            media={media}
            richText={richText}
            alignment={alignment}
            effects={effects ?? []}
        />
    );
};

export default MediaContentBlock;
