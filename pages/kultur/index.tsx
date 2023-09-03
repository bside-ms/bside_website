import { Fragment } from 'react';
import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import Footer from '@/components/common/Footer';
import HeroImageSvg from '@/components/common/HeroImageSvg';
import Banner from '@/components/layout/Banner';
import ContentDivider from '@/components/layout/ContentDivider';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getPublicClientUrl } from '@/lib/common/url';
import { getUpcomingEventsByOwner } from '@/lib/events';
import { getCirclesOfOrganisation, getOrganisation } from '@/lib/organisations';
import kulturImageSvg from '@/public/assets/stickFigures/Kultur.svg';
import type { Circle, Event, Organisation } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';
import SubNavigation from '@blocks/subNavigation/SubNavigation';
import SubNavigationLink from '@blocks/subNavigation/SubNavigationLink';

interface Props {
    events: Array<Event>;
    preview: boolean;
    organisation: Organisation;
    circles: Array<Circle>;
}

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
    const organisationId = '647e60a67054a955522b24ad';

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const events = await getUpcomingEventsByOwner(organisationId, 25, 'Organisation') ?? [];
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

    const { isMd } = useBreakpointContext();

    return (
        <Fragment>
            <NextHead
                title={organisation.meta?.title ?? 'Kultur e.V.'}
                description={organisation.meta?.description ?? 'Der B-Side Kultur e.V. ist der gemeinnützige Kulturverein innerhalb der B-Side.'}
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

                <main id="content">
                    <HeroImageSvg
                        imageSrc={kulturImageSvg}
                        imageAlt=""
                        title="Kultur & Bildung"
                    />

                    <SubNavigation>
                        <SubNavigationLink
                            title={isMd ? 'Unsere Arbeitskreise' : 'Arbeitskreise'}
                            anchor="kreise"
                        />
                        <SubNavigationLink
                            title={isMd ? 'Unsere Veranstaltungen' : 'Veranstaltungen'}
                            anchor="veranstaltungen"
                        />
                        {isMd && (
                            <SubNavigationLink
                                title="Unterstützen"
                                teaser="asdf"
                                anchor="unterstützen"
                            />
                        )}
                    </SubNavigation>

                    <ReusableBlockLayout
                        layout={organisation.layout}
                        circles={circles}
                        events={events}
                    />
                </main>

                <Footer />
            </div>

        </Fragment>
    );
};
