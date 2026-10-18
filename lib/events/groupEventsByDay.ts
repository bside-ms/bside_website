import { isBefore, isSameDay } from 'date-fns';
import type { Event } from '@/types/payload/payload-types';

// eventStart is a time-only field in the CMS, but it is stored as a full timestamp whose date is the day the time was entered.
const getMinutesOfDay = (timestamp: string): number => {
    const date = new Date(timestamp);

    return date.getHours() * 60 + date.getMinutes();
};

const sortEvents = (eventList: Array<Event>, reversedDayOrder: boolean): Array<Event> => {
    return eventList.sort((eventA, eventB) => {
        const dateA = new Date(eventA.eventDate);
        const dateB = new Date(eventB.eventDate);

        if (isSameDay(dateA, dateB)) {
            const startDifference = getMinutesOfDay(eventA.eventStart) - getMinutesOfDay(eventB.eventStart);

            return startDifference !== 0 ? startDifference : eventA.title.localeCompare(eventB.title);
        }

        if (isBefore(dateA, dateB)) {
            return reversedDayOrder ? 1 : -1;
        }

        return reversedDayOrder ? -1 : 1;
    });
};

const groupEventsByDay = (eventList: Array<Event>, reversedDayOrder = false): Array<[Date, Array<Event>]> => {
    return sortEvents(eventList, reversedDayOrder).reduce<Array<[Date, Array<Event>]>>((currentEventsGroupedByDay, event) => {
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
    }, []);
};

export default groupEventsByDay;
