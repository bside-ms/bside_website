import type { ReactElement } from 'react';
import type { ContentColumnProps } from '@/types/payload/Blocks';
import { RichText } from '@blocks/RichTextBlock';
import { FullColumnContent } from '@blocks/TextBlock';

interface Props {
    firstColumn: ContentColumnProps;
    secondColumn?: ContentColumnProps;
}

const TwoThirdsColumnsContent = ({ firstColumn, secondColumn }: Props): ReactElement | null => {

    if (secondColumn === undefined) {
        // eslint-disable-next-line no-console
        console.warn('Falling back to full column instead of twoThirds since second column is missing');

        return (
            <FullColumnContent
                firstColumn={firstColumn}
            />
        );
    }

    return (
        <div className="grid grid-cols-6 gap-4">
            <div className="col-span-4">
                <RichText content={firstColumn.richText} />
            </div>
            <div className="col-span-2">
                <RichText content={secondColumn.richText} />
            </div>
        </div>
    );
};

export default TwoThirdsColumnsContent;
