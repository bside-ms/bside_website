import { CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { PiFunnel, PiFunnelFill } from 'react-icons/pi';
import useAvailableCategoryFilters from '@/lib/events/useAvailableCategoryFilters';
import type EventsOnPage from '@/types/EventsOnPage';
import { Dispatch, SetStateAction, useCallback } from 'react';
import type EventCategory from '@/lib/events/EventCategory';
import useGetEventCategoryTitle from '@/lib/events/useGetEventCategoryTitle';
import useLocale from '@/lib/common/hooks/useLocale';

interface Props {
    eventsOnPage?: EventsOnPage;
    filteredCategories: Array<EventCategory>;
    setFilteredCategories: Dispatch<SetStateAction<Array<EventCategory>>>;
}

const EventsCategoriesFilter = ({
    eventsOnPage,
    filteredCategories,
    setFilteredCategories,
}: Props) => {
    const locale = useLocale();

    const allAvailableCategories = useAvailableCategoryFilters(eventsOnPage);

    const toggleFilteredCategory = useCallback((category: EventCategory) => {
        setFilteredCategories((prevState) => {
            if (prevState.includes(category)) {
                return prevState.filter((categoryItem) => categoryItem !== category);
            } else {
                return [...prevState, category];
            }
        });
    }, []);

    const clearFilteredCategories = useCallback(() => setFilteredCategories([]), []);

    const getEventCategoryTitle = useGetEventCategoryTitle();

    return (
        <Popover>
            <PopoverTrigger asChild={true}>
                <Button variant="outline" size="sm">
                    {filteredCategories.length === 0 ? (
                        <>
                            <PiFunnel className="mr-2 size-4" />

                            {locale === 'de' ? 'Kategorien' : 'Categories'}
                        </>
                    ) : (
                        <>
                            <PiFunnelFill className="mr-2 size-4" />

                            {locale === 'de' ? 'Kategorien' : 'Categories'}

                            <Separator orientation="vertical" className="mx-2 h-4" />

                            <div className="space-x-1 lg:flex">
                                {filteredCategories.length > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {locale === 'de'
                                            ? `${filteredCategories.length} ausgewählt`
                                            : `${filteredCategories.length} selected`}
                                    </Badge>
                                ) : (
                                    allAvailableCategories
                                        .filter((category) => filteredCategories.includes(category))
                                        .map((category) => (
                                            <Badge
                                                variant="secondary"
                                                key={category}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {getEventCategoryTitle(category)}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {allAvailableCategories.map((category) => {
                                const isSelected = filteredCategories.includes(category);

                                return (
                                    <CommandItem
                                        key={category}
                                        className="cursor-pointer"
                                        onSelect={() => toggleFilteredCategory(category)}
                                    >
                                        <div
                                            className={cn(
                                                'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                                isSelected
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'opacity-50 [&_svg]:invisible',
                                            )}
                                        >
                                            <CheckIcon className={cn('h-4 w-4')} />
                                        </div>

                                        <span>{getEventCategoryTitle(category)}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>

                        {filteredCategories.length > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={clearFilteredCategories}
                                        className="cursor-pointer justify-center text-center"
                                    >
                                        {locale === 'de' ? 'Filter entfernen' : 'Clear filters'}
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default EventsCategoriesFilter;
