import type { TypeWithTimestamps } from 'payload/dist/collections/config/types';

export default interface News extends TypeWithTimestamps {
    title: string;
    content: string;
}
