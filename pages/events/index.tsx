import type { ReactElement } from 'react';
import ContentWrapper from 'components/common/ContentWrapper';
import Footer from 'components/common/Footer';
import HeaderBar from 'components/common/HeaderBar';
import Navigation from 'components/navigation/Navigation';

export default (): ReactElement => {

    return (
        <main className="min-h-screen flex flex-col justify-between">
            <Navigation />

            <HeaderBar />

            <ContentWrapper>
                <div className="px-8 mb-2 md:mb-3">
                    <div className="font-bold font-serif text-2xl md:text-4xl">
                        Veranstaltungsübersicht
                    </div>

                    <div className="mt-1 text-md md:text-lg md:mt-3">
                        Hier entsteht die Veranstaltungsübersicht.
                    </div>
                </div>
            </ContentWrapper>

            <Footer />
        </main>
    );
};
