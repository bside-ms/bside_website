import Link from 'next/link';
import type { ReactElement } from 'react';
import type { MenuItem } from '../../types/MenuItem';
import type { MainMenu, Page } from '../../types/payload/payload-types';

interface Props {
    mainMenu?: MainMenu;
}

function generateMenuLink(item: MenuItem): string {

    if (item.link.type === 'custom') {
        return item.link.url;
    }

    switch (item.link.reference.relationTo) {
        case 'pages': {
            const pageItem = item.link.reference.value as Page;
            if (pageItem.breadcrumbs === undefined) {
                return '';
            }
            return pageItem.breadcrumbs[pageItem.breadcrumbs.length - 1]?.url ?? '';
        }

        default:
            return item.link.url;
    }
}

const HeaderMenuItems = ({ mainMenu }: Props): ReactElement => {
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {mainMenu?.navItems.map(item => (
                <Link
                    key={item.id}
                    href={generateMenuLink(item as MenuItem)}
                    className="px-6 text-md md:text-lg font-bold font-serif"
                >
                    {item.link.label}
                </Link>
            ))}
        </>
    );
};

export default HeaderMenuItems;
