import clsx from 'clsx';
import Image from 'next/image';
import type { ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';
import isEmptyString from '@/lib/common/helper/isEmptyString';
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
    caption = '',
    size,
    effects,
}: MediaBlockProps): ReactElement | null => {
    if (typeof media === 'string') {
        return null;
    }

    if (media.url === undefined || media.url === null || isEmptyString(media.url)) {
        return null;
    }

    if (size === 'wide' && media.sizes?.wide?.url !== undefined) {
        return WideMediaBlock(media.sizes.wide.url!, effects ?? []);
    }

    // ToDo: Implement the square version of the image.

    return (
        <ContentWrapper>
            <div className="relative">
                <Image
                    src={media.url}
                    alt={media.alt}
                    width={media.width!}
                    height={media.height!}
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
