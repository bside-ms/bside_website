import type EventCategory from '@/lib/events/EventCategory';

const getEventCategoryTitle = (category: EventCategory, locale: string | undefined): string => {
    switch (category) {
        case 'concert':
            return locale === 'de' ? 'Konzert' : 'Concert';

        case 'movie':
            return locale === 'de' ? 'Film' : 'Movie';

        case 'theater':
            return locale === 'de' ? 'Theater' : 'Theatre';

        case 'plenum':
            return locale === 'de' ? 'Plenum' : 'Meeting';

        case 'workshop':
            return 'Workshop';

        case 'party':
            return 'Party';

        case 'exhibition':
            return locale === 'de' ? 'Ausstellung' : 'Exhibition';

        case 'reading':
            return locale === 'de' ? 'Lesung' : 'Reading';

        case 'lecture':
            return locale === 'de' ? 'Vortrag' : 'Lecture';

        default:
            return locale === 'de' ? 'Sonstiges' : 'Other';
    }
};

export default getEventCategoryTitle;
