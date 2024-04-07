import { format, parseISO } from 'date-fns';
import { de, enGB } from 'date-fns/locale';

const formatDate = (date: Date | string | number, formatSchema: string, locale = 'de'): string =>
    format(
        typeof date === 'string' || typeof date === 'number'
            ? new Date(parseISO(date.toString()))
            : date,
        formatSchema,
        { locale: locale === 'de' ? de : enGB },
    );

export default formatDate;
