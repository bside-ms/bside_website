import type { ReactElement } from 'react';
import type { ContentColumnProps } from '@/types/payload/Blocks';
import FullColumnContent from '@blocks/textBlock/FullColumnContent';
import TwoThirdsColumnsContent from '@blocks/textBlock/TwoThirdsColumnsContent';
import RichText from 'components/blocks/richTextBlock/RichText';

interface Props {
    firstColumn: ContentColumnProps;
    secondColumn?: ContentColumnProps;
    thirdColumn?: ContentColumnProps;
}

const OneThirdColumnsContent = ({ firstColumn, secondColumn, thirdColumn }: Props): ReactElement | null => {

    if (secondColumn === undefined) {
        // eslint-disable-next-line no-console
        console.warn('Falling back to full column instead of oneThird since second column is missing');

        return (
            <FullColumnContent
                firstColumn={firstColumn}
            />
        );
    }

    // Three Columns
    if (secondColumn.width === 'oneThird') {
        if (thirdColumn === undefined) {
            // eslint-disable-next-line no-console
            console.warn('Falling back to two columns instead of oneThird since third column is missing');

            return (
                <TwoThirdsColumnsContent
                    firstColumn={firstColumn}
                    secondColumn={secondColumn}
                />
            );
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

    }

    // Two Columns.
    return (
        <TwoThirdsColumnsContent
            firstColumn={firstColumn}
            secondColumn={secondColumn}
        />
    );
};

export default OneThirdColumnsContent;
