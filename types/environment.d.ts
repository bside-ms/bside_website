declare namespace NodeJS {
    export interface ProcessEnv {
        NEXT_ENV: string;
        FRONTEND_URL: string;
        PAYLOAD_URL: string;
        PAYLOAD_API_COLLECTION: string;
        PAYLOAD_API_KEY: string;

        NEXT_PUBLIC_TURNSTILE_SITE_KEY: string;
        TURNSTILE_SECRET_KEY: string;

        NEXT_PUBLIC_FRONTEND_URL: string;
        NEXT_PUBLIC_PAYLOAD_URL: string;
        PREVIEW_TOKEN: string;

        MAIL_HOST: string;
        MAIL_PORT: string;
        MAIL_USER: string;
        MAIL_PASS: string;

        NEXT_PUBLIC_MATOMO_SITE_ID: string;
        NEXT_PUBLIC_MATOMO_ENDPOINT: string;
    }
}
