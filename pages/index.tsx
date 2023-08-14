import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import { useInView } from 'react-intersection-observer';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import Footer from '@/components/common/Footer';
import EventOverview from '@/components/events/overview/EventOverview';
import FrontPageHero from '@/components/frontPage/FrontPageHero';
import Banner from '@/components/layout/Banner';
import ContentDivider from '@/components/layout/ContentDivider';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import { getUpcomingEvents } from '@/lib/events';
import hausfrontJpg from '@/public/assets/hausfront.jpg';
import type { Event } from '@/types/payload/payload-types';
import Button from '@blocks/buttonBlock/Button';
import CallToAction from '@blocks/callToActionBlock/CallToAction';
import Headline from '@blocks/headlineBlock/Headline';

interface Props {
    events: Array<Event>;
    preview: boolean;
}

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
    return {
        revalidate: 60,
        props: {
            events: await getUpcomingEvents(5),
            preview: preview ?? false,
        },
    };
};

export default ({ events, preview }: Props): ReactElement => {

    const { isLg } = useBreakpointContext();

    const { ref: inViewFooterRef, inView: isFooterInView } = useInView({
        initialInView: true,
        threshold: 1,
    });

    return (
        <div className="min-h-screen flex flex-col justify-between">

            <HeaderBar />

            {preview && (
                <Banner
                    bannerId="index"
                    bannerText="Hinweis | Hinweis | Hinweis"
                    bannerLink=""
                    footerInView={isFooterInView || preview}
                    isPreview={preview}
                />
            )}

            <ContentDivider />

            <main>
                <FrontPageHero />

                <div className="w-full px-4 lg:w-[60rem] xl:w-[80rem] lg:mx-auto">
                    <div
                        className="bg-cover bg-center w-full h-52 md:h-72 my-8"
                        style={{ backgroundImage: `url(${hausfrontJpg.src})` }}
                    />
                </div>

                <ContentWrapper>

                    <div className="font-serif text-white bg-black text-2xl text-center p-3 mb-8">
                        Nächste Veranstaltungen
                    </div>

                    <div className="lg:hidden">
                        <p className="mb-4 text-lg">
                            Hier findest du die nächsten fünf Veranstaltungen.
                            Alle weiteren Veranstaltungen findest du in unserer Veranstaltungsübersicht.
                        </p>

                        <Button
                            title=""
                            text="Alle Veranstaltungen"
                            href="/events"
                        />

                        <div className="my-4" />
                    </div>

                    <div className="lg:flex lg:gap-4">
                        <div className="lg:basis-2/3">
                            <EventOverview
                                events={events}
                                title=""
                                noFilters={true}
                            />
                        </div>

                        <div className="lg:basis-1/3 lg:align-text-top lg:px-4 overflow-y-auto">
                            <div className="w-full lg:hidden my-4" />

                            <div className="hidden lg:block">
                                <p className="my-4 text-lg">
                                    Hier findest du die nächsten fünf Veranstaltungen.
                                    Alle weiteren Veranstaltungen findest du in unserer Veranstaltungsübersicht.
                                </p>

                                <Button
                                    title=""
                                    text="Alle Veranstaltungen"
                                    href="/events"
                                />

                            </div>

                            <Headline
                                title="Archiv"
                                level="h3"
                            />

                            <p className="my-4 text-lg">
                                Hier findest du die fünf nächsten Veranstaltungen.
                                Alle weiteren Veranstaltungen findest du in unserer Veranstaltungsübersicht.
                            </p>

                            <Button
                                title=""
                                text="Veranstaltungsarchiv"
                                href="/events/history"
                            />
                        </div>
                    </div>
                </ContentWrapper>

                <div className="w-full px-4 lg:w-[60rem] xl:w-[80rem] lg:mx-auto">
                    <div
                        className="bg-cover bg-center w-full h-52 md:h-72 mb-4"
                        style={{ backgroundImage: `url(${hausfrontJpg.src})` }}
                    />
                </div>

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
