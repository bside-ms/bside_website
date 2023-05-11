import type { Page } from './payload/payload-types';

export interface MenuItem {
    link: {
        type?: 'reference' | 'custom';
        newTab?: boolean;
        reference: {
            value: string | Page;
            relationTo: 'pages';
        };
        url: string;
        label: string;
    };
    id?: string;
}
