import type { ReactElement } from 'react';
import type { ContentColumnProps } from '@/types/payload/Blocks';
import { RichText } from '@blocks/RichTextBlock';
import { FullColumnContent } from '@blocks/TextBlock';

interface Props {
    firstColumn: ContentColumnProps;
    secondColumn?: ContentColumnProps;
}

const HalfColumnsContent = ({ firstColumn, secondColumn }: Props): ReactElement | null => {

    if (secondColumn === undefined) {
        // eslint-disable-next-line no-console
        console.warn('Falling back to full column instead of half since second column is missing');

        return (
            <FullColumnContent
                firstColumn={firstColumn}
            />
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            <div>
                <RichText content={firstColumn.richText} />
            </div>
            <div className="pt-4 md:pt-0">
                <RichText content={secondColumn.richText} />
            </div>
        </div>
    );
};

export default HalfColumnsContent;
