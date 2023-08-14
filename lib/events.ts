import { isBefore, isEqual, isSameDay, setMilliseconds } from 'date-fns';
import formatDate from '@/lib/common/helper/formatDate';
import isEmptyNumber from '@/lib/common/helper/isEmptyNumber';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event } from '@/types/payload/payload-types';

export const getUpcomingEvents = async (limit?: number): Promise<Array<Event>> => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const limitStr = isEmptyNumber(limit) ? `&limit=${limit}` : '';

    return (await getPayloadResponse<PaginatedDocs<Event>>(
        `/api/events/?where[eventDate][greater_than]=${formatDate(yesterday, 'yyyy-MM-dd')}&sort=eventDate${limitStr}`
    )).docs;
};

export const getPastEvents = async (limit?: number): Promise<Array<Event>> => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const limitStr = isEmptyNumber(limit) ? `&limit=${limit}` : '';

    return (await getPayloadResponse<PaginatedDocs<Event>>(
        `/api/events/?where[eventDate][less_than]=${formatDate(tomorrow, 'yyyy-MM-dd')}&sort=-eventDate${limitStr}`
    )).docs;
};

export const filterForMeetings = (events: Array<Event>): Array<Event> => {
    return events.filter((event) => {
        return event.category?.includes('plenum') ?? false;
    });
};

export const filterNoMeetings = (events: Array<Event>): Array<Event> => {
    return events.filter((event) => {
        return !(event.category?.includes('plenum') ?? false);
    });
};

const sortEvents = (eventList: Array<Event>, reversedDayOrder: boolean): Array<Event> => {

    return eventList
        .sort((eventA, eventB) => {

            const dateA = new Date(eventA.eventDate);
            const startTimeA = setMilliseconds(new Date(eventA.eventStart), 0);
            const dateB = new Date(eventB.eventDate);
            const startTimeB = setMilliseconds(new Date(eventB.eventStart), 0);

            if (isEqual(dateA, dateB) && isEqual(startTimeA, startTimeB)) {
                return eventA.title.localeCompare(eventB.title);
            }

            if (isSameDay(dateA, dateB)) {
                return isBefore(startTimeA, startTimeB) ? -1 : 1;
            }

            if (isBefore(dateA, dateB)) {
                return reversedDayOrder ? 1 : -1;
            }

            return reversedDayOrder ? -1 : 1;
        });
};

export const groupEventsByDay = (eventList: Array<Event>, reversedDayOrder = false): Array<[Date, Array<Event>]> => {

    return sortEvents(eventList, reversedDayOrder)
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

                // See https://github.com/typescript-eslint/typescript-eslint/issues/5376#issuecomment-1194069175, if you care for the reason.
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (!foundDate) {
                    currentEventsGroupedByDay.push([new Date(event.eventDate), [event]]);
                }

                return currentEventsGroupedByDay;
            },
            []
        );
};
