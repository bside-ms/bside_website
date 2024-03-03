export type DateDirection = 'upcoming' | 'past';

export type EventFilter = 'Home' | 'Overview' | 'Organisation' | 'Circle' | undefined;

export default interface EventsOnPage {
    dateDirection?: DateDirection;
    filter?: EventFilter;
    ownerId?: string;
    perPage?: number; // Leave undefined to suppress pagination.
}
