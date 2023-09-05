import Image from 'next/image';
import type { ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import type { MediaBlockProps } from '@/types/payload/Blocks';

const MediaBlock = ({ media, caption = '', size }: MediaBlockProps): ReactElement | null => {

    if (typeof media === 'string') {
        // eslint-disable-next-line no-console
        console.warn('Media of type string currently not supported');

        return null;
    }

    if (isEmptyString(media.url)) {
        // eslint-disable-next-line no-console
        console.warn('URL of media must not be empty');

        return null;
    }

    if (size === 'wide' && media.sizes?.wide?.url !== undefined) {
        return (
            <div className="w-full px-4 lg:w-[60rem] xl:w-[80rem] lg:mx-auto">
                <div
                    className="bg-cover bg-center w-full h-52 md:h-72 my-8"
                    style={{ backgroundImage: `url(${media.sizes.wide.url})` }}
                />
            </div>
        );
    }

    // ToDo: Implement the square version of the image.

    return (
        <ContentWrapper>
            <div className="relative">
                <Image
                    src={media.url}
                    alt={media.alt}
                    width={media.width}
                    height={media.height}
                    className="mx-auto"
                />

                {!isEmptyString(caption) && (
                    <div className="text-center text-sm md:text-base mt-1 md:mt-2 italic">
                        <p className="mx-auto">{caption} Size: {size}</p>
                    </div>
                )}
            </div>
        </ContentWrapper>
    );
};

export default MediaBlock;
