import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import FrontPageHero from '@/components/frontPage/FrontPageHero';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Page, StartPage } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';

interface Props {
    page: Page;
    homePage: StartPage;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const pagesResponse = await getPayloadResponse<PaginatedDocs<Page>>(
        `/api/pages/?where[slug][equals]=home&locale=${locale}`,
    );
    const page = pagesResponse.docs[0];

    const indexResponse = await getPayloadResponse<StartPage>(
        `/api/globals/start-page/?locale=${locale}`,
    );

    if (page === undefined) {
        return { notFound: true };
    }

    return {
        revalidate: 60,
        props: {
            page,
            homePage: indexResponse,
            locale,
        },
    };
};

export default ({ page, homePage }: Props): ReactElement => {
    return (
        <div className="flex min-h-screen flex-col justify-between">
            <NextHead />

            <HeaderBar />

            <main id="content">
                <FrontPageHero
                    title={homePage.title}
                    textBody={homePage.textBody}
                    buttonText={homePage.buttonText}
                />

                <div className="py-2 md:py-4" />

                <ReusableBlockLayout
                    layout={page.layout}
                    eventsOnPage={{
                        filter: 'Home',
                        perPage: 5,
                    }}
                />
            </main>

            <Footer />
        </div>
    );
};
