import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import ButtonBig from '@/components/common/ButtonBig';
import Footer from '@/components/common/Footer';
import EventOverview from '@/components/events/EventOverview';
import ContentDivider from '@/components/Layout/ContentDivider';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import HeaderBar from '@/components/Layout/Header/HeaderBar';
import MobileNavigation from '@/components/Layout/Navigation/MobileNavigation';
import { getPastEvents } from '@/lib/events';
import type { Event } from '@/types/payload/payload-types';

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
    return (
        <main className="min-h-screen flex flex-col justify-between">
            <MobileNavigation />
            <HeaderBar
                disableLeftLogo={false}
                headerMenu={true}
            />
            <ContentDivider />

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

            <ContentWrapper>
                <EventOverview
                    title="Vergangene Veranstaltungen"
                    events={events}
                    pastEvents={true}
                />
            </ContentWrapper>

            <Footer />
        </main>
    );
};
