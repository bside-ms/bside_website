import type { GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import BsideElements from '@/components/bside/BsideElements';
import Footer from '@/components/common/Footer';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getPublicClientUrl } from '@/lib/common/url';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Page } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';

interface Props {
    page: Page;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {

    const pagesResponse = await getPayloadResponse<PaginatedDocs<Page>>('/api/pages/?where[slug][equals]=bside');
    const page = pagesResponse.docs[0];

    if (page === undefined) {
        return { notFound: true };
    }

    return {
        revalidate: 60,
        props: {
            page,
            locale,
        },
    };
};

export default ({ page }: Props): ReactElement => {
    const { locale } = useRouter();

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <NextHead
                title={page.meta?.title ?? `${page.title} | B-Side Münster`}
                description={page.meta?.description ?? 'Selbstorganisierter und offener Ort der Möglichkeiten am Münsteraner Hafen'}
                url={`${getPublicClientUrl(locale)}/${page.slug}`}
            />
            <HeaderBar />

            <main id="content">
                <ContentWrapper>
                    <div>
                        <div className="w-full h-32 xs:h-40 md:h-52 relative mt-16 mb-8">
                            <Image
                                src="/assets/haus.png"
                                alt="Eine Grafik des Hauses"
                                fill={true}
                                className="object-contain"
                                priority={true}
                            />
                        </div>

                        <div className="font-serif text-lg md:text-xl text-center">
                            Die B-Side ist ein Haus,<br />
                            ein Kollektiv, eine Idee.
                        </div>
                        <div className="md:text-lg text-center">
                            Erfahre hier alles was du wissen willst.
                        </div>
                    </div>

                    <div className="mt-6">
                        <BsideElements />
                    </div>
                </ContentWrapper>

                <div className="my-4" />

                <ReusableBlockLayout
                    layout={page.layout}
                />
            </main>

            <Footer />
        </div>
    );
};
