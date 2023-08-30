import type { ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';
import type { SlateChildren } from '@/types/payload/Blocks';
import type { Media } from '@/types/payload/payload-types';
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

    return (
        <ContentWrapper>
            <Teaser
                headlineTitle={headlineTitle}
                headlineTeaser={headlineTeaser}
                linkHref={linkHref}
                linkText={linkText}
                image={image}
                text={text}
                reversed={reversed}
            />
        </ContentWrapper>
    );
};

export default TeaserBlock;
