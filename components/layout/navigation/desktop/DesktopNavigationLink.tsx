import Link from 'next/link';
import type { ReactElement } from 'react';
import isNotEmptyString from '@/lib/common/helper/isNotEmptyString';

export interface DesktopNavigationItemLocaleProps {
    link: string;
    label: string;
    subLabel?: string;
}

export const DesktopNavigationLink = ({
    link,
    label,
    subLabel,
}: DesktopNavigationItemLocaleProps): ReactElement => {
    return (
        <Link
            href={link}
            className="whitespace-nowrap pt-1 leading-5 hover:cursor-pointer hover:text-orange-500"
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
