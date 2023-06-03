import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import ButtonBig from '@/components/common/ButtonBig';
import ContentWrapper from '@/components/common/ContentWrapper';
import Footer from '@/components/common/Footer';
import HeaderBar from '@/components/common/HeaderBar';
import HeroImageSvg from '@/components/common/HeroImageSvg';
import NextEvents from '@/components/events/NextEvents';
import Navigation from '@/components/navigation/Navigation';
import { filterForMeetings, filterNoMeetings, getUpcomingEvents } from '@/lib/events';
import { getHeadNavigation } from '@/lib/navigation';
import eventImage from '@/public/assets/veranstaltung.png';
import type { Event, MainMenu } from '@/types/payload/payload-types';

interface Props {
    events: Array<Event>;
    meetings: Array<Event>;
    mainMenu?: MainMenu;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const allEvents = await getUpcomingEvents();

    return {
        revalidate: 60,
        props: {
            events: filterNoMeetings(allEvents),
            meetings: filterForMeetings(allEvents),
            mainMenu: await getHeadNavigation(),
        },
    };
};

export default ({ events, meetings, mainMenu }: Props): ReactElement => {
    return (
        <main className="min-h-screen flex flex-col justify-between">
            <Navigation />

            <HeaderBar
                disableLeftLogo={false}
                headerMenu={true}
                mainMenu={mainMenu}
            />

            <HeroImageSvg
                imageSrc="event"
                imageAlt="event"
                title="Veranstaltungen"
            />

            <ContentWrapper py={false}>
                <NextEvents title="" events={events} px={false} />
            </ContentWrapper>

            <div className="w-full lg:w-[60rem] lg:mx-auto">
                <div
                    className="bg-cover bg-center w-full h-52 md:h-72"
                    style={{ backgroundImage: `url(${eventImage.src})` }}
                />
            </div>

            <div className="-translate-y-10 -mb-10 md:-translate-y-20 md:-mb-20">
                <ContentWrapper>
                    <div className="bg-black text-white p-6">
                        <div className="font-bold font-serif text-lg md:text-xl">
                            Selbst Veranstalter*in sein?
                        </div>
                        <p className="mt-3 md:text-lg">
                            Egal ob Konzert, Ausstellung, Workshop, Flohmarkt, Lesung, Theater oder andere verrückte, nicht-kommerzielle Dinge: melde dich per E-Mail an den Kulturverein oder komm zum nächsten Kulturplenum. Wir versuchen, die Veranstaltung mit dir möglich zu machen!
                        </p>
                        <p className="mt-3 md:text-lg">
                            Bis zur Eröffnung der B-Side am Mittelhafen (Q1/2024) stehen unsere Räume am Hawerkamp für Veranstaltungen zur Verfügung.
                        </p>
                    </div>
                </ContentWrapper>

                <ContentWrapper>
                    <div className="font-serif text-white bg-black mt-4 text-2xl text-center p-3">
                        Komm zum Plenum und mach mit!
                    </div>

                    <p className="mt-3 md:text-lg">
                        Folgend findest du unsere nächsten öffentlichen Plena. Ein Plenum ist unsere interne
                        Veranstaltungsform, bei der alle Mitglieder eines Arbeitskreises zusammenkommen,
                        um gemeinsame Entscheidungen zu treffen, Fragen zu klären und Probleme zu lösen.
                    </p>
                    <p className="mt-3 md:text-lg">
                        Unsere öffentlichen Plena bieten nicht nur die Möglichkeit, aktiv an
                        unserem Kollektiv teilzuhaben und einzubringen, sondern sind auch eine
                        gute Gelegenheit, uns kennenzulernen.
                    </p>
                    <p className="mt-3 md:text-lg">
                        Wir freuen uns darauf, euch bei unseren Plena zu treffen!
                    </p>
                </ContentWrapper>

                <NextEvents
                    title=""
                    events={meetings}
                    px={false}
                    disableFilter={true}
                />

                <ContentWrapper>
                    <ButtonBig
                        buttonText="Vergangene Veranstaltungen"
                        buttonLink="/events/history"
                    />
                </ContentWrapper>

            </div>

            <Footer />
        </main>
    );
};
