import clsx from 'clsx';
import type { PropsWithChildren, ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import ContentWrapper from '@/components/layout/ContentWrapper';

const SubNavigation = ({ children }: PropsWithChildren): ReactElement => {

    const { isLg } = useBreakpointContext();

    return (
        <ContentWrapper
            className={clsx(
                '!pb-4 !pt-0',
                isLg ? '!-mt-0' : '!-mt-2',
            )}
        >
            <ul className="font-serif md:px-3 flex flex-row">
                {children}
            </ul>
        </ContentWrapper>
    );
};

export default SubNavigation;
