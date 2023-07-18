import '@/styles/globals.css';

import { GridProvider } from '@faceless-ui/css-grid';
import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';
import { AppContextProvider } from '@/components/Layout/Next/AppContext';
import NextHead from '@/components/Layout/Next/NextHead';

const App = ({ Component, pageProps }: AppProps): ReactElement => {

    return (
        <AppContextProvider>
            <NextHead />

            <GridProvider
                breakpoints={{
                    s: 768,
                    m: 1024,
                    l: 1680,
                }}
                rowGap={{
                    s: '1rem',
                    m: '1rem',
                    l: '2rem',
                    xl: '4rem',
                }}
                colGap={{
                    s: 'var(--base)',
                    m: 'calc(var(--base) * 2)',
                    l: 'calc(var(--base) * 2)',
                    xl: 'calc(var(--base) * 3)',
                }}
                cols={{
                    s: 8,
                    m: 8,
                    l: 12,
                    xl: 12,
                }}
            >
                {/* eslint-disable-next-line react/jsx-props-no-spreading*/}
                <Component {...pageProps} />
            </GridProvider>
        </AppContextProvider>
    );
};

export default App;
