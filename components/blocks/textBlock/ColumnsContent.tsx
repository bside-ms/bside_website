import type { ReactElement } from 'react';
import type { ContentColumnProps } from '@/types/payload/Blocks';
import FullColumnContent from '@blocks/textBlock/FullColumnContent';
import HalfColumnsContent from '@blocks/textBlock/HalfColumnsContent';
import OneThirdColumnsContent from '@blocks/textBlock/OneThirdColumnsContent';
import TwoThirdsColumnsContent from '@blocks/textBlock/TwoThirdsColumnsContent';

interface Props {
    columns: Array<ContentColumnProps>;
}

const ColumnsContent = ({ columns }: Props): ReactElement | null => {
    const [firstColumn, secondColumn, thirdColumn] = columns;

    if (firstColumn === undefined) {
        console.warn('At least first column must be set');

        return null;
    }

    switch (firstColumn.width) {
        case 'full':
            return <FullColumnContent firstColumn={firstColumn} />;

        case 'half':
            return <HalfColumnsContent firstColumn={firstColumn} secondColumn={secondColumn} />;

        case 'twoThirds':
            return <TwoThirdsColumnsContent firstColumn={firstColumn} secondColumn={secondColumn} />;

        case 'oneThird':
            return <OneThirdColumnsContent firstColumn={firstColumn} secondColumn={secondColumn} thirdColumn={thirdColumn} />;

        default:
            console.error(`Received unexpected width of first column: ${firstColumn.width}`)
            return null;
    }
};

export default ColumnsContent;
