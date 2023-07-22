import type { ReactElement } from 'react';
import RichText from '@/components/Blocks/RichText';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import type { ContentProps } from '@/types/payload/Blocks';

const Columns = ({ columns }: ContentProps): ReactElement => {
    switch (columns[0]?.width) {
        case 'full': {
            return (
                <RichText content={columns[0]!.richText} />
            );
        }

        case 'half':
            return (
                <div className="grid grid-cols-2 gap-4">
                    <div className="">
                        <RichText content={columns[0]!.richText} />
                    </div>
                    <div className="">
                        <RichText content={columns[1]!.richText} />
                    </div>
                </div>
            );

        case 'twoThirds': {
            return (
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-4">
                        <RichText content={columns[0]!.richText} />
                    </div>
                    <div className="col-span-2">
                        <RichText content={columns[1]!.richText} />
                    </div>
                </div>
            );
        }

        case 'oneThird': {
            // Three Columns
            if (columns[1]?.width === 'oneThird') {
                return (
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <RichText content={columns[0]!.richText} />
                        </div>
                        <div>
                            <RichText content={columns[1]!.richText} />
                        </div>
                        <div>
                            <RichText content={columns[2]!.richText} />
                        </div>
                    </div>
                );
            }

            // Two Columns.
            return (
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-2">
                        <RichText content={columns[0]!.richText} />
                    </div>
                    <div className="col-span-4">
                        <RichText content={columns[1]!.richText} />
                    </div>
                </div>
            );
        }
    }

    return (<div />);
};

export const ContentBlock = (props: ContentProps): ReactElement => {

    return (
        (props.backgroundWidth === 'full' && props.backgroundColor === 'black' ? (
            <div className="flex-grow">
                <div className="bg-black text-white">
                    <ContentWrapper px={false}>
                        <Columns columns={props.columns} />
                    </ContentWrapper>
                </div>
            </div>
        ) : (
            <ContentWrapper px={false}>
                <div className={`${(props.backgroundColor === 'black' ? 'p-4 bg-black text-white' : '')}`}>
                    <Columns columns={props.columns} />
                </div>
            </ContentWrapper>
        ))
    );
};
