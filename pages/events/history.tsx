import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import ButtonBig from '@/components/common/ButtonBig';
import ContentWrapper from '@/components/common/ContentWrapper';
import Footer from '@/components/common/Footer';
import HeaderBar from '@/components/common/HeaderBar';
import NextEvents from '@/components/events/NextEvents';
import Navigation from '@/components/navigation/Navigation';
import { getPastEvents } from '@/lib/events';
import getHeadNavigation from '@/lib/getHeadNavigation';
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
                <div className="font-serif text-white bg-black mt-4 text-2xl text-center p-3">
                    Vergangene Veranstaltungen
                </div>

                <div className="mt-1 text-md md:text-lg md:mt-3">
                    Dies ist das Archiv für vergangene Veranstaltungen.
                </div>

                <div className="mt-1 text-md md:text-lg md:mt-3 md:mb-3">
                    Aktuelle und kommende Veranstaltungen findest du hier:
                </div>

                <ButtonBig
                    buttonText="Aktuelle Veranstaltungen"
                    buttonLink="/events"
                />
            </ContentWrapper>

            <ContentWrapper px={false} pxsm={true}>
                <NextEvents
                    title="Vergangene Veranstaltungen"
                    events={events}
                    pastEvents={true}
                />
            </ContentWrapper>

            <Footer />
        </main>
    );
};
