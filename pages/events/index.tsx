import type { GetStaticProps } from 'next';
import Image from 'next/image';
import type { ReactElement } from 'react';
import ContentWrapper from '@/components/common/ContentWrapper';
import Footer from '@/components/common/Footer';
import HeaderBar from '@/components/common/HeaderBar';
import NextEvents from '@/components/events/NextEvents';
import Navigation from '@/components/navigation/Navigation';
import { getUpcomingEvents } from '@/lib/events';
import getHeadNavigation from '@/lib/getHeadNavigation';
import eventImage from '@/public/assets/veranstaltung.png';
import type { Event, MainMenu } from '@/types/payload/payload-types';

interface Props {
    events: Array<Event>;
    mainMenu?: MainMenu;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    return {
        revalidate: 60,
        props: {
            events: await getUpcomingEvents(),
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
                        Veranstaltungsübersicht
                    </div>

                    <div className="mt-1 text-md md:text-lg md:mt-3">
                        Hier entsteht die Veranstaltungsübersicht.
                    </div>

                    <NextEvents events={events} px={false} />
                </div>
            </ContentWrapper>

            <div className="w-full lg:w-[60rem] lg:mx-auto">
                <div className="bg-cover bg-center w-full h-52 md:h-72 relative">
                    <Image src={eventImage.src} alt="Veranstaltungen" fill={true} className="object-cover" />
                </div>
            </div>

            <div className="-translate-y-10 -mb-10 md:-translate-y-20 md:-mb-20">
                <ContentWrapper>
                    <div className="bg-black text-white p-6">
                        <div className="font-bold font-serif text-lg md:text-xl">
                            Selbst Veranstalter*in sein?
                        </div>
                        <p className="mt-3 md:text-lg">
                            Egal ob Konzert, Ausstellung, Workshop, Flohmarkt, Lesung, Theater oder andere verrückte,
                            nicht-kommerzielle Dinge: melde dich per E-Mail an den Kulturverein oder komm zum nächsten
                            Kulturplenum. Wir versuchen, die Veranstaltung mit dir möglich zu machen!
                        </p>
                        <p className="mt-3 md:text-lg">
                            Bis zur Eröffnung der B-Side am Mittelhafen (Q1/2024) stehen unsere Räume am
                            Hawerkamp für Veranstaltungen zur Verfügung.
                        </p>
                    </div>
                </ContentWrapper>

                <NextEvents events={events} px={false} />
            </div>

            <Footer />
        </main>
    );
};
