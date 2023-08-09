import { Fragment } from 'react';
import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContentDivider from '@/components/layout/ContentDivider';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getUpcomingEvents } from '@/lib/events';
import type { Event } from '@/types/payload/payload-types';
import HeadlineBlock from 'components/blocks/headlineBlock/HeadlineBlock';

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

export default (): ReactElement => {

    return (
        <Fragment>
            <NextHead
                title="GmbH | B-Side"
                description="Die B-Side GmbH betreibt das Soziokulturelle Zentrum am Münsteraner Mittelhafen."
                url="https://b-side.ms/g,bh"
            />

            <main className="min-h-screen flex flex-col justify-between">
                <HeaderBar />

                <ContentDivider />

                <ContentWrapper>
                    <HeadlineBlock
                        title="B-Side GmbH"
                        level="h1"
                    />
                </ContentWrapper>

                <Footer />
            </main>
        </Fragment>
    );
};
