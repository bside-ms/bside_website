import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import ContentWrapper from '@/components/common/ContentWrapper';
import Footer from '@/components/common/Footer';
import HeaderBar from '@/components/common/HeaderBar';
import NextEvents from '@/components/events/NextEvents';
import Navigation from '@/components/navigation/Navigation';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Event, MainMenu } from '@/types/payload/payload-types';

interface Props {
    events: Array<Event>;
    mainMenu?: MainMenu;
}

export const getStaticProps: GetStaticProps<Props> = async () => {

    return {
        revalidate: 60,
        props: {
            events: (await getPayloadResponse<PaginatedDocs<Event>>('/api/events/')).docs,
            mainMenu: await getPayloadResponse<MainMenu>('/api/globals/main-menu/'),
        },
    };
};

export default ({ events, mainMenu }: Props): ReactElement => {

    return (
        <main className="min-h-screen flex flex-col justify-between">
            <Navigation />

            <HeaderBar
                onlyWithBurgerMenu={false}
                onlyHeader={true}
                mainMenu={mainMenu}
            />

            <ContentWrapper>
                <div className="mb-2 md:mb-3">
                    <div className="font-bold font-serif text-2xl md:text-4xl">
                        Veranstaltungsübersicht
                    </div>

                    <div className="mt-1 text-md md:text-lg md:mt-3">
                        Hier entsteht die Veranstaltungsübersicht.
                    </div>

                    <NextEvents events={events} px={false} />
                </div>
            </ContentWrapper>

            <Footer />
        </main>
    );
};
