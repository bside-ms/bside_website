import type TypeWithTimestamps from 'types/payload/TypeWithTimestamps';

export default interface News extends TypeWithTimestamps {
    title: string;
    content: string;
}
