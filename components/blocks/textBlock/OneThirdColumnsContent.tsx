import type { ReactElement } from 'react';
import type { ContentColumnProps } from '@/types/payload/Blocks';
import FullColumnContent from '@blocks/textBlock/FullColumnContent';
import RichText from 'components/blocks/richTextBlock/RichText';

interface Props {
    firstColumn: ContentColumnProps;
    secondColumn?: ContentColumnProps;
    thirdColumn?: ContentColumnProps;
}

const OneThirdColumnsContent = ({ firstColumn, secondColumn, thirdColumn }: Props): ReactElement => {
    if (secondColumn === undefined || thirdColumn === undefined) {
        console.warn('Falling back to full since second or third column is missing');

        return <FullColumnContent firstColumn={firstColumn} />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
            <div>
                <RichText content={firstColumn.richText} />
            </div>
            <div className="pt-4 md:py-0">
                <RichText content={secondColumn.richText} />
            </div>
            <div className="pt-4 md:py-0">
                <RichText content={thirdColumn.richText} />
            </div>
        </div>
    );
};

export default OneThirdColumnsContent;
