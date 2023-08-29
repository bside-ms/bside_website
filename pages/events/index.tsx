import type { GetStaticProps } from 'next';
import Image from 'next/image';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import HeroImageSvg from '@/components/common/HeroImageSvg';
import EventOverview from '@/components/events/overview/EventOverview';
import Banner from '@/components/layout/Banner';
import ContentDivider from '@/components/layout/ContentDivider';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import { filterForMeetings, filterNoMeetings, getUpcomingEvents } from '@/lib/events';
import heroImage from '@/public/assets/stickFigures/Veranstaltungen.svg';
import eventImage from '@/public/assets/veranstaltung.png';
import type { Event } from '@/types/payload/payload-types';
import Button from '@blocks/buttonBlock/Button';
import Headline from '@blocks/headlineBlock/Headline';

interface Props {
    events: Array<Event>;
    meetings: Array<Event>;
    preview: boolean;
}

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
    const allEvents = await getUpcomingEvents(25);

    return {
        revalidate: 60,
        props: {
            events: filterNoMeetings(allEvents),
            meetings: filterForMeetings(allEvents),
            preview: preview ?? false,
        },
    };
};

export default ({ events, meetings, preview }: Props): ReactElement => {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <HeaderBar />
            <ContentDivider />

            {preview && (
                <Banner
                    bannerId="preview"
                    bannerText="preview"
                    bannerLink=""
                    footerInView={false}
                    isPreview={true}
                />
            )}

            <main id="content">
                <HeroImageSvg
                    imageSrc={heroImage}
                    imageAlt=""
                    title="Veranstaltungen"
                />

                <ContentWrapper>
                    <div className="lg:flex lg:gap-4">
                        <div className="lg:basis-2/3">
                            <EventOverview title="" events={events} />
                        </div>

                        <div className="lg:basis-1/3 lg:align-text-top lg:px-4 overflow-y-auto">
                            <hr className="w-full lg:hidden my-4 mx-auto border-1 border-black" />

                            <Headline
                                title="Du möchtest Veranstalter*in sein?"
                                level="h3"
                            />

                            <p className="my-4 text-lg">
                                Egal ob Konzert, Ausstellung, Workshop, Flohmarkt, Lesung, Theater oder andere verrückte,
                                nicht-kommerzielle Dinge: melde dich per E-Mail an den Kulturverein oder komm zum nächsten
                                Kulturplenum. Wir versuchen, die Veranstaltung mit dir möglich zu machen!
                            </p>

                            <div className="my-8" />

                            <Headline
                                title="Veranstaltungsarchiv"
                                level="h3"
                            />

                            <p className="my-4 text-lg">
                                Du weißt nicht mehr, welche Veranstaltung du vor letzten Monat besucht hast?
                                Du brauchst aber ganz dringend den Namen der Band?
                            </p>

                            <Button
                                title=""
                                text="Wirf ein Blick ins Archiv"
                                href="/events/history"
                            />

                            <div className="my-4" />
                        </div>
                    </div>
                </ContentWrapper>

                <ContentWrapper>
                    <div className="w-full">
                        <div className="bg-cover bg-center w-full h-52 md:h-72 relative">
                            <Image
                                src={eventImage}
                                alt=""
                                fill={true}
                                sizes="(max-width: 768px) 740px, 1120px"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </ContentWrapper>

                <ContentWrapper>
                    <div className="font-serif text-white bg-black text-2xl text-center p-3">
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

                <ContentWrapper>
                    <EventOverview
                        title=""
                        events={meetings}
                        // disableFilter={true}
                    />
                </ContentWrapper>
            </main>

            <Footer />
        </div>
    );
};
