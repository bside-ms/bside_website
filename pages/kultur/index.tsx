import { Fragment } from 'react';
import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import CircleOverview from '@/components/cultureAndEducation/CircleOverview';
import CultureAndEducation from '@/components/cultureAndEducation/CultureAndEducation';
import EventOverview from '@/components/events/overview/EventOverview';
import Banner from '@/components/layout/Banner';
import ContentDivider from '@/components/layout/ContentDivider';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getPublicClientUrl } from '@/lib/common/url';
import { getUpcomingEvents } from '@/lib/events';
import { getCirclesOfOrganisation } from '@/lib/organisations';
import type { Circle, Event } from '@/types/payload/payload-types';

const organisationId = '647e60a67054a955522b24ad';

interface Props {
    events: Array<Event>;
    preview: boolean;
    circles: Array<Circle>;
}

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
    // ToDo: Apply filter to the eventlist.
    const events = await getUpcomingEvents(25);

    return {
        revalidate: 60,
        props: {
            events,
            circles: await getCirclesOfOrganisation(organisationId),
            preview: preview ?? false,
        },
    };
};

export default ({ events, preview, circles }: Props): ReactElement => {

    // ToDo: SEO-Infos der Organisation abrufen.

    return (
        <Fragment>
            <NextHead
                title="B-Side Kultur e.V."
                description="Der B-Side Kultur e.V. ist der gemeinnützige Kulturverein innerhalb der B-Side."
                url={`${getPublicClientUrl()}/kultur`}
            />

            <div className="min-h-screen flex flex-col justify-between">
                <HeaderBar />

                {preview && (
                    <Banner
                        bannerId="preview"
                        bannerText="Preview"
                        bannerLink=""
                        footerInView={false}
                        isPreview={true}
                    />
                )}

                <ContentDivider />

                <main>
                    { /* */ }
                    <CultureAndEducation />
                    { /* */ }

                    <ContentWrapper>
                        <CircleOverview
                            headlineText="Arbeitskreise des B-Side Kultur e.V."
                            circles={circles}
                        />
                    </ContentWrapper>

                    <ContentWrapper>
                        <EventOverview
                            title="Veranstaltungen des Kultur&nbsp;e.V.s"
                            events={events}
                        />
                    </ContentWrapper>
                </main>

                <Footer />
            </div>

        </Fragment>
    );
};
