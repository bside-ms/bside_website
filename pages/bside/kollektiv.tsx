import { Fragment } from 'react';
import type { GetStaticProps } from 'next';
import Image from 'next/image';
import type { ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import Footer from '@/components/common/Footer';
import Banner from '@/components/layout/Banner';
import ContentDivider from '@/components/layout/ContentDivider';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getPublicClientUrl } from '@/lib/common/url';
import { getUpcomingEvents } from '@/lib/events';
import { getAllCircles, getOrganisation } from '@/lib/organisations';
import type { Circle, Event, Organisation } from '@/types/payload/payload-types';
import ReusableBlocks from '@blocks/reusableLayout/ReusableBlocks';
import SubNavigation from '@blocks/subNavigation/SubNavigation';
import SubNavigationLink from '@blocks/subNavigation/SubNavigationLink';

interface Props {
    events: Array<Event>;
    preview: boolean;
    organisation: Organisation;
    circles: Array<Circle>;
}

export const getStaticProps: GetStaticProps<Props> = async ({ preview }) => {
    // ToDo: Apply filter to the eventlist.
    const events = await getUpcomingEvents(25);

    const organisationId = '647e605b7054a955522b2471';
    const organisation = await getOrganisation(organisationId);

    return {
        revalidate: 60,
        props: {
            events,
            preview: preview ?? false,
            organisation,
            circles: await getAllCircles(),
        },
    };
};

export default ({ events, preview, organisation, circles }: Props): ReactElement => {

    const { isMd } = useBreakpointContext();

    return (
        <Fragment>
            <NextHead
                title={organisation.meta?.title ?? 'B-Side Kollektiv'}
                description={organisation.meta?.description ?? 'Das B-Side Kollektiv - Das Herz der B-Side.'}
                url={`${getPublicClientUrl()}/bside/kollektiv`}
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
                    <ContentWrapper>
                        <div className="w-full h-32 xs:h-40 md:h-52 relative lg:mt-4">
                            <Image
                                src="/assets/stickFigures/artists.svg"
                                alt="artists"
                                fill={true}
                                className="object-contain"
                                priority={true}
                            />
                        </div>

                        <div className="font-serif text-white bg-black mt-4 text-2xl text-center p-3">
                            B-Side Kollektiv
                        </div>
                    </ContentWrapper>

                    <SubNavigation>
                        <SubNavigationLink
                            title={isMd ? 'Alle Arbeitskreise' : 'Arbeitskreise'}
                            anchor="kreise"
                        />
                        <SubNavigationLink
                            title={isMd ? 'Was ist Soziokratie?' : 'Soziokratie'}
                            anchor="soziokratie"
                            teaser={true}
                        />
                        {isMd && (
                            <SubNavigationLink
                                title="Mitmachen"
                                anchor="mitmachen"
                                teaser={true}
                            />
                        )}
                    </SubNavigation>

                    {organisation.layout?.map((layoutElement, index) => (
                        <ReusableBlocks
                            key={layoutElement.id ?? layoutElement.blockName ?? `${layoutElement.blockType}${index}`}
                            layoutElement={layoutElement}
                            circles={circles}
                            events={events}
                        />
                    ))}
                </main>

                <Footer />
            </div>

        </Fragment>
    );
};
