import type { ReactElement } from 'react';
import type { ContentColumnProps } from '@/types/payload/Blocks';
import RichText from 'components/blocks/richTextBlock/RichText';
import FullColumnContent from 'components/blocks/textBlock/FullColumnContent';

interface Props {
    firstColumn: ContentColumnProps;
    secondColumn?: ContentColumnProps;
}

const TwoThirdsColumnsContent = ({ firstColumn, secondColumn }: Props): ReactElement | null => {
    if (secondColumn === undefined) {
        // eslint-disable-next-line no-console
        console.warn(
            'Falling back to full column instead of twoThirds since second column is missing',
        );

        return <FullColumnContent firstColumn={firstColumn} />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-6 md:gap-4">
            <div className="pt-4 md:col-span-4 md:pt-0">
                <RichText content={firstColumn.richText} />
            </div>
            <div className="pt-4 md:col-span-2 md:pt-0">
                <RichText content={secondColumn.richText} />
            </div>
        </div>
    );
};

export default TwoThirdsColumnsContent;
