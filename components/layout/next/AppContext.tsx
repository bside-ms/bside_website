import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { PropsWithChildren, ReactElement } from 'react';

interface AppContextData {
    isNavigationOpen: boolean;
    toggleNavigation: () => void;
}

const AppContext = createContext<AppContextData | null>(null);

type Props = PropsWithChildren;

const AppContextProvider = ({ children }: Props): ReactElement => {
    const [isNavigationOpen, setIsNavigationOpen] = useState(false);
    const toggleNavigation = useCallback(() => setIsNavigationOpen((prevState) => !prevState), []);

    const { pathname } = useRouter();

    useEffect(() => {
        setIsNavigationOpen(false);
    }, [setIsNavigationOpen, pathname]);

    return (
        <AppContext.Provider
            value={{
                isNavigationOpen,
                toggleNavigation,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = (): AppContextData => {
    const appContext = useContext(AppContext);

    if (appContext === null) {
        throw new Error("useAppContext hook wasn't used within AppContextProvider");
    }

    return appContext;
};

export { AppContextProvider, useAppContext };
