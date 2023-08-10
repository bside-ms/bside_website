import Image from 'next/image';
import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';

interface Props {
    imageSrc: string;
    imageAlt: string;
    title: string;
}

const HeroImage = ({ imageSrc, imageAlt, title }: Props): ReactElement => {

    return (
        <>
            <div className="w-full h-32 xs:h-40 md:h-52 relative">
                <Image
                    src={`/assets/${imageSrc}`}
                    alt={imageAlt}
                    fill={true}
                    className="object-cover"
                    priority={true}
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
