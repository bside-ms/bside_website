import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';

const formatDate = (date: Date | string | number, formatSchema: string): string => (
    format(typeof date === 'string' || typeof date === 'number' ? new Date(parseISO(date as string)) : date, formatSchema, { locale: de })
);

export default formatDate;
