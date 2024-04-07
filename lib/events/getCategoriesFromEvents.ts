import { uniq } from 'lodash';
import type EventCategory from '@/lib/events/EventCategory';
import type { Event } from '@/types/payload/payload-types';

const getCategoriesFromEvents = (events: Array<Event>): Array<EventCategory> => {
    return uniq(
        events.reduce((availableCategories, { category }) => {
            availableCategories.push(...(category ?? []));

            return availableCategories;
        }, new Array<EventCategory>()),
    );
};

export default getCategoriesFromEvents;
