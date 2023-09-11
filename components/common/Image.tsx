import React from 'react';
import clsx from 'clsx';
import type { StaticImageData } from 'next/image';
import NextImage from 'next/image';
import type { ReactElement } from 'react';
import cssVariables from '../../cssVariables';
import type { Media as MediaType } from '@/types/payload/payload-types';

const { breakpoints } = cssVariables;

export interface Props {
    src?: StaticImageData | string; // for static media
    alt?: string;
    resource?: MediaType; // for Payload media
    sizes?: string; // for NextImage only
    priority?: boolean; // for NextImage only
    fill?: boolean; // for NextImage only
    imgClassName?: string;
    onClick?: () => void;
    onLoad?: () => void;
    width?: number;
    height?: number;
    effects: Array<'blur' | 'grayscale' | 'desaturated' | 'darker'>;
}

export const PayloadImage = (props: Props): ReactElement => {
    const {
        imgClassName,
        onClick,
        onLoad: onLoadFromProps,
        sizes: sizesFromProps,
        resource,
        priority,
        fill,
        src: srcFromProps,
        alt: altFromProps,
        width: widthFromProps,
        height: heightFromProps,
        effects: effects,
    } = props;

    const [isLoading, setIsLoading] = React.useState(true);

    let width: number | undefined = widthFromProps;
    let height: number | undefined = heightFromProps;
    let alt = altFromProps;
    let src: StaticImageData | string | undefined = srcFromProps;

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!src && resource) {
        width = resource.width;
        height = resource.height;
        alt = resource.alt;
        src = resource.url;
    }

    // NOTE: this is used by the browser to determine which image to download at different screen sizes
    const sizes =
        sizesFromProps !== undefined ||
        Object.entries(breakpoints)
            .map(([, value]) => `(max-width: ${value}px) ${value}px`)
            .join(', ');

    const baseClasses = [
        isLoading && imgClassName,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <NextImage
            className={clsx(
                baseClasses,
                effects.includes('blur') && 'blur-[1.5px]',
                effects.includes('grayscale') && 'grayscale',
                effects.includes('desaturated') && 'saturate-50',
                effects.includes('darker') && 'brightness-50',
            )}
            src={src ?? ''}
            alt={alt ?? ''}
            onClick={onClick}
            // eslint-disable-next-line react/jsx-no-bind
            onLoad={(): void => {
                setIsLoading(false);
                if (typeof onLoadFromProps === 'function') {
                    onLoadFromProps();
                }
            }}
            fill={fill}
            width={!(fill ?? false) ? width : undefined}
            height={!(fill ?? false) ? height : undefined}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            sizes={sizes}
            priority={priority}
        />
    );
};
