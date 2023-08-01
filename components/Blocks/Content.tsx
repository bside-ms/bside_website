import type { ReactElement } from 'react';
import RichText from '@/components/Blocks/RichText';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import type { ContentColumnProps, ContentProps } from '@/types/payload/Blocks';

const Columns = ({ columns }: { columns: Array<ContentColumnProps> }): ReactElement | null => {

    const [firstColumn, secondColumn, thirdColumn] = columns;

    if (firstColumn === undefined) {
        // eslint-disable-next-line no-console
        console.warn('At least first column must be set');

        return null;
    }

    switch (firstColumn.width) {
        case 'full':
            return <RichText content={firstColumn.richText} />;

        case 'half':
            if (secondColumn === undefined) {
                // eslint-disable-next-line no-console
                console.warn('Falling back to full column instead of half since second column is missing');

                return <RichText content={firstColumn.richText} />;
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

        case 'twoThirds':
            if (secondColumn === undefined) {
                // eslint-disable-next-line no-console
                console.warn('Falling back to full column instead of twoThirds since second column is missing');

                return <RichText content={firstColumn.richText} />;
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

        case 'oneThird':
            if (secondColumn === undefined) {
                // eslint-disable-next-line no-console
                console.warn('Falling back to full column instead of oneThird since second column is missing');

                return <RichText content={firstColumn.richText} />;
            }

            // Three Columns
            if (secondColumn.width === 'oneThird') {

                if (thirdColumn === undefined) {
                    // eslint-disable-next-line no-console
                    console.warn('Falling back to two columns instead of oneThird since third column is missing');

                    return (
                        <div className="grid grid-cols-6 gap-4">
                            <div className="col-span-2">
                                <RichText content={firstColumn.richText} />
                            </div>
                            <div className="col-span-4">
                                <RichText content={secondColumn.richText} />
                            </div>
                        </div>
                    );
                }

                return (
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <RichText content={firstColumn.richText} />
                        </div>
                        <div>
                            <RichText content={secondColumn.richText} />
                        </div>
                        <div>
                            <RichText content={thirdColumn.richText} />
                        </div>
                    </div>
                );
            }

            // Two Columns.
            return (
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-2">
                        <RichText content={firstColumn.richText} />
                    </div>
                    <div className="col-span-4">
                        <RichText content={secondColumn.richText} />
                    </div>
                </div>
            );

    }

    return <div />;
};

export const ContentBlock = ({ backgroundColor, backgroundWidth, columns }: ContentProps): ReactElement | null => {

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
                        <Columns columns={columns} />
                    </ContentWrapper>
                </div>
            </div>
        );
    }

    if (backgroundColor === 'black') {
        return (
            <ContentWrapper>
                <div className="p-4 bg-black text-white">
                    <Columns columns={columns} />
                </div>
            </ContentWrapper>
        );
    }

    return (
        <ContentWrapper>
            <Columns columns={columns} />
        </ContentWrapper>
    );
};
