import Link from 'next/link';
import type { ReactElement } from 'react';
import type { DesktopNavigationItemProps } from '@/components/layout/navigation/desktop/DesktopNavigationItems';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';

const DesktopNavigationLink = ({ link, label, subLabel }: DesktopNavigationItemProps): ReactElement => {
    return (
        <Link
            href={link}
            className="leading-5 pt-1 hover:text-orange-500 hover:cursor-pointer whitespace-nowrap"
        >
            {label}

            {isNotEmptyString(subLabel) && (
                <>
                    <br />
                    <span className="text-sm font-medium">{subLabel}</span>
                </>
            )}
        </Link>
    );
};

export default DesktopNavigationLink;
