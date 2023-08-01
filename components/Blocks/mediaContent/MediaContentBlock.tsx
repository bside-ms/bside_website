import type { ReactElement } from 'react';
import MediaContent from '@/components/Blocks/mediaContent/MediaContent';
import MediaContentOverlay from '@/components/Blocks/mediaContent/MediaContentOverlay';
import type { MediaContentBlockProps } from '@/types/payload/Blocks';

export type MediaContentAlignment = 'contentOnLeft' | 'contentOnRight' | 'contentOnBottom';
export type MediaContentBackgroundColor = 'black' | 'white';

const MediaContentBlock = ({ alignment, backgroundColor, headline, media, richText }: MediaContentBlockProps): ReactElement | null => {

    if (typeof media === 'string') {
        // eslint-disable-next-line no-console
        console.warn('Media of type string currently not supported');

        return null;
    }

    if (alignment === 'contentOnBottom') {
        return (
            <MediaContentOverlay
                media={media}
                richText={richText}
                headline={headline}
            />
        );
    }

    if (backgroundColor === 'black') {
        return (
            <div className="flex-grow">
                <div className="bg-black text-white">
                    <MediaContent media={media} richText={richText} alignment={alignment} />
                </div>
            </div>
        );
    }

    return <MediaContent media={media} richText={richText} alignment={alignment} />;
};

export default MediaContentBlock;
