import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import type { ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';
import isEmptyString from '@/lib/common/helper/isEmptyString';

interface Props {
    imageSrc: string | StaticImport;
    imageAlt: string;
    title: string;
}

const HeroImageSvg = ({ imageSrc, imageAlt, title }: Props): ReactElement => {
    return (
        <ContentWrapper>
            <div className="xs:h-40 relative h-32 w-full md:h-52 lg:mt-4">
                <Image
                    src={typeof imageSrc !== 'string' ? imageSrc : `/assets/stickFigures/${imageSrc}.svg`}
                    alt={imageAlt}
                    fill={true}
                    className="object-contain"
                    priority={true}
                />
            </div>

            {!isEmptyString(title) && <h1 className="mt-4 bg-black p-3 text-center font-serif text-2xl text-white">{title}</h1>}
        </ContentWrapper>
    );
};

export default HeroImageSvg;
