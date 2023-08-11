import type { GetStaticProps } from 'next';
import Image from 'next/image';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import HeroImage from '@/components/common/HeroImage';
import EventOverview from '@/components/events/overview/EventOverview';
import ContentDivider from '@/components/layout/ContentDivider';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import { getPastEvents } from '@/lib/events';
import type { Event } from '@/types/payload/payload-types';
import CallToAction from '@blocks/callToActionBlock/CallToAction';
import Headline from '@blocks/headlineBlock/Headline';

interface Props {
    events: Array<Event>;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    return {
        revalidate: 60,
        props: {
            events: await getPastEvents(),
        },
    };
};

export default ({ events }: Props): ReactElement => {
    const archivText = 'Auf dieser Seite findest du ein paar der Veranstaltungen, die in der letzten Zeit bei uns stattgefunden haben.';

    return (
        <main className="min-h-screen flex flex-col justify-between">
            <HeaderBar />

            <ContentDivider />

            <ContentWrapper>
                <HeroImage imageSrc="hausfront.jpg" imageAlt="event" title="Vergangene Veranstaltungen" />

                <p className="lg:hidden mt-4 text-lg">
                    {archivText}
                </p>
            </ContentWrapper>

            <ContentWrapper>
                <div className="lg:flex lg:gap-4">
                    <div className="lg:basis-2/3">
                        <EventOverview
                            title=""
                            events={events}
                            pastEvents={true}
                        />
                    </div>

                    <div className="lg:basis-1/3 lg:align-text-top lg:px-4 overflow-y-auto">

                        <hr className="w-full lg:hidden my-4 mx-auto border-1 border-black" />

                        <Headline
                            title="Archiv"
                            level="h3"
                        />

                        <p className="hidden lg:block my-4 text-lg">
                            {archivText}
                        </p>

                        <p className="my-4 text-lg">
                            Falls die auf der Suche nach aktuellen und kommenden Veranstaltungen bist,
                            klicke einfach auf den folgenden Button.
                        </p>

                        <CallToAction
                            title=""
                            text="&nbsp;Zu den aktuellen Veranstaltungen&nbsp;"
                            href="/events"
                            withArrows={false}
                        />

                        <div className="my-8" />

                        <Headline
                            teaser="Nichts interessantes dabei?"
                            title="Mitgestalten"
                            level="h3"
                        />

                        <p className="my-4 text-lg">
                            Die B-Side lebt davon, dass Menschen sich einbringen und unser
                            Programm aktiv mitbestimmen und gestalten.
                        </p>

                        <p className="my-4 text-lg">
                            Du kannst dafür sorgen, dass hier zukünftig interessantere
                            und ansprechendere Veranstaltungen zu finden sind!
                        </p>

                        <CallToAction
                            title=""
                            text="Selbst aktiv werden!"
                            href="/mitmachen"
                            withArrows={false}
                        />

                        <div className="my-8" />

                        <div className="max-w-full h-auto relative">
                            <Image
                                src="/assets/hausfront.jpg"
                                alt="asdf"
                                width={1920}
                                height={1080}
                                className="object-contain fill"
                            />
                        </div>

                        <p className="my-4 text-lg">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </p>

                    </div>
                </div>
            </ContentWrapper>

            <Footer />
        </main>
    );
};
