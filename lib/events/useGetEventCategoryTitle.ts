import type EventCategory from '@/lib/events/EventCategory';
import useLocale from '@/lib/common/hooks/useLocale';

const useGetEventCategoryTitle = (): ((category: EventCategory) => string) => {
    const locale = useLocale();

    return (category: EventCategory) => {
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
};

export default useGetEventCategoryTitle;
