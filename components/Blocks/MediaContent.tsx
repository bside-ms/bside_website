import { Fragment } from 'react';
import type { ReactElement } from 'react';
import RichText from '@/components/Blocks/RichText';
import { PayloadImage } from '@/components/common/Image';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import type { MediaContentBlockProps } from '@/types/payload/Blocks';
import type { Media } from '@/types/payload/payload-types';

const MediaContent = ({ media, richText, alignment }: { media: Media } & MediaContentBlockProps): ReactElement | null => {

    return (
        <ContentWrapper>
            {alignment === 'contentOnRight' ? (
                <div className="grid grid-cols-12 gap-4">
                    <div className="my-auto col-span-12 md:col-span-6">
                        <PayloadImage resource={media} />
                    </div>
                    <div className="my-auto col-span-12 md:col-span-6">
                        <RichText content={richText} />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-12 gap-4">
                    <div className="my-auto col-span-12 md:col-span-6">
                        <RichText content={richText} />
                    </div>
                    <div className="my-auto col-span-12 md:col-span-6">
                        <PayloadImage resource={media} />
                    </div>
                </div>
            )}
        </ContentWrapper>
    );
};

const MediaContentOverlay = ({ media, richText, headline }: { media: Media } & MediaContentBlockProps): ReactElement => {
    return (
        <Fragment>
            <div className="w-full px-4 lg:w-[60rem] xl:w-[80rem] lg:mx-auto">
                <div
                    className="bg-cover bg-center w-full h-52 md:h-72"
                    style={{ backgroundImage: `url(${media.url})` }}
                />
            </div>

            <div className="px-4 md:px-0 -translate-y-10 -mb-10 md:-translate-y-20 md:-mb-20">
                <ContentWrapper>
                    <div className="bg-black text-white p-6">
                        {!isEmptyString(headline) && (
                            <div className="font-bold font-serif text-lg md:text-xl">
                                {headline}
                            </div>
                        )}
                        <div className="mt-3 md:text-lg">
                            <RichText content={richText} />
                        </div>
                    </div>
                </ContentWrapper>
            </div>
        </Fragment>
    );
};

export const MediaContentBlock = ({ alignment, backgroundColor, headline, media, richText }: MediaContentBlockProps): ReactElement | null => {

    if (typeof media === 'string') {
        // eslint-disable-next-line no-console
        console.warn('Media of type string currently not supported');

        return null;
    }

    if (alignment === 'contentOnBottom') {
        return (
            <MediaContentOverlay
                media={media}
                richText={richText}
                headline={headline}
                alignment=""
            />
        );
    }

    if (backgroundColor === 'black') {
        return (
            <div className="flex-grow">
                <div className="bg-black text-white">
                    <MediaContent media={media} richText={richText} alignment={alignment} />
                </div>
            </div>
        );
    }

    return <MediaContent media={media} richText={richText} alignment={alignment} />;
};
