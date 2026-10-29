import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { RedirectDoc, RedirectRules } from '@/lib/redirect/redirectRules';
import { buildRedirectRules, normalizeRedirectPath } from '@/lib/redirect/redirectRules';

// Redirects from the CMS are looked up at request time (cached for a short while), so editing a redirect
// in the admin goes live within a minute and the website build does not need a running CMS.
const CACHE_TTL_MS = 60 * 1000;
const FETCH_TIMEOUT_MS = 2000;

let rules: RedirectRules | undefined;
let loadedAt = 0;
let refreshing: Promise<void> | undefined;

const refreshRules = async (): Promise<void> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/redirects?limit=9999&depth=1`, {
            cache: 'no-store',
            signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        });

        if (!response.ok) {
            console.error('Redirects - CMS responded with', response.status, '- keeping previous rules.');
            return;
        }

        const { docs } = (await response.json()) as { docs?: Array<RedirectDoc> };
        rules = buildRedirectRules(docs ?? [], process.env.NEXT_PUBLIC_FRONTEND_URL);
        loadedAt = Date.now();
    } catch (error) {
        console.error('Redirects - Failed to load CMS redirects, keeping previous rules.', error);
    }
};

const startRefresh = (): Promise<void> => {
    refreshing ??= refreshRules().finally(() => {
        refreshing = undefined;
    });

    return refreshing;
};

const getRules = async (event: NextFetchEvent): Promise<RedirectRules> => {
    if (rules === undefined) {
        // First request on this instance: wait once, but never longer than the fetch timeout.
        await startRefresh();
        // Do not hammer a down CMS on every request.
        rules ??= new Map();
        loadedAt = Date.now();
    } else if (Date.now() - loadedAt > CACHE_TTL_MS) {
        // Serve the old rules and refresh in the background.
        loadedAt = Date.now();
        event.waitUntil(startRefresh());
    }

    return rules;
};

export const middleware = async (request: NextRequest, event: NextFetchEvent): Promise<NextResponse> => {
    const destination = (await getRules(event)).get(normalizeRedirectPath(request.nextUrl.pathname));

    if (destination === undefined) {
        return NextResponse.next();
    }

    if (destination.startsWith('http')) {
        return NextResponse.redirect(destination, 307);
    }

    // Keeps the locale prefix and the query string of the request.
    const url = request.nextUrl.clone();
    url.pathname = destination;

    return NextResponse.redirect(url, 307);
};

export const config = {
    matcher: ['/((?!api/|_next/|_vercel/).*)'],
};
