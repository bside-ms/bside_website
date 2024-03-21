import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isPast } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import type { Event } from '@/types/payload/payload-types';

interface Props {
    event: Event;
}

const EventButtons = ({ event }: Props): ReactElement => {

    const { locale } = useRouter();

    return (
        <div className="flex gap-4 flex-wrap sm:flex-nowrap">
            <div className="basis-full sm:basis-1/2 text-black font-serif text-base sm:text-xl">
                <Link
                    href="/events"
                    className="p-2 bg-white border-black border-2 hover:bg-orange-600 flex justify-center items-center gap-2"
                >
                    <FontAwesomeIcon
                        icon={faArrowAltCircleLeft} height={16}
                        className="inline"
                    />

                    <div className="text-center">{locale === 'de' ? 'Zurück zur Übersicht' : 'Back to overview'}</div>
                </Link>
            </div>

            {!isPast(event.eventDate) && (
                <div className="basis-full sm:basis-1/2 text-white font-serif text-base sm:text-xl">
                    <Link
                        className="block p-2 text-center bg-black border-black border-2 hover:bg-orange-600"
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
