import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import ContentDivider from '@/components/Layout/ContentDivider';
import { getUpcomingEvents } from '@/lib/events';
import Footer from 'components/common/Footer';
import CultureAndEducation from 'components/cultureAndEducation/CultureAndEducation';
import HeaderBar from 'components/Layout/Header/HeaderBar';
import type { Event } from 'types/payload/payload-types';

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

    return (
        <main className="min-h-screen flex flex-col justify-between">
            <HeaderBar />

            <ContentDivider />

            <CultureAndEducation events={events} />

            <Footer />
        </main>
    );
};
