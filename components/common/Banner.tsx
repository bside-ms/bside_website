import type { ReactElement } from 'react';

interface Props {
    bannerId: string;
    bannerText: string;
    bannerLink: string;
    sticky?: boolean;
}

const Banner = ({ bannerId, bannerText, bannerLink, sticky = false }: Props): ReactElement => {
    return (
        <div
            id={bannerId}
            className={`${sticky ? 'sticky' : ''} top-0 left-0 right-0 z-10 bg-black py-2 text-center transition-opacity duration-100`}
            style={{ height: '44px' }}
        >
            <a
                href={bannerLink}
                className="text-white font-serif text-sm lg:text-lg hover:bg-orange-600"
            >
                {bannerText}
            </a>
        </div>
    );
};

export default Banner;
