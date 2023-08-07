import { Fragment } from 'react';
import { kebabCase } from 'lodash';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContentDivider from '@/components/Layout/ContentDivider';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import HeaderBar from '@/components/Layout/Header/HeaderBar';
import NextHead from '@/components/Layout/Next/NextHead';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { getPublicClientUrl } from '@/lib/common/url';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Circle, Media } from '@/types/payload/payload-types';
import { Headline } from '@blocks/HeadlineBlock';
import ReusableBlocks from '@blocks/ReusableBlocks';

interface Props {
    circle: Circle;
}

export const getStaticPaths: GetStaticPaths = async () => {

    const pages = await getPayloadResponse<PaginatedDocs<Circle>>('/api/circles/?limit=100');

    const paths = pages.docs.map(({ name }) => ({
        params: {
            slug: [kebabCase(name)],
        },
    }));

    return {
        fallback: 'blocking',
        paths,
    };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {

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
        },
    };
};

export default ({ circle }: Props): ReactElement => {

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

            <main className="min-h-screen flex flex-col justify-between">
                <HeaderBar />

                <ContentDivider />

                <div className="w-full lg:w-[54rem] xl:w-[70rem] mx-auto text-center px-2">
                    <div className="w-full h-32 xs:h-40 md:h-52 relative lg:mt-4">
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
                            />
                        </ContentWrapper>
                    </div>
                </div>

                {circle.layout?.map((layoutElement, index) => (
                    <ReusableBlocks
                        key={layoutElement.id ?? layoutElement.blockName ?? `${layoutElement.blockType}${index}`}
                        layoutElement={layoutElement}
                    />
                ))}

                <Footer />
            </main>
        </Fragment>
    );
};
