import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isPast } from 'date-fns';
import Link from 'next/link';
import useLocale from '@/lib/common/hooks/useLocale';
import type { ReactElement } from 'react';
import type { Event } from '@/types/payload/payload-types';

interface Props {
    event: Event;
}

const EventButtons = ({ event }: Props): ReactElement => {
    const locale = useLocale();

    return (
        <div className="flex flex-wrap gap-4 sm:flex-nowrap">
            <div className="basis-full font-serif text-base text-black sm:basis-1/2 sm:text-xl">
                <Link
                    href="/events"
                    className="flex items-center justify-center gap-2 border-2 border-black bg-white p-2 hover:bg-orange-600"
                >
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} height={16} className="inline" />

                    <div className="text-center">
                        {locale === 'de' ? 'Zurück zur Übersicht' : 'Back to overview'}
                    </div>
                </Link>
            </div>

            {!isPast(event.eventDate) && (
                <div className="basis-full font-serif text-base text-white sm:basis-1/2 sm:text-xl">
                    <Link
                        className="block border-2 border-black bg-black p-2 text-center hover:bg-orange-600"
                        href={`/api/ics/?eventId=${event.id}`}
                    >
                        {locale === 'de' ? 'Zum Kalender hinzufügen' : 'Add event to calendar'}
                    </Link>
                </div>
            )}
        </div>
    );
};

export default EventButtons;
