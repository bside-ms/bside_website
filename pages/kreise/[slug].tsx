import { Fragment } from 'react';
import { kebabCase } from 'lodash';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import Banner from '@/components/layout/Banner';
import ContentDivider from '@/components/layout/ContentDivider';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { getPublicClientUrl } from '@/lib/common/url';
import { getUpcomingEventsByOwner } from '@/lib/events';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Circle, Event, Media } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';
import Headline from 'components/blocks/headlineBlock/Headline';

interface Props {
    circle: Circle;
    preview: boolean;
    events: Array<Event>;
}

export const getStaticPaths: GetStaticPaths = async () => {

    const pages = await getPayloadResponse<PaginatedDocs<Circle>>('/api/circles/?limit=100');

    const paths = pages.docs.map(({ name }) => ({
        params: {
            slug: kebabCase(name),
        },
    }));

    return {
        fallback: 'blocking',
        paths,
    };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params, preview }) => {

    const rawSlug = params?.slug;
    if (rawSlug === undefined) {
        return { notFound: true };
    }

    const slug = typeof rawSlug === 'string' ? rawSlug : rawSlug.join('/');
    if (isEmptyString(slug)) {
        return { notFound: true };
    }

    const circlesResponse = await getPayloadResponse<PaginatedDocs<Circle>>('/api/circles/?limit=100');

    const circle = circlesResponse.docs.find(doc => {
        return kebabCase(doc.name) === `${slug}`;
    });

    if (circle === undefined) {
        return { notFound: true };
    }

    return {
        revalidate: 60,
        props: {
            circle,
            preview: preview ?? false,
            events: await getUpcomingEventsByOwner(circle.id, 5, 'Circle'),
        },
    };
};

// eslint-disable-next-line complexity
export default ({ circle, preview, events }: Props): ReactElement => {

    // Basic Infos
    const organisation = typeof circle.organisation === 'string' ? null : circle.organisation;
    const organisationName = organisation?.shortName ?? 'kreise';
    const circleName = kebabCase(circle.name);

    // SEO Metadata
    const metaTitle = circle.meta !== undefined && !isEmptyString(circle.meta.title) ?
        circle.meta.title : `${circle.name} ${organisation && `| ${organisation.name}`}`;
    const metaDescription = circle.meta !== undefined && !isEmptyString(circle.meta.description) ?
        circle.meta.description : `${circle.name} ${organisation && `| ${organisation.name} | B-Side`}`;
    const canonialUrl = `${getPublicClientUrl()}/${organisationName}/${circleName}`;

    // Circle
    const imageUrl: string = (circle.circleImage ?? null) !== null ? (circle.circleImage as Media).url! : `/assets/stickFigures/${circle.fallbackImage}.svg`;

    return (
        <Fragment>
            <NextHead
                title={metaTitle}
                description={metaDescription}
                url={canonialUrl}
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
                    <div className="w-full lg:w-[54rem] xl:w-[70rem] mx-auto text-center">
                        <div className="w-full h-40 md:h-52 relative lg:mt-4">
                            <Image
                                src={imageUrl}
                                alt="artists"
                                fill={true}
                                className={(circle.circleImage ?? null) !== null ? 'object-cover lg:rounded-xl' : 'object-fill'}
                                priority={true}
                            />
                        </div>

                        <div className="bg-black text-white pb-4 mt-2">
                            <ContentWrapper className="pt-2 !pb-0 !-mb-2">
                                <Headline
                                    title={circle.name}
                                    teaser={organisation?.name ?? null}
                                    teaserLink={(organisation?.shortName ?? null) !== null ? `/${organisation!.shortName}` : null}
                                    level="h1"
                                    as="h3"
                                />
                            </ContentWrapper>
                        </div>
                    </div>

                    <ReusableBlockLayout
                        layout={circle.layout}
                        events={events}
                    />
                </main>

                <Footer />
            </div>
        </Fragment>
    );
};
