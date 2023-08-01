import type { ReactElement } from 'react';
import HeadlineKicker from '@/components/Blocks/headline/HeadlineKicker';
import HeadlineTag from '@/components/Blocks/headline/HeadlineTag';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import type { HeadlineBlockProps } from '@/types/payload/Blocks';

export type HeadlineLevel = 'h1' | 'h2' | 'h3' | 'h4';

const Headline = ({ title, anchor, teaser, level, as = null }: HeadlineBlockProps): ReactElement => {

    const renderedLevel = as ?? level;

    return (
        <>
            {!isEmptyString(teaser) && (
                <HeadlineKicker level={level}>
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
