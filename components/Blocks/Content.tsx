import { Fragment } from 'react';
import { Cell, Grid } from '@faceless-ui/css-grid';
import type { ReactElement } from 'react';
import RichText from '@/components/Blocks/RichText';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import type { ContentProps } from '@/types/payload/Blocks';

const Columns = ({ columns }: ContentProps): ReactElement => {
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
                        <RichText content={columns[0]!.richText} />
                    </Cell>
                    <Cell cols={col2Cols} colsM={12}>
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
                            <RichText content={columns[0]!.richText} />
                        </Cell>
                        <Cell cols={4} colsM={12}>
                            <RichText content={columns[1]!.richText} />
                        </Cell>
                        <Cell cols={4} colsM={12}>
                            <RichText content={columns[2]!.richText} />
                        </Cell>
                    </Fragment>
                );
            }

            // Two Columns.
            return (
                <Fragment>
                    <Cell cols={4} colsM={12}>
                        <RichText content={columns[0]!.richText} />
                    </Cell>
                    <Cell cols={8} colsM={12}>
                        <RichText content={columns[1]!.richText} />
                    </Cell>
                </Fragment>
            );
        }
    }

    return (<div />);
};

export const ContentBlock = (props: ContentProps): ReactElement => {
    return (
        <ContentWrapper px={false}>
            <Grid>
                <Columns columns={props.columns} />
            </Grid>
        </ContentWrapper>
    );
};
