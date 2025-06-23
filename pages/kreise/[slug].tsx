import { Fragment } from 'react';
import { useLivePreview } from '@payloadcms/live-preview-react';
import { kebabCase } from 'lodash-es';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import useLocale from '@/lib/common/hooks/useLocale';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { getPublicClientUrl } from '@/lib/common/url';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Circle, Media } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';
import Headline from 'components/blocks/headlineBlock/Headline';

interface Props {
    initialCircle: Circle;
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    const pages = await getPayloadResponse<PaginatedDocs<Circle>>('/api/circles/?limit=9999');

    const paths = pages.docs
        .map(({ name }) =>
            locales!.map((locale) => ({
                params: {
                    slug: kebabCase(name),
                },
                locale,
            })),
        )
        .flat();

    return {
        fallback: 'blocking',
        paths,
    };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params, locale }) => {
    const rawSlug = params?.slug;
    if (rawSlug === undefined) {
        return { notFound: true };
    }

    const slug = typeof rawSlug === 'string' ? rawSlug : rawSlug.join('/');
    if (isEmptyString(slug)) {
        return { notFound: true };
    }

    const circlesResponse = await getPayloadResponse<PaginatedDocs<Circle>>(`/api/circles/?limit=9999&locale=${locale!}`);

    const circle = circlesResponse.docs.find((doc) => {
        return kebabCase(doc.name) === slug;
    });

    if (circle === undefined) {
        return { notFound: true };
    }

    return {
        revalidate: 60,
        props: {
            initialCircle: circle,
            locale,
        },
    };
};

export default ({ initialCircle }: Props): ReactElement => {
    const locale = useLocale();

    const { data: circle } = useLivePreview<Circle>({
        serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || '',
        depth: 1,
        initialData: initialCircle,
    });

    // Basic Infos
    const organisation = typeof circle.organisation === 'string' ? null : circle.organisation;
    const organisationName = organisation?.shortName ?? 'kreise';
    const circleName = kebabCase(circle.name);

    // SEO Metadata
    const metaTitle =
        circle.meta !== undefined && !isEmptyString(circle.meta.title)
            ? circle.meta.title
            : `${circle.name} ${organisation && `| ${organisation.name}`}`;
    const metaDescription =
        circle.meta !== undefined && !isEmptyString(circle.meta.description)
            ? circle.meta.description
            : `${circle.name} ${organisation && `| ${organisation.name} | B-Side`}`;
    const canonicalUrl = `${getPublicClientUrl(locale)}/${organisationName}/${circleName}`;

    // Circle
    const imageUrl: string =
        (circle.circleImage ?? null) !== null ? (circle.circleImage as Media).url! : `/assets/stickFigures/${circle.fallbackImage}.svg`;

    return (
        <Fragment>
            <NextHead title={metaTitle} description={metaDescription} url={canonicalUrl} />

            <div className="flex min-h-screen flex-col justify-between">
                <HeaderBar />

                <main id="content">
                    <div className="mx-auto w-full text-center lg:w-[54rem] xl:w-[70rem]">
                        <div className="relative h-40 w-full md:h-52 lg:mt-4">
                            <Image
                                src={imageUrl}
                                alt=""
                                fill={true}
                                className={(circle.circleImage ?? null) !== null ? 'object-cover lg:rounded-xl' : 'object-fill'}
                                priority={true}
                            />
                        </div>

                        <div className="mt-2 bg-black pb-4 text-white">
                            <ContentWrapper className="!-mb-2 !pb-0 pt-2">
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
                        eventsOnPage={{
                            ownerId: circle.id,
                            filter: 'Circle',
                            perPage: 10,
                            withPagination: true,
                            withFilters: true,
                        }}
                    />
                </main>

                <Footer />
            </div>
        </Fragment>
    );
};
