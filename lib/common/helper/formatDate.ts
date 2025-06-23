import { format, parseISO } from 'date-fns';
import { de } from 'date-fns/locale';
import type { Locale } from 'date-fns/locale/types';

const formatDate = (date: Date | string | number, formatSchema: string, locale?: Locale): string =>
    format(typeof date === 'string' || typeof date === 'number' ? new Date(parseISO(date.toString())) : date, formatSchema, {
        locale: locale ?? de,
    });

export default formatDate;
