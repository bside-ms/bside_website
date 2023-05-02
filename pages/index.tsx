import type { GetServerSideProps, GetServerSidePropsResult } from 'next';
import type { ReactElement } from 'react';
import { useInView } from 'react-intersection-observer';
import ContentWrapper from 'components/common/ContentWrapper';
import Footer from 'components/common/Footer';
import HeaderBar from 'components/common/HeaderBar';
import NextEvents from 'components/events/NextEvents';
import ContactTeaser from 'components/frontPage/ContactTeaser';
import HouseHero from 'components/frontPage/HouseHero';
import Navigation from 'components/navigation/Navigation';
import getPayloadResponse, { PayloadPath } from 'lib/payload/getPayloadResponse';
import hausfrontJpg from 'public/assets/hausfront.jpg';
import type PaginatedDocs from 'types/payload/PaginatedDocs';
import type { Event } from 'types/payload/payload-types';

interface Props {
    events: Array<Event>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (): Promise<GetServerSidePropsResult<Props>> => {

    const events = await getPayloadResponse<PaginatedDocs<Event>>(PayloadPath.events);

    return {
        props: {
            events: events.docs,
        },
    };
};

export default ({ events }: Props): ReactElement => {

    const { ref: inViewImageRef, inView: isImageContainerInView } = useInView({ initialInView: true });

    return (
        <>
            <Navigation />

            <div ref={inViewImageRef}>
                <HouseHero />
            </div>

            <HeaderBar isVisible={!isImageContainerInView} />

            <ContentWrapper>
                <div className="px-8 mb-2 md:mb-3">
                    <div className="font-bold font-serif text-2xl md:text-4xl">
                        Die B-Side
                    </div>

                    <div className="mt-1 text-sm md:text-lg md:mt-3">
                        Das unmittelbare Wirkungsumfeld des B-Side Kultur e.V. befindet sich im Hansaviertel.
                        Dennoch ist dieses Viertel und seine Bewohner:innen, wenn auch als "Heimatquartier"
                        oft besonders hervorgehoben wird, nur ein Ausschnitt der Allgemeinheit, die der B-Side
                        Kultur e.V.durch Kunst, Kultur und Bilder fördert.
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
