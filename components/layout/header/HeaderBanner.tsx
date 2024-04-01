import { useCallback } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import type { MouseEvent, ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import useLocalStorage from '@/lib/common/hooks/useLocalStorage';

const HeaderBanner = (): ReactElement => {

    // TODO: Move config to CMS
    const isBannerActive = true;
    const bannerId = 20240401;
    const bannerText = 'Es gibt aktuelle Ausschreibungen in der offenen Werkstatt!';
    const bannerLink = '/jobs';
    const bannerColor = '#1555ff';
    const bannerTextColor = '#ffffff';

    const [hasDismissedBanner, setDismissedBanner] = useLocalStorage(`header_${bannerId}_dismissed`, false);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const isBannerVisible = isBannerActive && !hasDismissedBanner;

    const onDismissClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();

        setDismissedBanner(true);
    }, [setDismissedBanner]);

    const content = (
        <ContentWrapper className="!py-2">
            <div className="flex justify-between items-center gap-2">
                <div className="mx-auto">{bannerText}</div>
                <div className="hover:text-red-800 px-4" onClick={onDismissClick}>✕</div>
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
