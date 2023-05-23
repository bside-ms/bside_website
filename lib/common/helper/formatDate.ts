import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';

const formatDate = (date: Date | string | number, formatSchema: string): string => (
    format(
        typeof date === 'string' || typeof date === 'number' ? new Date(parseISO(date.toString())) : date,
        formatSchema,
        { locale: de }
    )
);

export default formatDate;
