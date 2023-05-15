import type { GetServerSideProps, GetServerSidePropsResult } from 'next';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { useInView } from 'react-intersection-observer';
import type PaginatedDocs from '../types/payload/PaginatedDocs';
import ContentWrapper from 'components/common/ContentWrapper';
import Footer from 'components/common/Footer';
import HeaderBar from 'components/common/HeaderBar';
import NextEvents from 'components/events/NextEvents';
import ContactTeaser from 'components/frontPage/ContactTeaser';
import HouseHero from 'components/frontPage/HouseHero';
import Navigation from 'components/navigation/Navigation';
import getPayloadResponse from 'lib/payload/getPayloadResponse';
import hausfrontJpg from 'public/assets/hausfront.jpg';
import type { Event, MainMenu } from 'types/payload/payload-types';

interface Props {
    events: Array<Event>;
    mainMenu?: MainMenu;
}

export const getServerSideProps: GetServerSideProps<Props> = async (): Promise<GetServerSidePropsResult<Props>> => {

    return {
        props: {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            events: (await getPayloadResponse<PaginatedDocs<Event>>('/api/events/')).docs ?? [],
            mainMenu: (await getPayloadResponse<MainMenu>('/api/globals/main-menu/')),
        },
    };

};

export default ({ events, mainMenu }: Props): ReactElement => {

    const { ref: inViewImageRef, inView: isImageContainerInView } = useInView({ initialInView: true });
    const { ref: inViewHeaderRef, inView: isHeaderInView } = useInView({ initialInView: true });

    return (
        <>
            <div ref={inViewHeaderRef} />
            <Navigation />

            <HeaderBar
                onlyWithBurgerMenu={isImageContainerInView}
                onlyHeader={isHeaderInView}
                mainMenu={mainMenu}
            />

            <div ref={inViewImageRef} className="mt-0 lg:mt-12">
                <HouseHero />
            </div>

            <ContentWrapper>
                <div className="px-8 mb-2 md:mb-3">
                    <div className="font-bold font-serif text-2xl md:text-4xl">
                        Die B-Side in Münster
                    </div>

                    <div className="mt-1 text-md md:text-lg md:mt-3">
                        Die B-Side ist ein offener Ort der Möglichkeiten am <span className="line-through">Münsteraner Hafen</span> Hawerkamp,
                        der von vielen Menschen selbstorganisiert entwickelt, gestaltet und verwaltet wird. Auch du kannst hier kreativ und aktiv werden oder einfach eine gute Zeit haben!
                    </div>

                    <div className="mt-3 mx-8 text-md md:text-lg md:mx-16 md:px-16">
                        <Link
                            href="/bside"
                            className="block text-lg text-center font-serif
                            py-1 md:py-3 mt-1 md:mt-3
                            text-white bg-black
                            md:cursor-pointer md:hover:text-black md:hover:bg-orange-500"
                        >
                            Mehr erfahren
                        </Link>
                    </div>
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

            <NextEvents events={events} />

            <ContactTeaser />

            <Footer />
        </>
    );
};
