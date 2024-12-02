import type { ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';
import type { ContentProps } from '@/types/payload/Blocks';
import ColumnsContent from 'components/blocks/textBlock/ColumnsContent';

const ContentBlock = ({
    backgroundColor,
    backgroundWidth,
    columns,
}: ContentProps): ReactElement | null => {
    if (columns === undefined || columns.length === 0) {
        console.warn('Columns must be set');

        return null;
    }

    if (backgroundWidth === 'full' && backgroundColor === 'black') {
        return (
            <div className="grow">
                <div className="bg-black text-white">
                    <ContentWrapper>
                        <ColumnsContent columns={columns} />
                    </ContentWrapper>
                </div>
            </div>
        );
    }

    if (backgroundColor === 'black') {
        return (
            <ContentWrapper>
                <div className="bg-black p-4 text-white">
                    <ColumnsContent columns={columns} />
                </div>
            </ContentWrapper>
        );
    }

    return (
        <ContentWrapper>
            <ColumnsContent columns={columns} />
        </ContentWrapper>
    );
};

export default ContentBlock;
