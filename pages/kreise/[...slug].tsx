import { Fragment } from 'react';
import { kebabCase } from 'lodash';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContentDivider from '@/components/Layout/ContentDivider';
import HeaderBar from '@/components/Layout/Header/HeaderBar';
import NextHead from '@/components/Layout/Next/NextHead';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { getPublicClientUrl } from '@/lib/common/url';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Circle } from '@/types/payload/payload-types';
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

    // Fetch basic infos.
    const organisation = typeof circle.organisation === 'string' ? null : circle.organisation;
    const organisationName = organisation?.shortName ?? 'kreise';
    const circleName = kebabCase(circle.name);

    // Fetch metadata.
    const metaTitle = circle.meta !== undefined && !isEmptyString(circle.meta.title) ?
        circle.meta.title : `${circle.name} ${organisation && `| ${organisation.name}`}`;
    const metaDescription = circle.meta !== undefined && !isEmptyString(circle.meta.description) ?
        circle.meta.description : `${circle.name} ${organisation && `| ${organisation.name} | B-Side`}`;
    const canonialUrl = `${getPublicClientUrl()}/${organisationName}/${circleName}`;

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
