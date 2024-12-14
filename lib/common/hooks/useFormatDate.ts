import formatDate from '@/lib/common/helper/formatDate';
import useDateFnsLocale from '@/lib/common/hooks/useDateFnsLocale';

const useFormatDate = (): ((date: Date | string | number, formatSchema: string) => string) => {
    const dateFnsLocale = useDateFnsLocale();

    return (date: Date | string | number, formatSchema: string) =>
        formatDate(date, formatSchema, dateFnsLocale);
};

export default useFormatDate;
