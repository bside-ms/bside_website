import type { Event } from '@/types/payload/payload-types';

type EventCategory = NonNullable<Event['category']>[0];

export default EventCategory;
