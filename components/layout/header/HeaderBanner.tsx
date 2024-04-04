import { useCallback } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { MouseEvent, ReactElement } from 'react';
import useSWR from 'swr';
import ContentWrapper from '@/components/layout/ContentWrapper';
import fetcher from '@/lib/common/fetcher';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import useLocalStorage from '@/lib/common/hooks/useLocalStorage';
import type { Banner } from '@/types/payload/payload-types';

const HeaderBanner = (): ReactElement => {

    const { locale } = useRouter();
    const { data: bannerData } = useSWR<Banner>(`/api/banner?lang=${locale}`, fetcher, { keepPreviousData: true });

    const isBannerActive = bannerData ? bannerData.isActive : false;
    const bannerId = bannerData ? bannerData.id : '';
    const bannerText = bannerData ? bannerData.bannerText : '';
    const bannerLink = bannerData ? bannerData.bannerLink : '';
    const bannerColor = bannerData ? bannerData.backgroundColor : '#000000';
    const bannerTextColor = bannerData ? bannerData.textColor : '#ffffff';

    const [hasDismissedBanner, setDismissedBanner] = useLocalStorage(`header_${bannerId}_dismissed`, false);
    const isBannerVisible = isBannerActive && !hasDismissedBanner;

    const onDismissClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        setDismissedBanner(true);
    }, [setDismissedBanner]);

    const content = (
        <ContentWrapper className="!py-2">
            <div className="flex justify-between items-center gap-2">
                <div className="mx-auto">{bannerText}</div>
                <div className="hover:text-red-800 hover:italic px-4" onClick={onDismissClick}>✕</div>
            </div>
        </ContentWrapper>
    );

    return (
        <div
            className={classNames(
                'font-serif',
                'text-sm',
                'md:text-base',
                'lg:text-lg',
                !isBannerVisible && 'hidden'
            )}
            style={{ backgroundColor: bannerColor, color: bannerTextColor }}
        >
            {isNotEmptyString(bannerLink) ? <Link href={bannerLink}>{content}</Link> : content}
        </div>
    );
};

export default HeaderBanner;
