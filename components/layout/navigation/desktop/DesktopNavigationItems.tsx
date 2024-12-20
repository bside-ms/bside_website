export interface DesktopNavigationItemProps {
    link: string;
    labelDe: string;
    labelEn: string;
    subLabel?: string;
}

export const DesktopNavigationItems = new Array<DesktopNavigationItemProps>(
    {
        link: '/bside',
        labelDe: 'Die B-Side',
        labelEn: 'About B-Side',
    },
    {
        link: '/events',
        labelDe: 'Veranstaltungen',
        labelEn: 'Events',
    },
    {
        link: '/kultur',
        labelDe: 'Kultur & Bildung',
        labelEn: 'Culture & Education',
        subLabel: 'B-Side Kultur e.V.',
    },
    {
        link: '/quartier',
        labelDe: 'Quartiersarbeit',
        labelEn: 'Neighbourhood Work',
        subLabel: 'B-Side GmbH',
    },
    {
        link: '/news',
        labelDe: 'Aktuelles',
        labelEn: 'News',
    },
    {
        link: '/support',
        labelDe: 'Unterstützen',
        labelEn: 'Support us',
    },
);
