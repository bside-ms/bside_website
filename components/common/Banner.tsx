import Link from 'next/link';
import type { ReactElement } from 'react';

interface Props {
    bannerId: string;
    bannerText: string;
    bannerLink: string;
}

const Banner = ({ bannerId, bannerText, bannerLink }: Props): ReactElement => {
    return (
        <div
            id={bannerId}
            className="sticky top-0 left-0 right-0 z-10 h-[44px] bg-black py-2 text-center transition-opacity duration-100"
        >
            <Link
                href={bannerLink}
                className="text-white font-serif text-sm lg:text-lg hover:bg-orange-600"
            >
                {bannerText}
            </Link>
        </div>
    );
};

export default Banner;
