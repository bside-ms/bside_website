import { Fragment } from 'react';
import _ from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import EventOrganiser from '@/components/events/overview/EventOrganiser';
import formatDate from '@/lib/common/helper/formatDate';
import createEventSlug from '@/lib/events/createEventSlug';
import getEventCategoryTitle from '@/lib/events/getEventCategoryTitle';
import type { Event } from '@/types/payload/payload-types';

interface Props {
    event: Event;
    index: number;
}

const EventOverviewEntry = ({ event, index }: Props): ReactElement => {
    const { isXl } = useBreakpointContext();
    const { locale } = useRouter();

    return (
        <Fragment key={event.id}>
            {index !== 0 && (
                <div>
                    <hr className="border-1 mx-auto mt-2 w-full border-black" />
                </div>
            )}

            <Link
                key={`event-${event.id}-link`}
                href={`/events/${createEventSlug(event)}`}
                className="flex gap-3 px-3 pt-1 hover:text-orange-500 md:px-4 md:pt-2"
                aria-label={
                    locale === 'de'
                        ? `Erfahre mehr über die Veranstaltung "${event.title}".`
                        : `Learn more about the event "${event.title}".`
                }
            >
                <div className="w-14">
                    {formatDate(new Date(event.eventStart), 'HH:mm', locale)}
                </div>
                <div
                    key={`event-${event.id}-title`}
                    className="flex-1 overflow-hidden truncate font-bold"
                >
                    {_.truncate(event.title, { length: isXl ? 55 : 40 })}
                </div>
                <div className="truncate">... {locale === 'de' ? 'mehr' : 'more'}</div>
            </Link>

            <div className="relative flex gap-3 px-3 pb-1 md:px-4 md:pb-2">
                <Link
                    href={`/events/${createEventSlug(event)}`}
                    className="absolute bottom-0 left-0 right-0 top-0 hover:text-orange-500"
                    aria-label={
                        locale === 'de'
                            ? `Erfahre mehr über die Veranstaltung "${event.title}".`
                            : `Learn more about the event "${event.title}".`
                    }
                />
                <div className="w-0 sm:w-14" />
                {event.category?.map((cat) => (
                    <div
                        key={`event-title-${event.id}-${cat}`}
                        className="my-auto truncate px-1 text-sm italic leading-6"
                    >
                        {getEventCategoryTitle(cat, locale)}
                    </div>
                ))}

                <EventOrganiser event={event} />
            </div>
        </Fragment>
    );
};

export default EventOverviewEntry;
