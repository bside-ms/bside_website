import type { ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import ContentWrapper from '@/components/layout/ContentWrapper';
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
}

const TeaserBlock = ({ headlineTitle, headlineTeaser, linkHref, linkText, text, reversed, image }: TeaserBlockProps): ReactElement => {

    const { isLg } = useBreakpointContext();

    if (isLg) {
        return (
            <div className="flex-grow">
                <div className="w-full mx-auto py-4">
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
        <ContentWrapper>
            <MediaContentOverlay
                media={image as Media}
                richText={text}
                headlineText={headlineTitle}
                headlineTeaser={headlineTeaser}
                buttonText={linkText}
                buttonHref={linkHref}
            />
        </ContentWrapper>
    );
};

export default TeaserBlock;
