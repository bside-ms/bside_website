import { useCallback } from 'react';
import type { ReactElement } from 'react';
import type EventCategory from '@/lib/events/EventCategory';
import getEventCategoryTitle from '@/lib/events/getEventCategoryTitle';

const EventTypeFilter = ({ type, onClick, isActive }: { type: EventCategory, onClick: (type: EventCategory) => void, isActive: boolean }): ReactElement => {

    const handleClick = useCallback(() => onClick(type), [onClick, type]);

    return (
        <div
            onClick={handleClick}
            className="border-r border-gray-800 px-3 leading-4 last:border-0 last:pr-0 md:cursor-pointer md:hover:text-orange-500 select-none"
        >
            <div className={isActive ? 'text-gray-500' : ''}>
                {getEventCategoryTitle(type)}
            </div>
        </div>
    );
};

export default EventTypeFilter;
