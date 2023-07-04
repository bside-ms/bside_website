import Link from 'next/link';
import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';

interface Props {
    bannerId: string;
    bannerText: string;
    bannerLink: string;
    footerInView: boolean;
}

const Banner = ({ bannerId, bannerText, bannerLink, footerInView }: Props): ReactElement => {
    return (
        <div
            id={bannerId}
            className="fixed bottom-[28px] sm:bottom-0 left-0 right-0 z-50 h-[44px] bg-black py-2 text-center transition-opacity duration-100"
            style={(footerInView) ? { display: 'none' } : { display: 'block' }}
        >
            {!isEmptyString(bannerLink) ? (
                <Link
                    href={bannerLink}
                    className="text-white font-serif text-sm lg:text-lg hover:bg-orange-600"
                >
                    {bannerText}
                </Link>
            ) : (
                <div
                    className="text-white font-serif text-sm lg:text-lg"
                >
                    {bannerText}
                </div>
            )}

        </div>
    );
};

export default Banner;
