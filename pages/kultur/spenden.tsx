import { Fragment } from 'react';
import { clsx } from 'clsx';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import Footer from '@/components/common/Footer';
import HeroText from '@/components/common/HeroText';
import FundraisingBox from '@/components/fundraisingbox/fundrasingBox';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getPublicClientUrl } from '@/lib/common/url';
import { getOrganisation } from '@/lib/organisations';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Organisation, Page } from '@/types/payload/payload-types';
import ReusableBlockLayoutPartial from '@blocks/reusableLayout/ReusableBlockLayoutPartial';

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

const amountOfBlocksBeforeFundraisingBox = 1;

export default ({ page, organisation }: Props): ReactElement => {
    const { locale } = useRouter();
    const { isMd } = useBreakpointContext();

    return (
        <Fragment>
            <NextHead
                title={page.meta?.title ?? organisation.meta?.title ?? 'B-Side Kultur e.V.'}
                description={
                    page.meta?.description ??
                    organisation.meta?.description ??
                    'Der B-Side Kultur e.V. ist der gemeinnützige Kulturverein innerhalb der B-Side.'
                }
                url={`${getPublicClientUrl(locale)}/kultur/spenden`}
            />

            <div className="flex min-h-screen flex-col justify-between">
                <HeaderBar />

                <main id="content">
                    <HeroText title="B-Side Kultur e.V." />

                    <ReusableBlockLayoutPartial
                        page={page}
                        start={0}
                        end={amountOfBlocksBeforeFundraisingBox}
                    />

                    <ContentWrapper
                        className={clsx('mb-4 border-2 border-black p-2', isMd && '!-mt-0')}
                    >
                        <FundraisingBox hash="vfoeov50wdhmh4zz" />
                    </ContentWrapper>

                    <ReusableBlockLayoutPartial
                        page={page}
                        start={amountOfBlocksBeforeFundraisingBox}
                    />
                </main>

                <Footer />
            </div>
        </Fragment>
    );
};
