import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import { useInView } from 'react-intersection-observer';
import CallToAction from '@/components/Blocks/CallToAction';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import Footer from '@/components/common/Footer';
import EventOverview from '@/components/events/EventOverview';
import HouseHero from '@/components/frontPage/HouseHero';
import Banner from '@/components/Layout/Banner';
import ContentDivider from '@/components/Layout/ContentDivider';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import HeaderBarContainer from '@/components/Layout/Header/HeaderBarContainer';
import { getUpcomingEvents } from '@/lib/events';
import hausfrontJpg from '@/public/assets/hausfront.jpg';
import type { Event } from '@/types/payload/payload-types';

interface Props {
    events: Array<Event>;
}

export const getStaticProps: GetStaticProps<Props> = async () => {

    return {
        revalidate: 60,
        props: {
            events: await getUpcomingEvents(),
        },
    };
};

export default ({ events }: Props): ReactElement => {

    const { isLg } = useBreakpointContext();

    const { ref: inViewFooterRef, inView: isFooterInView } = useInView({
        initialInView: true,
        threshold: 1,
    });

    return (
        <div className="min-h-screen flex flex-col justify-between">

            <HeaderBarContainer />

            <Banner
                bannerId="index"
                bannerText="Hinweis | Hinweis | Hinweis | Hinweis | Hinweis"
                bannerLink=""
                footerInView={isFooterInView}
            />

            <ContentDivider />

            <main>
                <HouseHero />

                <div className="w-full px-4 lg:w-[60rem] xl:w-[80rem] lg:mx-auto">
                    <div
                        className="bg-cover bg-center w-full h-52 md:h-72 my-8"
                        style={{ backgroundImage: `url(${hausfrontJpg.src})` }}
                    />
                </div>

                <ContentWrapper>
                    <EventOverview events={events} />
                </ContentWrapper>

                <ContentWrapper>
                    <CallToAction
                        title="Bock auf Mitmachen?"
                        text="Schreib uns ne Mail!"
                        href="/kontakt"
                        withArrows={!isLg}
                    />
                </ContentWrapper>
            </main>

            <Footer>
                <div ref={inViewFooterRef} />
            </Footer>
        </div>
    );
};
