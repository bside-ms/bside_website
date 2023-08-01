import type { ReactElement } from 'react';
import FullColumnContent from '@/components/Blocks/content/FullColumnContent';
import HalfColumnsContent from '@/components/Blocks/content/HalfColumnsContent';
import OneThirdColumnsContent from '@/components/Blocks/content/OneThirdColumnsContent';
import TwoThirdsColumnsContent from '@/components/Blocks/content/TwoThirdsColumnsContent';
import type { ContentColumnProps } from '@/types/payload/Blocks';

const ColumnsContent = ({ columns }: { columns: Array<ContentColumnProps> }): ReactElement | null => {

    const [firstColumn, secondColumn, thirdColumn] = columns;

    if (firstColumn === undefined) {
        // eslint-disable-next-line no-console
        console.warn('At least first column must be set');

        return null;
    }

    switch (firstColumn.width) {
        case 'full':
            return (
                <FullColumnContent
                    firstColumn={firstColumn}
                />
            );

        case 'half':
            return (
                <HalfColumnsContent
                    firstColumn={firstColumn}
                    secondColumn={secondColumn}
                />
            );

        case 'twoThirds':
            return (
                <TwoThirdsColumnsContent
                    firstColumn={firstColumn}
                    secondColumn={secondColumn}
                />
            );

        case 'oneThird':
            return (
                <OneThirdColumnsContent
                    firstColumn={firstColumn}
                    secondColumn={secondColumn}
                    thirdColumn={thirdColumn}
                />
            );
    }

    return <div />;
};

export default ColumnsContent;
