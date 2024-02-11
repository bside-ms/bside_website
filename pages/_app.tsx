
import '@/styles/globals.css';

import { useEffect, useRef } from 'react';
import init from '@socialgouv/matomo-next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { BreakpointContextProvider } from '@/components/common/BreakpointContext';
import { AppContextProvider } from '@/components/layout/next/AppContext';
import NextHead from '@/components/layout/next/NextHead';
import isEmptyString from '@/lib/common/helper/isEmptyString';

const App = ({ Component, pageProps }: AppProps): ReactElement => {

    const asPath = useRouter().asPath;
    const initialized = useRef(false);

    useEffect(() => {
        if (!isEmptyString(process.env.NEXT_PUBLIC_MATOMO_ENDPOINT) && !isEmptyString(process.env.NEXT_PUBLIC_MATOMO_SITE_ID) && !initialized.current) {
            init({
                url: process.env.NEXT_PUBLIC_MATOMO_ENDPOINT,
                siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
                disableCookies: true,
                phpTrackerFile: 'lernen.php',
                jsTrackerFile: 'lernen.js',
                onRouteChangeStart: async (path: string) => {
                    await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/notify?s=${path}`).then();
                },
            });
        }

        fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/notify?s=${asPath}`).then();

        return () => {
            initialized.current = true;
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AppContextProvider>
            <BreakpointContextProvider>
                <NextHead />
                <Component {...pageProps} />
            </BreakpointContextProvider>
        </AppContextProvider>
    );
};

export default App;
