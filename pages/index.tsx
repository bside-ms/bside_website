import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import { useInView } from 'react-intersection-observer';
import { CallToActionBlock } from '@/components/Blocks/CallToAction';
import ButtonBig from '@/components/common/ButtonBig';
import Footer from '@/components/common/Footer';
import EventOverview from '@/components/events/EventOverview';
import HouseHero from '@/components/frontPage/HouseHero';
import Banner from '@/components/Layout/Banner';
import ContentDivider from '@/components/Layout/ContentDivider';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import HeaderBar from '@/components/Layout/Header/HeaderBar';
import MobileNavigation from '@/components/Layout/Navigation/MobileNavigation';
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

    const { ref: inViewImageRef, inView: isImageContainerInView } =
        useInView({ initialInView: true });

    const { ref: inViewFooterRef, inView: isFooterInView }
        = useInView({
            initialInView: true,
            threshold: 1,
        });

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <MobileNavigation />

            <HeaderBar
                disableLeftLogo={isImageContainerInView}
                headerMenu={true}
                banner={false}
            />

            <Banner
                bannerId="index"
                bannerText="Hinweis | Hinweis | Hinweis | Hinweis | Hinweis"
                bannerLink=""
                footerInView={isFooterInView}
            />

            <ContentDivider />

            <main>
                <div ref={inViewImageRef}>
                    <HouseHero />
                </div>

                <ContentWrapper>
                    <div className="px-0 lg:px-8 mb-2 md:mb-3">
                        <div className="font-bold font-serif text-2xl md:text-4xl md:scroll-mt-[64px]">
                            Die B-Side in Münster
                        </div>

                        <div className="mt-1 text-md md:text-lg md:mt-3">
                            Die B-Side ist ein offener Ort der Möglichkeiten am <span className="line-through">Münsteraner Hafen</span> Hawerkamp,
                            der von vielen Menschen selbstorganisiert entwickelt, gestaltet und verwaltet wird. Auch du kannst hier kreativ und aktiv werden oder einfach eine gute Zeit haben!
                        </div>

                        <ButtonBig
                            buttonText="Mehr erfahren"
                            buttonLink="/bside"
                        />
                    </div>
                </ContentWrapper>

                <div className="w-full lg:w-[60rem] lg:mx-auto">
                    <div
                        className="bg-cover bg-center w-full h-52 md:h-72"
                        style={{ backgroundImage: `url(${hausfrontJpg.src})` }}
                    />
                </div>

                <div className="-translate-y-10 -mb-10 md:-translate-y-20 md:-mb-20">
                    <ContentWrapper>
                        <div className="bg-black text-white p-6">
                            <div className="font-bold font-serif text-lg md:text-xl">
                                Öffnungszeiten
                            </div>
                            <div className="mt-3 md:text-lg">
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                                labore et dolore magna aliquyam erat.
                            </div>
                        </div>
                    </ContentWrapper>
                </div>

                <ContentWrapper>
                    <EventOverview events={events} />
                </ContentWrapper>

                <CallToActionBlock
                    title="Bock auf Mitmachen?"
                    text="Schreib uns ne Mail!"
                    href="/kontakt"
                />
            </main>

            <Footer>
                <div ref={inViewFooterRef} />
            </Footer>
        </div>
    );
};
