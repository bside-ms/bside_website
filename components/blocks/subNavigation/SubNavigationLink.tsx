import { useCallback } from 'react';
import type { ReactElement } from 'react';
import { scroller } from 'react-scroll';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import getHeadlineId from '@/lib/block/getHeadlineId';
import isEmptyString from '@/lib/common/helper/isEmptyString';

interface Props {
    anchor: string | undefined | null;
    teaser?: boolean;
    title: string;
}

const SubNavigationLink = ({ anchor, title, teaser = false }: Props): ReactElement => {
    const { isMd } = useBreakpointContext();

    const handleClick = useCallback(() => {
        const headlineId = getHeadlineId(anchor, title);

        if (isEmptyString(headlineId)) {
            return;
        }

        const navigationHeight = isMd ? 70 : 100;

        const paddingForHeadlineKicker = !teaser ? 0 : isMd ? 30 : 20;

        scroller.scrollTo(headlineId, {
            smooth: true,
            offset: (navigationHeight + paddingForHeadlineKicker) * -1,
        });
    }, [anchor, isMd, teaser, title]);

    const width = isMd ? 'basis-1/3' : 'basis-1/2';

    return (
        <li
            onClick={handleClick}
            className={`${width} cursor-pointer px-2 text-center underline underline-offset-4 md:hover:text-orange-500`}
        >
            {title}
        </li>
    );
};

export default SubNavigationLink;
