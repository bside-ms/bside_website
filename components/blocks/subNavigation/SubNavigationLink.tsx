import { useCallback } from 'react';
import type { ReactElement } from 'react';
import { scroller } from 'react-scroll';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import getHeadlineId from '@/lib/block/getHeadlineId';
import isEmptyString from '@/lib/common/helper/isEmptyString';

interface Props {
    anchor: string | undefined | null;
    teaser?: string | undefined;
    title: string;
}

const SubNavigationLink = ({ anchor, title, teaser }: Props): ReactElement | null => {

    const { isMd } = useBreakpointContext();

    const handleClick = useCallback(() => {

        const headlineId = getHeadlineId(anchor, title);

        if (isEmptyString(headlineId)) {
            return;
        }

        const navigationHeight = isMd ? 70 : 100;

        const paddingForHeadlineKicker = isEmptyString(teaser) ? 0 : isMd ? 30 : 20;

        scroller.scrollTo(
            headlineId,
            {
                smooth: true,
                offset: (navigationHeight + paddingForHeadlineKicker) * -1,
            }
        );

    }, [anchor, isMd, teaser, title]);

    return (
        <div onClick={handleClick} className="md:cursor-pointer md:hover:text-orange-500 underline">
            {title}
        </div>
    );
};

export default SubNavigationLink;
