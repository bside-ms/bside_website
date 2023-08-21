import { Fragment } from 'react';
import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import CultureAndEducation from '@/components/cultureAndEducation/CultureAndEducation';
import EventOverview from '@/components/events/overview/EventOverview';
import Banner from '@/components/layout/Banner';
import ContentDivider from '@/components/layout/ContentDivider';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getPublicClientUrl } from '@/lib/common/url';
import { getUpcomingEvents } from '@/lib/events';
import { getCirclesOfOrganisation, getOrganisation } from '@/lib/organisations';
import type { Circle, Event, Organisation } from '@/types/payload/payload-types';
import ReusableBlocks from '@blocks/ReusableBlocks';

interface Props {
    events: Array<Event>;
    preview: boolean;
    organisation: Organisation;
    circles: Array<Circle>;
}

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
    // ToDo: Apply filter to the eventlist.
    const events = await getUpcomingEvents(25);

    const organisationId = '647e60a67054a955522b24ad';
    const organisation = await getOrganisation(organisationId);

    return {
        revalidate: 60,
        props: {
            events,
            preview: preview ?? false,
            organisation,
            circles: await getCirclesOfOrganisation(organisation.id),
        },
    };
};

export default ({ events, preview, organisation, circles }: Props): ReactElement => {

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

                    {organisation.layout?.map((layoutElement, index) => (
                        <ReusableBlocks
                            key={layoutElement.id ?? layoutElement.blockName ?? `${layoutElement.blockType}${index}`}
                            layoutElement={layoutElement}
                            circles={circles}
                        />
                    ))}

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
