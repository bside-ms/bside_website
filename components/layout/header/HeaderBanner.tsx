import { useCallback } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import type { ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';
import useLocalStorage from '@/lib/common/hooks/useLocalStorage';

const HeaderBanner = (): ReactElement => {

    // TODO: Move config to CMS
    const isBannerActive = false;
    const bannerId = 4711;
    const bannerText = 'Die besten Veranstaltungen in deiner Nähe!';
    const bannerLink = '/events';
    const bannerColor = '#f6981e';
    const bannerTextColor = '#ffffff';

    const [hasDismissedBanner, setDismissedBanner] = useLocalStorage(`header_${bannerId}_dismissed`, false);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const isBannerVisible = isBannerActive && !hasDismissedBanner;

    const onDismissClick = useCallback(() => setDismissedBanner(true), [setDismissedBanner]);

    const content = (
        <ContentWrapper className="!py-2">
            <div className="flex justify-between items-center gap-2">
                {bannerText}

                <div onClick={onDismissClick}>✕</div>
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
