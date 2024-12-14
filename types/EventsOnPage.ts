export type DateDirection = 'upcoming' | 'past';

export type EventFilter = 'Home' | 'Overview' | 'Organisation' | 'Circle' | undefined;

export default interface EventsOnPage {
    /**
     * Order of event dates.
     */
    dateDirection?: DateDirection;

    /**
     * Controls whether a pagination will be shown.
     */
    withPagination?: boolean;

    /**
     * Controls whether filters will be shown.
     */
    withFilters?: boolean;

    /**
     * Determines how many events per page will be shown, without pagination prop controls
     * how many events will be shown at all. Omit prop to show all events at once.
     */
    perPage?: number;

    /**
     * Filters events to where they are supposed to be shown (see displayOn... attributes
     * in payload).
     */
    filter?: EventFilter;

    /**
     * Provide an ID of an organisation or a circle for example.
     */
    ownerId?: string;
}
