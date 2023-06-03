import { isBefore, isSameDay } from 'date-fns';
import formatDate from '@/lib/common/helper/formatDate';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event } from '@/types/payload/payload-types';

export const getUpcomingEvents = async (): Promise<Array<Event>> => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    return (await getPayloadResponse<PaginatedDocs<Event>>(`/api/events/?where[eventDate][greater_than]=${formatDate(yesterday, 'yyyy-MM-dd')}`)).docs;
};

export const getPastEvents = async (): Promise<Array<Event>> => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    return (await getPayloadResponse<PaginatedDocs<Event>>(`/api/events/?where[eventDate][less_than]=${formatDate(tomorrow, 'yyyy-MM-dd')}`)).docs;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type
export const groupEventsByDay = (eventList: Array<Event>) => {

    return eventList
        .sort((eventA, eventB) => isBefore(new Date(eventA.eventDate), new Date(eventB.eventDate)) ? -1 : 1)
        .reduce<Array<[Date, Array<Event>]>>(
            (currentEventsGroupedByDay, event) => {
                let foundDate = false;

                currentEventsGroupedByDay.forEach(
                    ([date, events]) => {
                        if (isSameDay(date, new Date(event.eventDate))) {
                            foundDate = true;
                            events.push(event);
                        }
                    }
                );

                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (!foundDate) {
                    currentEventsGroupedByDay.push([new Date(event.eventDate), [event]]);
                }

                return currentEventsGroupedByDay;
            },
            []
        );
};
