import { Fragment } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import type { ReactElement } from 'react';
import { RenderBlocks } from '@/components/Blocks/RenderBlocks';
import Footer from '@/components/common/Footer';
import ContentDivider from '@/components/Layout/ContentDivider';
import HeaderBarContainer from '@/components/Layout/Header/HeaderBarContainer';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { toKebabCase } from '@/lib/common/toKebabCase';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Circle, Organisation } from '@/types/payload/payload-types';

interface Props {
    circle: Circle;
}

export const getStaticPaths: GetStaticPaths = async () => {

    const pages = await getPayloadResponse<PaginatedDocs<Circle>>('/api/circles/?limit=100');

    const paths = pages.docs.map(({ name }) => ({
        params: {
            slug: [toKebabCase(name)],
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
        return toKebabCase(doc.name) === `${slug}`;
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

    const organisation = typeof circle.organisation === 'string' ? null : circle.organisation as Organisation;
    const organisationName = organisation?.shortName ?? 'kreise';
    const circleName = toKebabCase(circle.name);

    return (
        <Fragment>
            <Head>
                <link
                    rel="canonical"
                    href={`https://b-side.ovh/${organisationName}/${circleName}`}
                    key="canonical"
                />
                <title>
                    {`${circle.name} ${organisation && `| ${organisation.name}`}`}
                </title>
            </Head>

            <main className="min-h-screen flex flex-col justify-between">
                <HeaderBarContainer />

                <ContentDivider />

                <RenderBlocks blocks={circle.layout} />

                <Footer />
            </main>
        </Fragment>
    );
};
