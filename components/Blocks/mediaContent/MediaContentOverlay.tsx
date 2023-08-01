import type { ReactElement } from 'react';
import RichText from '@/components/Blocks/RichText';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import type { SlateChildren } from '@/types/payload/Blocks';
import type { Media } from '@/types/payload/payload-types';

interface Props {
    media: Media;
    richText: SlateChildren;
    headline?: string;
}

const MediaContentOverlay = ({ media, richText, headline }: Props): ReactElement => {

    return (
        <>
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
        </>
    );
};

export default MediaContentOverlay;
