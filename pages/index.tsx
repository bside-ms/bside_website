import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import { useInView } from 'react-intersection-observer';
import ButtonBig from '@/components/common/ButtonBig';
import ContentWrapper from '@/components/common/ContentWrapper';
import Footer from '@/components/common/Footer';
import HeaderBar from '@/components/common/HeaderBar';
import NextEvents from '@/components/events/NextEvents';
import ContactTeaser from '@/components/frontPage/ContactTeaser';
import HouseHero from '@/components/frontPage/HouseHero';
import Navigation from '@/components/navigation/Navigation';
import { getUpcomingEvents } from '@/lib/events';
import getHeadNavigation from '@/lib/getHeadNavigation';
import hausfrontJpg from '@/public/assets/hausfront.jpg';
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

    const { ref: inViewImageRef, inView: isImageContainerInView } = useInView({ initialInView: true });

    return (
        <main className="min-h-screen flex flex-col justify-between">
            <Navigation />

            <HeaderBar
                disableLeftLogo={isImageContainerInView}
                headerMenu={true}
                banner={false}
                mainMenu={mainMenu}
            />

            <div ref={inViewImageRef} className="mt-0 lg:mt-12">
                <HouseHero />
            </div>

            <ContentWrapper>
                <div className="px-0 lg:px-8 mb-2 md:mb-3">
                    <div className="font-bold font-serif text-2xl md:text-4xl">
                        Die B-Side in Münster
                    </div>

                    <div className="mt-1 text-md md:text-lg md:mt-3 line-through">
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
                <ContentWrapper px={false} pxsm={true}>
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

            <ContentWrapper px={false} pxsm={true}>
                <NextEvents events={events} />
            </ContentWrapper>

            <ContactTeaser />

            <Footer />
        </main>
    );
};
