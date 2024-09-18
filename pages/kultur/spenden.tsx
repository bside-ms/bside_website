import { Fragment } from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import Footer from '@/components/common/Footer';
import HeroImageSvg from '@/components/common/HeroImageSvg';
import FundraisingBox from '@/components/fundraisingbox/fundrasingBox';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getPublicClientUrl } from '@/lib/common/url';
import { getOrganisation } from '@/lib/organisations';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import kulturImageSvg from '@/public/assets/stickFigures/Kultur.svg';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Organisation, Page } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';

interface Props {
    page: Page;
    organisation: Organisation;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const organisation = await getOrganisation('647e60a67054a955522b24ad', locale!);

    const pagesResponse = await getPayloadResponse<PaginatedDocs<Page>>(
        `/api/pages/?where[slug][equals]=spenden&locale=${locale}`,
    );
    const page = pagesResponse.docs[0];

    return {
        revalidate: 60,
        props: {
            organisation,
            page: page!,
            locale,
        },
    };
};

const FirstReusableBlockLayout = ({ page }: { page: Page }): ReactElement => {
    if (!page.layout) {
        return <div />;
    }

    const firstTwoElements = page.layout.slice(0, 2);

    return <ReusableBlockLayout layout={firstTwoElements} />;
};

const SecondReusableBlockLayout = ({ page }: { page: Page }): ReactElement => {
    if (!page.layout) {
        return <div />;
    }

    const firstTwoElements = page.layout.slice(2);

    return <ReusableBlockLayout layout={firstTwoElements} />;
};

export default ({ page, organisation }: Props): ReactElement => {
    const { locale } = useRouter();
    const { isMd } = useBreakpointContext();

    return (
        <Fragment>
            <NextHead
                title={organisation.meta?.title ?? 'Kultur e.V.'}
                description={
                    organisation.meta?.description ??
                    'Der B-Side Kultur e.V. ist der gemeinnützige Kulturverein innerhalb der B-Side.'
                }
                url={`${getPublicClientUrl(locale)}/kultur`}
            />

            <div className="flex min-h-screen flex-col justify-between">
                <HeaderBar />

                <main id="content">
                    <HeroImageSvg
                        imageSrc={kulturImageSvg}
                        imageAlt=""
                        title="B-Side Kultur e.V."
                    />

                    <FirstReusableBlockLayout page={page} />

                    <ContentWrapper className={isMd ? '!-mt-0' : ''}>
                        <FundraisingBox />
                    </ContentWrapper>

                    <SecondReusableBlockLayout page={page} />
                </main>

                <Footer />
            </div>
        </Fragment>
    );
};
