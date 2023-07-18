import hirestime from 'hirestime';
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import { RenderBlocks } from '@/components/Blocks/RenderBlocks';
import Footer from '@/components/common/Footer';
import ContentDivider from '@/components/Layout/ContentDivider';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import HeaderBar from '@/components/Layout/Header/HeaderBar';
import MobileNavigation from '@/components/Layout/Navigation/MobileNavigation';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import logger from '@/lib/common/logger';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Circle } from '@/types/payload/payload-types';

interface Props {
    page?: Circle;
}

export const getStaticPaths: GetStaticPaths = async () => {

    const pages = await getPayloadResponse<PaginatedDocs<Circle>>('/api/circles/?limit=100');

    const paths = pages.docs.map(({ id }) => ({
        params: {
            slug: [id],
        },
    }));

    return {
        fallback: true,
        paths,
    };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {

    const getElapsed = hirestime();

    const rawSlug = context.params?.slug;
    logger.info('raw: {}', rawSlug);

    if (rawSlug === undefined) {
        return { notFound: true };
    }

    const slug = typeof rawSlug === 'string' ? rawSlug : rawSlug.join('/');
    logger.info('joined: {}', slug);

    if (isEmptyString(slug)) {
        return { notFound: true };
    }

    const pagesResponse = await getPayloadResponse<PaginatedDocs<Circle>>('/api/circles/?limit=100');

    const page = pagesResponse.docs.find(doc => {
        return doc.id === `${slug}`;
    });

    if (page === undefined) {
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
            page,
        },
    };
};

export default ({ page }: Props): ReactElement => {

    if (!page) {
        return <main className="min-h-screen flex flex-col justify-between" />;
    }

    return (
        <main className="min-h-screen flex flex-col justify-between">
            <MobileNavigation />
            <HeaderBar
                disableLeftLogo={false}
                headerMenu={true}
            />
            <ContentDivider />

            <ContentWrapper>
                <div className="mb-2 mt-4 md:mb-3">
                    <div className="font-bold font-serif text-2xl md:text-4xl">
                        {page.name}
                    </div>

                    <div id="blocks">
                        <RenderBlocks blocks={page.layout} />
                    </div>
                </div>
            </ContentWrapper>

            <Footer />
        </main>
    );
};
