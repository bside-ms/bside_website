import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import ButtonBig from '@/components/common/ButtonBig';
import ContentWrapper from '@/components/common/ContentWrapper';
import Footer from '@/components/common/Footer';
import HeaderBar from '@/components/common/HeaderBar';
import NextEvents from '@/components/events/NextEvents';
import Navigation from '@/components/navigation/Navigation';
import { getPastEvents } from '@/lib/events';
import { getHeadNavigation } from '@/lib/navigation';
import type { Event, MainMenu } from '@/types/payload/payload-types';

interface Props {
    events: Array<Event>;
    mainMenu?: MainMenu;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    return {
        revalidate: 60,
        props: {
            events: await getPastEvents(),
            mainMenu: await getHeadNavigation(),
        },
    };
};

export default ({ events, mainMenu }: Props): ReactElement => {
    return (
        <main className="min-h-screen flex flex-col justify-between">
            <Navigation />

            <HeaderBar
                disableLeftLogo={false}
                headerMenu={true}
                mainMenu={mainMenu}
            />

            <ContentWrapper>
                <div className="mb-1 md:mb-3">
                    <div className="font-bold font-serif text-2xl md:text-4xl">
                        Vergangene Veranstaltungen
                    </div>

                    <div className="mt-1 text-md md:text-lg md:mt-3">
                        Dies ist eine Übersicht über vergangene Veranstaltungen.
                    </div>

                    <div className="mt-1 text-md md:text-lg md:mt-3">
                        Um aktuelle und kommende Veranstaltungen zu sehen, klicke folgenden Button:
                    </div>

                    <ButtonBig
                        buttonText="Aktuelle Veranstaltungen"
                        buttonLink="/events"
                    />

                    <NextEvents events={events} px={false} pastEvents={true} />
                </div>
            </ContentWrapper>

            <Footer />
        </main>
    );
};
