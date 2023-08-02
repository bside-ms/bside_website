import { Fragment } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContentDivider from '@/components/Layout/ContentDivider';
import HeaderBar from '@/components/Layout/Header/HeaderBar';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import { toKebabCase } from '@/lib/common/toKebabCase';
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

    const organisation = typeof circle.organisation === 'string' ? null : circle.organisation;
    const organisationName = organisation?.shortName ?? 'kreise';
    const circleName = toKebabCase(circle.name);

    const metaTitle = `${circle.name} ${organisation && `| ${organisation.name}`}`;

    // ToDo: Add Meta-Description to CMS.

    return (
        <Fragment>
            <Head>
                <link
                    rel="canonical"
                    href={`${getPublicClientUrl()}/${organisationName}/${circleName}`}
                    key="canonical"
                />

                <title>{metaTitle}</title>
                <meta property="og:title" content={metaTitle} key="title" />
                <meta name="apple-mobile-web-app-title" content={metaTitle} />
                <meta name="twitter:title" content={metaTitle} />
            </Head>

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
