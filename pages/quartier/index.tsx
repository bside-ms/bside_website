import { Fragment } from 'react';
import type { GetStaticProps } from 'next';
import Image from 'next/image';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
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

    const organisationId = '647e60bd7054a955522b24cb';
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

    return (
        <Fragment>
            <NextHead
                title={organisation.meta?.title ?? 'B-Side GmbH'}
                description={organisation.meta?.description ?? 'Die B-Side GmbH betreibt das soziokulturelle Zentrum am Münsteraner Mittelhafen.'}
                url={`${getPublicClientUrl()}/quartier`}
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
                            Quartiersarbeit
                        </div>
                    </ContentWrapper>

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