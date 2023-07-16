import { Fragment } from 'react';
import { Cell, Grid } from '@faceless-ui/css-grid';
import type React from 'react';
import RichText from '@/components/Blocks/RichText';
import type { Circle } from '@/types/payload/payload-types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type Props = Extract<Circle['layout'][0], { blockType: 'content' }>;

const Columns: React.FC<Props> = ({
    layout,
    columnOne,
    columnTwo,
    columnThree,
}) => {

    switch (layout) {
        case 'oneColumn': {
            return (
                <Cell cols={9} colsM={4}>
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                    <RichText content={columnOne.richText} />
                </Cell>
            );
        }

        case 'halfAndHalf':
        case 'twoThirdsOneThird': {
            let col1Cols = 6;
            let col2Cols = 6;

            if (layout === 'twoThirdsOneThird') {
                col1Cols = 8;
                col2Cols = 4;
            }

            return (
                <Fragment>
                    <Cell cols={col1Cols} colsM={4}>
                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                        <RichText content={columnOne.richText} />
                    </Cell>
                    <Cell cols={col2Cols} colsM={4}>
                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                        <RichText content={columnTwo?.richText} />
                    </Cell>
                </Fragment>
            );
        }

        case 'threeColumns': {
            return (
                <Fragment>
                    <Cell cols={4} colsM={4}>
                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                        <RichText content={columnOne.richText} />
                    </Cell>
                    <Cell cols={4} colsM={4}>
                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                        <RichText content={columnTwo?.richText} />
                    </Cell>
                    <Cell cols={4} colsM={4}>
                        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                        <RichText content={columnThree?.richText} />
                    </Cell>
                </Fragment>
            );
        }
    }

    return null;
};

export const ContentBlock: React.FC<Props> = (props) => {
    return (
        <div className="relative">
            <Grid>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Columns {...props} />
            </Grid>
        </div>
    );
};
