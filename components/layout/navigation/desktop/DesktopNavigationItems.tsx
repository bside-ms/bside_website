
export interface DesktopNavigationItemProps {
    link: string;
    label: string;
    subLabel?: string;
}

export const DesktopNavigationItems = new Array<DesktopNavigationItemProps>(
    {
        link: '/bside',
        label: 'Die B-Side',
    },
    {
        link: '/events',
        label: 'Veranstaltungen',
    },
    {
        link: '/kultur',
        label: 'Kultur & Bildung',
        subLabel: 'B-Side Kultur e.V.',
    },
    {
        link: '/quartier',
        label: 'Quartiersarbeit',
        subLabel: 'B-Side GmbH',
    },
);
