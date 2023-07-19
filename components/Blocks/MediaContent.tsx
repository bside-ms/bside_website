import { Fragment } from 'react';
import { Cell, Grid } from '@faceless-ui/css-grid';
import type { ReactElement } from 'react';
import RichText from '@/components/Blocks/RichText';
import { PayloadImage } from '@/components/common/Image';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import type { MediaContentBlockProps } from '@/types/payload/Blocks';

export const MediaContentBlock = ({ media, richText, alignment }: MediaContentBlockProps): ReactElement => {

    return (
        <Grid>
            {alignment === 'contentOnRight' ? (
            // media-content
                <Fragment>
                    <Cell
                        start={1}
                        cols={6}
                        colsM={12}
                        className="my-auto"
                    >
                        <PayloadImage resource={media} />
                    </Cell>
                    <Cell
                        start={8}
                        cols={5}
                        startM={1}
                        colsM={12}
                        className="my-auto"
                    >
                        <RichText content={richText} />
                    </Cell>
                </Fragment>
            ) : (
            // content-media
                <Fragment>
                    <Cell
                        start={1}
                        cols={5}
                        colsM={12}
                        className="my-auto"
                    >
                        <RichText content={richText} />
                    </Cell>
                    <Cell
                        start={7}
                        cols={6}
                        startM={1}
                        colsM={12}
                        className="my-auto"
                    >
                        <PayloadImage resource={media} />
                    </Cell>
                </Fragment>
            )}
        </Grid>
    );
};

export const MediaContent = (props: MediaContentBlockProps): ReactElement => {
    return (
        <ContentWrapper px={false}>
            <MediaContentBlock media={props.media} richText={props.richText} alignment={props.alignment} />
        </ContentWrapper>
    );
};
