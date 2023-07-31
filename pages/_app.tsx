import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';
import { BreakpointContextProvider } from '@/components/common/BreakpointContext';
import { AppContextProvider } from '@/components/Layout/Next/AppContext';
import NextHead from '@/components/Layout/Next/NextHead';

const App = ({ Component, pageProps }: AppProps): ReactElement => {

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
