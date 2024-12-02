import clsx from 'clsx';
import NextImage from 'next/image';
import type { ReactElement } from 'react';
import isEmptyNumber from '@/lib/common/helper/isEmptyNumber';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import type { Media as MediaType } from '@/types/payload/payload-types';

export interface Props {
    resource: MediaType;
    effects: Array<'blur' | 'grayscale' | 'desaturated' | 'darker'>;
}

export const PayloadImage = ({
    resource: { url, alt, height, width },
    effects,
}: Props): ReactElement => {
    if (isEmptyString(url) || isEmptyNumber(height) || isEmptyNumber(width)) {
        console.warn('Resource is missing required fields', { url, height, width });
        return <div />;
    }

    return (
        <NextImage
            className={clsx(
                effects.includes('blur') && 'blur-[1.5px]',
                effects.includes('grayscale') && 'grayscale',
                effects.includes('desaturated') && 'saturate-50',
                effects.includes('darker') && 'brightness-50',
            )}
            src={url}
            alt={alt}
            width={width}
            height={height}
        />
    );
};
