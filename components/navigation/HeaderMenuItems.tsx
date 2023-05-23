import Link from 'next/link';
import type { ReactElement } from 'react';
import type { MenuItem } from '@/types/MenuItem';
import type { MainMenu } from '@/types/payload/payload-types';

interface Props {
    mainMenu?: MainMenu;
}

const generateMenuLink = (item: MenuItem): string => {

    if (item.link.type === 'custom') {
        return item.link.url;
    }

    // This is a switch on purpose so new relations will cause error
    switch (item.link.reference.relationTo) {
        case 'pages': {
            const pageItem = item.link.reference.value;

            if (typeof pageItem === 'string') {
                return pageItem;
            }

            if (pageItem.breadcrumbs === undefined) {
                return '';
            }

            return pageItem.breadcrumbs[pageItem.breadcrumbs.length - 1]?.url ?? '';
        }
    }
};

const HeaderMenuItems = ({ mainMenu }: Props): ReactElement => {

    return (
        <>
            {mainMenu?.navItems.map(item => (
                <Link
                    key={item.id}
                    href={generateMenuLink(item)}
                    className="px-6 text-md md:text-lg font-bold font-serif"
                >
                    {item.link.label}
                </Link>
            ))}
        </>
    );
};

export default HeaderMenuItems;
