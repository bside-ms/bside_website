interface TypeWithTimestamps {
    [key: string]: unknown;
    id: string | number;
    createdAt: string;
    updatedAt: string;
}

export default TypeWithTimestamps;
