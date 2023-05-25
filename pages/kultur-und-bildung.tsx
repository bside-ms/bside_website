import type { GetServerSideProps, GetServerSidePropsResult } from 'next';
import type { ReactElement } from 'react';
import Footer from 'components/common/Footer';
import HeaderBar from 'components/common/HeaderBar';
import CultureAndEducation from 'components/cultureAndEducation/CultureAndEducation';
import Navigation from 'components/navigation/Navigation';
import getPayloadResponse from 'lib/payload/getPayloadResponse';
import type PaginatedDocs from 'types/payload/PaginatedDocs';
import type { Event } from 'types/payload/payload-types';

interface Props {
    events: Array<Event>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (): Promise<GetServerSidePropsResult<Props>> => {

    const events = await getPayloadResponse<PaginatedDocs<Event>>('/api/events/');

    return {
        props: {
            events: events.docs,
        },
    };
};

export default ({ events }: Props): ReactElement => {

    return (
        <main className="min-h-screen flex flex-col justify-between">
            <Navigation />

            <HeaderBar />

            <CultureAndEducation events={events} />

            <Footer />
        </main>
    );
};
