import { useLivePreview } from '@payloadcms/live-preview-react';
import type { GetStaticProps } from 'next';
import Image from 'next/image';
import useLocale from '@/lib/common/hooks/useLocale';
import type { ReactElement } from 'react';
import BsideElements from '@/components/bside/BsideElements';
import Footer from '@/components/common/Footer';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getPublicClientUrl } from '@/lib/common/url';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { AboutBside, Page } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';

interface Props {
    page: Page;
    about: AboutBside;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const pagesResponse = await getPayloadResponse<PaginatedDocs<Page>>(
        `/api/pages/?where[slug][equals]=bside&locale=${locale}`,
    );
    const page = pagesResponse.docs[0];

    const aboutResponse = await getPayloadResponse<AboutBside>(
        `/api/globals/about-bside/?locale=${locale}`,
    );

    if (page === undefined) {
        return { notFound: true };
    }

    return {
        revalidate: 60,
        props: {
            page,
            about: aboutResponse,
            locale,
        },
    };
};

export default ({ page, about }: Props): ReactElement => {
    const locale = useLocale();

    const { data: pageData } = useLivePreview<Page>({
        serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || '',
        depth: 1,
        initialData: page,
    });

    const { data: aboutData } = useLivePreview<AboutBside>({
        serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || '',
        depth: 1,
        initialData: about,
    });

    return (
        <div className="flex min-h-screen flex-col justify-between">
            <NextHead
                title={pageData.meta?.title ?? `${pageData.title} | B-Side Münster`}
                description={
                    pageData.meta?.description ??
                    'Selbstorganisierter und offener Ort der Möglichkeiten am Münsteraner Hafen'
                }
                url={`${getPublicClientUrl(locale)}/${pageData.slug}`}
            />
            <HeaderBar />

            <main id="content">
                <ContentWrapper>
                    <div>
                        <div className="xs:h-40 relative mb-8 mt-16 h-32 w-full md:h-52">
                            <Image
                                src="/assets/haus.png"
                                alt="Eine Grafik des Hauses"
                                fill={true}
                                className="object-contain"
                                priority={true}
                            />
                        </div>

                        <div className="text-center font-serif text-lg md:text-xl">
                            {aboutData.title}
                        </div>
                        <div className="text-center md:text-lg">{aboutData.textBody}</div>
                    </div>

                    <div className="mt-6">
                        <BsideElements about={aboutData} />
                    </div>
                </ContentWrapper>

                <div className="my-4" />

                <ReusableBlockLayout layout={pageData.layout} />
            </main>

            <Footer />
        </div>
    );
};
