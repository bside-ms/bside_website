import { Fragment } from 'react';
import Link from 'next/link';
import type { ReactElement } from 'react';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { getFullClientUrl } from '@/lib/common/url';

interface Props {
    bannerId: string;
    bannerText: string;
    bannerLink: string;
    footerInView: boolean;
    isPreview?: boolean;
    isPreviewBanner?: boolean;
}

const Banner = ({ bannerId, bannerText, bannerLink, footerInView, isPreview = false, isPreviewBanner = false }: Props): ReactElement => {
    return (
        <Fragment>
            {isPreview && (
                <Banner
                    bannerId="preview"
                    bannerText="Vorschaumodus!"
                    bannerLink={getFullClientUrl('/api/preview?secret=destroy')}
                    footerInView={false}
                    isPreviewBanner={true}
                />
            )}
            <div
                id={`banner__${bannerId}`}
                className={`fixed bottom-0 left-0 right-0 ${isPreviewBanner ? 'z-30' : 'z-20'} lg:h-[44px] ${isPreviewBanner ? 'bg-blue-900' : 'bg-black'} py-2 text-center transition-opacity duration-100`}
                style={(footerInView) ? { display: 'none' } : { display: 'block' }}
            >
                {!isEmptyString(bannerLink) ? (
                    <Link
                        href={bannerLink}
                        className="text-white font-serif text-sm lg:text-lg hover:bg-orange-600"
                        target={isPreviewBanner ? '_blank' : '_self'}
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
        </Fragment>

    );
};

export default Banner;
