import Link from 'next/link';
import { Fragment, ReactElement } from 'react';
import createEventSlug from '@/lib/events/createEventSlug';
import useGetEventCategoryTitle from '@/lib/events/useGetEventCategoryTitle';
import type { Event } from '@/types/payload/payload-types';
import { Badge } from '@/components/ui/badge';
import { ChevronRightIcon, ClockIcon } from '@radix-ui/react-icons';
import useFormatDate from '@/lib/common/hooks/useFormatDate';
import getEventImageUrl from '@/lib/events/getEventImageUrl';
import Image from 'next/image';
import { isNil, truncate } from 'lodash-es';
import EventOverviewEntryImageFallback from '@/components/events/overview/EventOverviewEntryImageFallback';
import { cn } from '@/lib/utils';

interface Props {
    event: Event;
    areDisplayedOnHome: boolean;
}

const EventOverviewEntry = ({ event, areDisplayedOnHome }: Props): ReactElement => {
    const formatDate = useFormatDate();

    const getEventCategoryTitle = useGetEventCategoryTitle();

    const { id, title, eventStart, category: categories, eventImage, eventOwner: eventOwners } = event;

    const eventImageUrl = getEventImageUrl(eventImage);

    return (
        <Link
            key={id}
            href={`/events/${createEventSlug(event)}`}
            className="group flex cursor-pointer shadow-md transition-shadow hover:shadow-lg"
        >
            <div className="relative my-auto hidden size-[150px] shrink-0 min-[350px]:block">
                {eventImageUrl === null ? (
                    <EventOverviewEntryImageFallback />
                ) : (
                    <Image
                        src={eventImageUrl}
                        alt={title}
                        sizes="thumbnail"
                        className={cn(
                            'object-cover transition-transform md:cursor-pointer',
                            areDisplayedOnHome && 'grayscale-[85%] transition group-hover:grayscale-0',
                        )}
                        fill={true}
                        priority={true}
                    />
                )}
            </div>

            <div className="flex grow flex-col px-4 py-2">
                <h3 className={cn('mb-1 line-clamp-2 text-lg font-semibold leading-6', !title.includes(' ') && 'break-all')}>{title}</h3>

                {categories !== null && categories !== undefined && categories.length > 0 && (
                    <div className="mb-2 text-sm">{categories.map((category) => getEventCategoryTitle(category)).join(' | ')}</div>
                )}

                <div className="mt-auto flex items-center text-sm text-muted-foreground">
                    <ClockIcon className="mr-1 size-4" />

                    {formatDate(new Date(eventStart), 'HH:mm')}
                </div>

                {!isNil(eventOwners) && eventOwners.length > 0 && (
                    <div className="mb-2 mt-1 flex flex-wrap gap-2">
                        {eventOwners.map(({ value }) => {
                            const ownerName = typeof value === 'string' ? value : value.name;
                            return (
                                <Fragment key={ownerName}>
                                    <Badge variant="secondary" size="small" hover="disabled" className="hidden sm:block">
                                        {truncate(ownerName, { length: 40 })}
                                    </Badge>
                                    <Badge variant="secondary" size="small" hover="disabled" className="sm:hidden">
                                        {truncate(ownerName, { length: 20 })}
                                    </Badge>
                                </Fragment>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="flex items-center pr-4">
                <ChevronRightIcon className="size-5 text-muted-foreground" />
            </div>
        </Link>
    );
};

export default EventOverviewEntry;
