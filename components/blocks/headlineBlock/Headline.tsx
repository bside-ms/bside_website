import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import type { HeadlineBlockProps } from '@/types/payload/Blocks';
import HeadlineKicker from '@blocks/headlineBlock/HeadlineKicker';
import HeadlineTag from '@blocks/headlineBlock/HeadlineTag';

export type HeadlineLevel = 'h1' | 'h2' | 'h3' | 'h4';

const Headline = ({ title, anchor, teaser, level, as = null, teaserLink = '' }: HeadlineBlockProps): ReactElement => {

    const renderedLevel = as ?? level;

    return (
        <>

            {!isEmptyString(teaser) && (
                <HeadlineKicker level={level} link={teaserLink}>
                    {teaser}
                </HeadlineKicker>
            )}

            <div className="max-w-full md:scroll-mt-[64px]">
                <HeadlineTag level={renderedLevel} anchor={anchor}>
                    {title}
                </HeadlineTag>
            </div>
        </>
    );
};

export default Headline;
