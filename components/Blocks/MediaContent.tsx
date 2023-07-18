import { Fragment } from 'react';
import { Cell, Grid } from '@faceless-ui/css-grid';
import RichText from '@/components/Blocks/RichText';
import { PayloadImage } from '@/components/common/Image';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import type { Circle, Media } from '@/types/payload/payload-types';

type SlateChildren = Array<Record<string, unknown>>;
interface MediaBlockProps {
    media: Media;
    richText: SlateChildren;
    alignment: string;
}

export const MediaContentBlock: React.FC<MediaBlockProps> = (mediaContentFields: MediaBlockProps) => {
    const { media, richText, alignment } = mediaContentFields;

    return (
        <Grid>
            {alignment === 'mediaContent' ? (
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export type MediaContentProps = Extract<Circle['layout'][0], { blockType: 'mediaContent' }>;

export const MediaContent: React.FC<MediaContentProps> = props => {

    return (
        <ContentWrapper px={false}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <MediaContentBlock {...props} />
        </ContentWrapper>
    );
};
