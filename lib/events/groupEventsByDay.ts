import { isBefore, isEqual, isSameDay, setMilliseconds } from 'date-fns';
import type { Event } from '@/types/payload/payload-types';

const sortEvents = (eventList: Array<Event>, reversedDayOrder: boolean): Array<Event> => {
    return eventList.sort((eventA, eventB) => {
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

const groupEventsByDay = (
    eventList: Array<Event>,
    reversedDayOrder = false,
): Array<[Date, Array<Event>]> => {
    return sortEvents(eventList, reversedDayOrder).reduce<Array<[Date, Array<Event>]>>(
        (currentEventsGroupedByDay, event) => {
            let foundDate = false;

            currentEventsGroupedByDay.forEach(([date, events]) => {
                if (isSameDay(date, new Date(event.eventDate))) {
                    foundDate = true;
                    events.push(event);
                }
            });

            if (!foundDate) {
                currentEventsGroupedByDay.push([new Date(event.eventDate), [event]]);
            }

            return currentEventsGroupedByDay;
        },
        [],
    );
};

export default groupEventsByDay;
