import hirestime from 'hirestime';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import { RenderBlocks } from '@/components/Blocks/RenderBlocks';
import Footer from '@/components/common/Footer';
import ContentDivider from '@/components/Layout/ContentDivider';
import HeaderBarContainer from '@/components/Layout/Header/HeaderBarContainer';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import logger from '@/lib/common/logger';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Circle } from '@/types/payload/payload-types';

interface Props {
    circle: Circle;
}

export const getStaticPaths: GetStaticPaths = async () => {

    const pages = await getPayloadResponse<PaginatedDocs<Circle>>('/api/circles/?limit=100');

    const paths = pages.docs.map(({ id }) => ({
        params: {
            slug: [id],
        },
    }));

    return {
        fallback: false,
        paths,
    };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {

    const getElapsed = hirestime();

    const rawSlug = params?.slug;
    logger.info('raw: {}', rawSlug);

    if (rawSlug === undefined) {
        return { notFound: true };
    }

    const slug = typeof rawSlug === 'string' ? rawSlug : rawSlug.join('/');
    logger.info('joined: {}', slug);

    if (isEmptyString(slug)) {
        return { notFound: true };
    }

    const circlesResponse = await getPayloadResponse<PaginatedDocs<Circle>>('/api/circles/?limit=100');

    const circle = circlesResponse.docs.find(doc => {
        return doc.id === `${slug}`;
    });

    if (circle === undefined) {
        return { notFound: true };
    }

    logger.info({
        message: 'timing',
        path: `/circles/[${slug}]`,
        time: getElapsed.seconds(),
    });

    return {
        revalidate: 60,
        props: {
            circle,
        },
    };
};

export default ({ circle }: Props): ReactElement => {

    return (
        <main className="min-h-screen flex flex-col justify-between">
            <HeaderBarContainer />

            <ContentDivider />

            <RenderBlocks blocks={circle.layout} />

            <Footer />
        </main>
    );
};
