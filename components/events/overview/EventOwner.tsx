import Link from 'next/link';
import useLocale from '@/lib/common/hooks/useLocale';
import type { ReactElement } from 'react';
import createCircleLink from '@/lib/events/createCircleLink';
import createOrganisationLink from '@/lib/events/createOrganisationLink';
import type { Circle, Organisation } from '@/types/payload/payload-types';

const EventOwner = ({
    owner,
}: {
    owner: { value: string | Organisation; relationTo: 'organisations' } | { value: string | Circle; relationTo: 'circles' };
}): ReactElement => {
    const locale = useLocale();

    if (owner.relationTo === 'organisations') {
        const organisation = owner.value as Organisation;
        return (
            <Link
                key={`event-owner-${organisation.id}`}
                href={createOrganisationLink(organisation)}
                className="z-10 my-auto truncate border-b border-black px-1 text-sm italic leading-6 text-black hover:border-b-orange-500 hover:text-orange-500"
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
            className="z-10 my-auto truncate border-b border-black px-1 text-sm italic leading-6 text-black hover:border-b-orange-500 hover:text-orange-500"
            aria-label={locale === 'de' ? `Erfahre mehr über ${circle.name}` : `Learn more about ${circle.name}`}
        >
            {circle.name}
        </Link>
    );
};

export default EventOwner;
