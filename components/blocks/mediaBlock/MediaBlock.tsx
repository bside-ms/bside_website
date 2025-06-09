import clsx from 'clsx';
import Image from 'next/image';
import type { ReactElement } from 'react';
import { isNil } from 'lodash-es';
import ContentWrapper from '@/components/layout/ContentWrapper';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import isEmptyNumber from '@/lib/common/helper/isEmptyNumber';
import type { MediaBlockProps } from '@/types/payload/Blocks';

const WideMediaBlock = (
    url: string,
    effects: Array<'blur' | 'grayscale' | 'desaturated' | 'darker'>,
): ReactElement | null => {
    return (
        <div className="w-full px-4 lg:mx-auto lg:w-[60rem] xl:w-[80rem]">
            <div
                className={clsx(
                    'my-4 h-52 w-full bg-center md:h-72',
                    effects.includes('blur') && 'blur-[2px]',
                    effects.includes('grayscale') && 'grayscale',
                    effects.includes('desaturated') && 'saturate-50',
                    effects.includes('darker') && 'brightness-50',
                    'xl:rounded-lg',
                )}
                style={{ backgroundImage: `url(${url})` }}
            />
        </div>
    );
};

const MediaBlock = ({
    media,
    caption,
    size,
    effects,
}: MediaBlockProps): ReactElement | null => {
    if (typeof media === 'string') {
        console.warn('Unexpectedly media is just a string, this is not supported.');
        return null;
    }

    if (isEmptyString(media.url)) {
        console.warn('Unexpectedly media URL is not set, something went wrong here.');
        return null;
    }

    if (size === 'wide') {
        if (isNil(media.sizes?.wide?.url)) {
            console.warn('Unexpectedly wide version of image is not available.');
            return null;
        }

        return WideMediaBlock(media.sizes.wide.url, effects ?? []);
    }

    let [width, height] = [media.width, media.height];

    if (isEmptyNumber(width) || isEmptyNumber(height)) {
        console.warn('Unexpectedly size of image is not set, using somewhat arbitrary fallback.');
        [width, height] = [100, 100];
    }

    // ToDo: Implement the square version of the image.

    return (
        <ContentWrapper>
            <div className="relative">
                <Image
                    src={media.url}
                    alt={media.alt}
                    width={width}
                    height={height}
                    className={clsx(
                        'mx-auto',
                        (effects?.includes('blur') ?? false) && 'blur-[2px]',
                        (effects?.includes('grayscale') ?? false) && 'grayscale',
                        (effects?.includes('desaturated') ?? false) && 'saturate-50',
                        (effects?.includes('darker') ?? false) && 'brightness-50',
                    )}
                />

                {!isEmptyString(caption) && (
                    <div className="mt-1 text-center text-sm italic md:mt-2 md:text-base">
                        <p className="mx-auto">{caption}</p>
                    </div>
                )}
            </div>
        </ContentWrapper>
    );
};

export default MediaBlock;
