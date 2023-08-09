import Image from 'next/image';
import type { ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';

interface Props {
    imageSrc: string;
    imageAlt: string;
    title: string;
}

const HeroImageSvg = ({ imageSrc, imageAlt, title }: Props): ReactElement => {

    return (
        <ContentWrapper>
            <div className="w-full h-32 xs:h-40 md:h-52 relative lg:mt-4">
                <Image
                    src={`/assets/stickFigures/${imageSrc}.svg`}
                    alt={imageAlt}
                    fill={true}
                    className="object-contain"
                    priority={true}
                />
            </div>

            <div className="font-serif text-white bg-black mt-4 text-2xl text-center p-3">
                {title}
            </div>
        </ContentWrapper>
    );
};

export default HeroImageSvg;
