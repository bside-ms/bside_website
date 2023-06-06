import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import getHeadNavigation from '@/lib/getHeadNavigation';
import Footer from 'components/common/Footer';
import HeaderBar from 'components/common/HeaderBar';
import CultureAndEducation from 'components/cultureAndEducation/CultureAndEducation';
import Navigation from 'components/navigation/Navigation';
import getPayloadResponse from 'lib/payload/getPayloadResponse';
import type PaginatedDocs from 'types/payload/PaginatedDocs';
import type { Event, MainMenu } from 'types/payload/payload-types';

interface Props {
    events: Array<Event>;
    mainMenu: MainMenu;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const events = await getPayloadResponse<PaginatedDocs<Event>>('/api/events/');

    return {
        revalidate: 60,
        props: {
            events: events.docs,
            mainMenu: await getHeadNavigation(),
        },
    };
};

export default ({ events, mainMenu }: Props): ReactElement => {

    return (
        <main className="min-h-screen flex flex-col justify-between">
            <Navigation />

            <HeaderBar
                disableLeftLogo={false}
                headerMenu={true}
                mainMenu={mainMenu}
            />

            <CultureAndEducation events={events} />

            <Footer />
        </main>
    );
};
