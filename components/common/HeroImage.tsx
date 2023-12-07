import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';

interface Props {
    imageSrc: string | StaticImport;
    imageAlt: string;
    title: string;
    width?: number;
    height?: number;
}

const HeroImage = ({ imageSrc, imageAlt, title, width, height }: Props): ReactElement => {

    return (
        <>
            <div className="w-full h-32 xs:h-40 md:h-52 relative">
                <Image
                    src={typeof imageSrc !== 'string' ? imageSrc : !imageSrc.startsWith('https://') ? `/assets/${imageSrc}` : imageSrc}
                    alt={imageAlt}
                    fill={typeof imageSrc !== 'string'}
                    sizes="(max-width: 768px) 740px, 1120px"
                    className="object-cover"
                    priority={true}
                    width={typeof imageSrc === 'string' ? width : undefined}
                    height={typeof imageSrc === 'string' ? height : undefined}
                />
            </div>

            {!isEmptyString(title) && (
                <h1 className="font-serif text-white bg-black mt-4 text-2xl text-center p-3">
                    {title}
                </h1>
            )}
        </>
    );
};

export default HeroImage;
