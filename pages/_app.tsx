import '@/styles/globals.css';

import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { BreakpointContextProvider } from '@/components/common/BreakpointContext';
import { AppContextProvider } from '@/components/layout/next/AppContext';
import NextHead from '@/components/layout/next/NextHead';

const App = ({ Component, pageProps }: AppProps): ReactElement => {

    const router = useRouter();

    useEffect(() => {
        const trackRouteChange = (url: string): void => {
            fetch(`/api/track?url=${url}`);
        };

        router.events.on('routeChangeComplete', trackRouteChange);

        return () => {
            router.events.off('routeChangeComplete', trackRouteChange);
        };
    }, [router.events]);

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
