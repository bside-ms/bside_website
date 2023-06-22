import type EventCategory from '@/lib/events/EventCategory';

const getEventCategoryTitle = (category: EventCategory): string => {

    switch (category) {
        case 'concert':
            return 'Konzert';

        case 'movie':
            return 'Film';

        case 'theater':
            return 'Theater';

        case 'plenum':
            return 'Plenum';

        case 'workshop':
            return 'Workshop';
    }
};

export default getEventCategoryTitle;
