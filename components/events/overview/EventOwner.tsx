import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import createCircleLink from '@/lib/events/createCircleLink';
import createOrganisationLink from '@/lib/events/createOrganisationLink';
import type { Circle, Organisation } from '@/types/payload/payload-types';

const EventOwner = ({ owner }: { owner: { value: string | Organisation, relationTo: 'organisations' } | { value: string | Circle, relationTo: 'circles' } }): ReactElement => {
    const { locale } = useRouter();

    if (owner.relationTo === 'organisations') {
        const organisation = owner.value as Organisation;
        return (
            <Link
                key={`event-owner-${organisation.id}`}
                href={createOrganisationLink(organisation)}
                className="truncate px-1 my-auto leading-6 text-sm border-black border-b italic text-black z-10 hover:text-orange-500 hover:border-b-orange-500"
                aria-label={locale === 'de' ? `Erfahre mehr über ${organisation.name}` : `Learn more about ${organisation.name}`}
            >
                {organisation.name}
            </Link>
        );
    }

    // It's a circle!
    const circle = owner.value as Circle;
    return (
        <Link
            key={`event-owner-${circle.id}`}
            href={createCircleLink(circle)}
            className="truncate px-1 my-auto leading-6 text-sm border-black border-b italic text-black z-10 hover:text-orange-500 hover:border-b-orange-500"
            aria-label={locale === 'de' ? `Erfahre mehr über ${circle.name}` : `Learn more about ${circle.name}`}
        >
            {circle.name}
        </Link>
    );
};

export default EventOwner;
