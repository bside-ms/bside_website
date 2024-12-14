'use client';

import { DateRange, DayContentProps } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import useFormatDate from '@/lib/common/hooks/useFormatDate';
import useDateFnsLocale from '@/lib/common/hooks/useDateFnsLocale';
import useLocale from '@/lib/common/hooks/useLocale';
import { isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

interface Props {
    filteredDateRange: DateRange | undefined;
    setFilteredDateRange: Dispatch<SetStateAction<DateRange | undefined>>;
    allEventDates: Array<Date>;
}

const EventsDateRangeFilter = ({
    filteredDateRange,
    setFilteredDateRange,
    allEventDates,
}: Props) => {
    const formatDate = useFormatDate();
    const dateFnsLocale = useDateFnsLocale();
    const locale = useLocale();

    const clearFilteredDateRange = useCallback(() => setFilteredDateRange(undefined), []);

    const renderDay = useCallback(({ date, activeModifiers: { hasEvent } }: DayContentProps) => {
        return <span className={cn(hasEvent && 'underline')}>{formatDate(date, 'd')}</span>;
    }, []);

    return (
        <div className="grid gap-2">
            <Popover>
                <PopoverTrigger asChild={true}>
                    <Button
                        variant="outline"
                        size="sm"
                        className="justify-start text-left font-normal"
                    >
                        <CalendarIcon className="mr-2 size-4" />

                        {filteredDateRange?.from !== undefined ? (
                            filteredDateRange.to !== undefined &&
                            !isSameDay(filteredDateRange.from, filteredDateRange.to) ? (
                                <>
                                    {formatDate(filteredDateRange.from, 'dd.MM.yyyy')} -{' '}
                                    {formatDate(filteredDateRange.to, 'dd.MM.yyyy')}
                                </>
                            ) : (
                                formatDate(filteredDateRange.from, 'dd.MM.yyyy')
                            )
                        ) : locale === 'en' ? (
                            'Date range'
                        ) : (
                            'Zeitraum'
                        )}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus={true}
                        mode="range"
                        defaultMonth={filteredDateRange?.from}
                        selected={filteredDateRange}
                        onSelect={setFilteredDateRange}
                        locale={dateFnsLocale}
                        modifiers={{ hasEvent: allEventDates }}
                        components={{
                            DayContent: renderDay,
                        }}
                    />

                    {filteredDateRange?.from !== undefined && (
                        <div className="p-1">
                            <div className="h-px bg-border" />
                            <button
                                onClick={clearFilteredDateRange}
                                className="mt-1 w-full cursor-pointer justify-center rounded-sm py-2 text-center text-sm hover:bg-accent hover:text-accent-foreground"
                            >
                                {locale === 'de' ? 'Filter entfernen' : 'Clear filters'}
                            </button>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default EventsDateRangeFilter;
