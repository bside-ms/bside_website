import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import type { SlateChildren } from '@/types/payload/Blocks';
import type { Media } from '@/types/payload/payload-types';
import MediaContentOverlay from '@blocks/mediaContent/MediaContentOverlay';
import Teaser from '@blocks/teaserBlock/Teaser';

export interface TeaserBlockProps {
    headlineTitle: string;
    headlineTeaser: string;
    text: SlateChildren;
    linkHref: string;
    linkText: string;
    image: Media | string;
    reversed: boolean;
    previousBlock?: string;
    nextBlock?: string;
}

const TeaserBlock = ({ headlineTitle, headlineTeaser, linkHref, linkText, text, reversed, image, previousBlock, nextBlock }: TeaserBlockProps): ReactElement => {

    const { isLg } = useBreakpointContext();

    if (isLg) {
        return (
            <div className="flex-grow">
                <div
                    className={clsx(
                        'w-full my-8 mx-auto',
                        previousBlock === 'teaser' && '!-mt-8',
                        nextBlock === 'teaser' && '!-mb-8',
                    )}
                >
                    <Teaser
                        headlineTitle={headlineTitle}
                        headlineTeaser={headlineTeaser}
                        linkHref={linkHref}
                        linkText={linkText}
                        image={image}
                        text={text}
                        reversed={reversed}
                    />
                </div>
            </div>
        );
    }

    return (
        <MediaContentOverlay
            media={image as Media}
            richText={text}
            headlineText={headlineTitle}
            headlineTeaser={headlineTeaser}
            buttonText={linkText}
            buttonHref={linkHref}
            effects={[]}
        />
    );
};

export default TeaserBlock;
