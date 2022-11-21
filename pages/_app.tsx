import 'styles/globals.css';

import type { AppProps } from 'next/app';
import type { ReactElement } from 'react';

const App = ({ Component, pageProps }: AppProps): ReactElement => {

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...pageProps} />;
};

export default App;
