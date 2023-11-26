import type { GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import HeroImageSvg from '@/components/common/HeroImageSvg';
import EventOverview from '@/components/events/overview/EventOverview';
import ContentDivider from '@/components/layout/ContentDivider';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import { getUpcomingEvents } from '@/lib/events';
import heroImage from '@/public/assets/stickFigures/Veranstaltungen.svg';
import eventImage from '@/public/assets/veranstaltung.png';
import type { Event } from '@/types/payload/payload-types';
import Button from '@blocks/buttonBlock/Button';
import Headline from '@blocks/headlineBlock/Headline';

interface Props {
    events: Array<Event>;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const allEvents = await getUpcomingEvents(0, 'Overview');

    return {
        revalidate: 60,
        props: {
            events: allEvents,
            locale,
        },
    };
};

export default ({ events }: Props): ReactElement => {
    const { locale } = useRouter();

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <HeaderBar />
            <ContentDivider />

            <main id="content">
                <HeroImageSvg
                    imageSrc={heroImage}
                    imageAlt=""
                    title={locale === 'de' ? 'Veranstaltungen' : 'Events'}
                />

                <ContentWrapper>
                    <div className="lg:flex lg:gap-4">
                        <div className="lg:basis-2/3">
                            <EventOverview title="" events={events} />
                        </div>

                        <div className="lg:basis-1/3 lg:align-text-top lg:px-4 overflow-y-auto">
                            <hr className="w-full lg:hidden my-4 mx-auto border-1 border-black" />

                            <Headline
                                title={locale === 'de' ? 'Veranstaltungsarchiv' : 'Event Archive'}
                                level="h3"
                            />

                            <p className="my-4 md:text-lg">
                                {locale === 'de'
                                    ? 'Du weißt nicht mehr, welche Veranstaltung du vor letzten Monat besucht hast? Du brauchst aber ganz dringend den Namen der Band?'
                                    : 'You don\'t remember which event you visited last month? But you urgently need the name of the band?'}
                            </p>

                            <Button
                                title=""
                                text={locale === 'de' ? 'Wirf ein Blick ins Archiv' : 'Take a look at the archive'}
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
            </main>

            <Footer />
        </div>
    );
};
