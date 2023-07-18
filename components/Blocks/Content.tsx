import { Fragment } from 'react';
import { Cell, Grid } from '@faceless-ui/css-grid';
import type React from 'react';
import RichText from '@/components/Blocks/RichText';
import ContentWrapper from '@/components/Layout/ContentWrapper';

type SlateChildren = Array<Record<string, unknown>>;
interface ColumnProps {
    width: string;
    alignment: string;
    richText: SlateChildren;
    id: string;
}
interface ContentProps {
    columns: Array<ColumnProps>;
}

const Columns: React.FC<ContentProps> = ({
    columns,
}) => {

    switch (columns[0]?.width) {
        case 'full': {
            return (
                <Cell cols={12}>
                    <RichText content={columns[0]!.richText} />
                </Cell>
            );
        }

        case 'half':
        case 'twoThirds': {
            let col1Cols = 6;
            let col2Cols = 6;

            if (columns[0]?.width === 'twoThirds') {
                col1Cols = 8;
                col2Cols = 4;
            }

            return (
                <Fragment>
                    <Cell cols={col1Cols} colsM={12}>
                        { }
                        <RichText content={columns[0]!.richText} />
                    </Cell>
                    <Cell cols={col2Cols} colsM={12}>
                        { }
                        <RichText content={columns[1]!.richText} />
                    </Cell>
                </Fragment>
            );
        }

        case 'oneThird': {
            // Three Columns
            if (columns[1]?.width === 'oneThird') {
                return (
                    <Fragment>
                        <Cell cols={4} colsM={12}>
                            { }
                            <RichText content={columns[0]!.richText} />
                        </Cell>
                        <Cell cols={4} colsM={12}>
                            { }
                            <RichText content={columns[1]!.richText} />
                        </Cell>
                        <Cell cols={4} colsM={12}>
                            { }
                            <RichText content={columns[2]!.richText} />
                        </Cell>
                    </Fragment>
                );
            }

            // Two Columns.
            return (
                <Fragment>
                    <Cell cols={4} colsM={12}>
                        { }
                        <RichText content={columns[0]!.richText} />
                    </Cell>
                    <Cell cols={8} colsM={12}>
                        { }
                        <RichText content={columns[1]!.richText} />
                    </Cell>
                </Fragment>
            );
        }
    }

    return null;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type Props = Extract<Circle['layout'][0], { blockType: 'content' }>;

export const ContentBlock: React.FC<Props> = (props) => {

    return (
        <ContentWrapper px={false}>
            <Grid>
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                <Columns columns={props.columns} />
            </Grid>
        </ContentWrapper>
    );
};
