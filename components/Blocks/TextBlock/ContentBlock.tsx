import type { ReactElement } from 'react';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import type { ContentProps } from '@/types/payload/Blocks';
import { ColumnsContent } from '@blocks/TextBlock';

const ContentBlock = ({ backgroundColor, backgroundWidth, columns }: ContentProps): ReactElement | null => {

    if (columns === undefined || columns.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('Columns must be set');

        return null;
    }

    if (backgroundWidth === 'full' && backgroundColor === 'black') {
        return (
            <div className="flex-grow">
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
                <div className="p-4 bg-black text-white">
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
