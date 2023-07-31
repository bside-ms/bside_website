import { useCallback, useState } from 'react';
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
import HeaderBar from '@/components/Layout/Header/HeaderBar';
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

    const [disableLogoInHeader, setDisableLogoInHeader] = useState(false);

    const { ref: inViewFooterRef, inView: isFooterInView } = useInView({
        initialInView: true,
        threshold: 1,
    });

    const handleHeroImageInViewToggle = useCallback(
        (isInView: boolean) => setDisableLogoInHeader(isInView),
        []
    );

    return (
        <div className="min-h-screen flex flex-col justify-between">

            <HeaderBar
                hideHeartLogo={disableLogoInHeader}
            />

            <Banner
                bannerId="index"
                bannerText="Hinweis | Hinweis | Hinweis | Hinweis | Hinweis"
                bannerLink=""
                footerInView={isFooterInView}
            />

            <ContentDivider />

            <main>
                <HouseHero toggleHeroImageInView={handleHeroImageInViewToggle} />

                <div
                    className="bg-cover bg-bottom w-full h-52 lg:mt-14"
                    style={{ backgroundImage: `url(${hausfrontJpg.src})` }}
                />

                <ContentWrapper>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <EventOverview events={events} />

                        <CallToAction
                            title="Bock auf Mitmachen?"
                            text="Schreib uns ne Mail!"
                            href="/kontakt"
                            withArrows={!isLg}
                        />
                    </div>
                </ContentWrapper>
            </main>

            <Footer>
                <div ref={inViewFooterRef} />
            </Footer>
        </div>
    );
};
