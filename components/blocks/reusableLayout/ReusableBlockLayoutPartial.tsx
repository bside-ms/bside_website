import type { ReactElement } from 'react';
import type { Page } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';

const ReusableBlockLayoutPartial = ({
    page,
    start,
    end,
}: {
    page: Page;
    start: number;
    end?: number;
}): ReactElement => {
    if (!page.layout) {
        return <div />;
    }

    const elements = end !== undefined ? page.layout.slice(start, end) : page.layout.slice(start);

    return <ReusableBlockLayout layout={elements} />;
};

export default ReusableBlockLayoutPartial;
