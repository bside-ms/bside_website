// eslint-disable-next-line simple-import-sort/imports
import '@/styles/globals.css';

import { useEffect } from 'react';
import init from '@socialgouv/matomo-next';
import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';
import { BreakpointContextProvider } from '@/components/common/BreakpointContext';
import { AppContextProvider } from '@/components/layout/next/AppContext';
import NextHead from '@/components/layout/next/NextHead';

const App = ({ Component, pageProps }: AppProps): ReactElement => {

    useEffect(() => {
        init({
            url: process.env.NEXT_PUBLIC_MATOMO_ENDPOINT,
            siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
            disableCookies: true,
            phpTrackerFile: 'lernen.php',
            jsTrackerFile: 'lernen.js',
            onRouteChangeStart: async (path: string) => {
                await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/ping?url=${path}`).then();
            },
        });
    }, []);

    return (
        <AppContextProvider>
            <BreakpointContextProvider>
                <NextHead />
                {/* eslint-disable-next-line react/jsx-props-no-spreading*/}
                <Component {...pageProps} />
            </BreakpointContextProvider>
        </AppContextProvider>
    );
};

export default App;
