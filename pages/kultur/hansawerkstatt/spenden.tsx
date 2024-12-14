import { Fragment } from 'react';
import { clsx } from 'clsx';
import type { GetStaticProps } from 'next';
import useLocale from '@/lib/common/hooks/useLocale';
import type { ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import Footer from '@/components/common/Footer';
import FundraisingBox from '@/components/fundraisingbox/fundrasingBox';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getPublicClientUrl } from '@/lib/common/url';
import { getCircle } from '@/lib/organisations';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Circle, Page } from '@/types/payload/payload-types';
import ReusableBlockLayoutPartial from '@blocks/reusableLayout/ReusableBlockLayoutPartial';

interface Props {
    page: Page;
    circle: Circle;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const circle = await getCircle('647e60e77054a955522b24ec', locale!);

    const pagesResponse = await getPayloadResponse<PaginatedDocs<Page>>(
        `/api/pages/?where[slug][equals]=hansawerkstatt-spenden&locale=${locale}`,
    );
    const page = pagesResponse.docs[0];

    return {
        revalidate: 60,
        props: {
            circle,
            page: page!,
            locale,
        },
    };
};

const amountOfBlocksBeforeFundraisingBox = 3;

export default ({ page, circle }: Props): ReactElement => {
    const locale = useLocale();
    const { isMd } = useBreakpointContext();

    return (
        <Fragment>
            <NextHead
                title={circle.meta?.title ?? 'Kultur e.V.'}
                description={
                    circle.meta?.description ??
                    'Der B-Side Kultur e.V. ist der gemeinnützige Kulturverein innerhalb der B-Side.'
                }
                url={`${getPublicClientUrl(locale)}/kultur`}
            />

            <div className="flex min-h-screen flex-col justify-between">
                <HeaderBar />

                <main id="content">
                    <ReusableBlockLayoutPartial
                        page={page}
                        start={0}
                        end={amountOfBlocksBeforeFundraisingBox}
                    />

                    <ContentWrapper
                        className={clsx('mb-4 border-2 border-black p-2', isMd && '!-mt-0')}
                    >
                        <FundraisingBox hash="cio122rq7zhvqwaq" />
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
