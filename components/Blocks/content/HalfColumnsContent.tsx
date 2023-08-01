import type { ReactElement } from 'react';
import FullColumnContent from '@/components/Blocks/content/FullColumnContent';
import RichText from '@/components/Blocks/RichText';
import type { ContentColumnProps } from '@/types/payload/Blocks';

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
        <div className="grid grid-cols-2 gap-4">
            <div>
                <RichText content={firstColumn.richText} />
            </div>
            <div>
                <RichText content={secondColumn.richText} />
            </div>
        </div>
    );
};

export default HalfColumnsContent;
