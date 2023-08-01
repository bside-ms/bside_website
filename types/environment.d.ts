declare namespace NodeJS {
    export interface ProcessEnv {
        NEXT_ENV: string;
        FRONTEND_URL: string;
        PAYLOAD_URL: string;
        PAYLOAD_API_COLLECTION: string;
        PAYLOAD_API_KEY: string;

        NEXT_PUBLIC_FRONTEND_URL: string;
        NEXT_PUBLIC_PAYLOAD_URL: string;
    }
}
