import { useCallback } from 'react';
import Link from 'next/link';
import useLocale from '@/lib/common/hooks/useLocale';
import type { MouseEvent, ReactElement } from 'react';
import useSWR from 'swr';
import ContentWrapper from '@/components/layout/ContentWrapper';
import fetcher from '@/lib/common/fetcher';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import useLocalStorage from '@/lib/common/hooks/useLocalStorage';
import type { Banner } from '@/types/payload/payload-types';

const HeaderBannerContent = ({
    bannerData: { bannerId, isActive, bannerText, bannerLink, textColor, backgroundColor },
}: {
    bannerData: Banner;
}): ReactElement | null => {
    const [hasDismissedBanner, setDismissedBanner] = useLocalStorage(`header_${bannerId}_dismissed`, false);

    const onDismissClick = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            event.preventDefault();

            setDismissedBanner(true);
        },
        [setDismissedBanner],
    );

    if (!isActive || hasDismissedBanner) {
        return null;
    }

    const content = (
        <ContentWrapper className="!py-2">
            <div className="flex items-center justify-between gap-2">
                <div className="mx-auto">{bannerText}</div>
                <div className="px-4 hover:italic hover:text-red-800" onClick={onDismissClick}>
                    ✕
                </div>
            </div>
        </ContentWrapper>
    );

    return (
        <div className="font-serif text-sm md:text-base lg:text-lg" style={{ backgroundColor, color: textColor }}>
            {isNotEmptyString(bannerLink) ? <Link href={bannerLink}>{content}</Link> : content}
        </div>
    );
};

const HeaderBanner = (): ReactElement | null => {
    const locale = useLocale();
    const { data: bannerData } = useSWR<Banner>(`/api/banner?lang=${locale}`, fetcher, {
        keepPreviousData: true,
    });

    return bannerData === undefined ? null : <HeaderBannerContent bannerData={bannerData} />;
};

export default HeaderBanner;
