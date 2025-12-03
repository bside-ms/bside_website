import { Fragment } from 'react';
import type { GetStaticProps } from 'next';
import useLocale from '@/lib/common/hooks/useLocale';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getPublicClientUrl } from '@/lib/common/url';
import { getCircle } from '@/lib/organisations';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Circle, Media, Page } from '@/types/payload/payload-types';
import Image from 'next/image';
import Headline from '@blocks/headlineBlock/Headline';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';
import { kebabCase } from 'lodash-es';

interface Props {
    page: Page;
    circle: Circle;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const circle = await getCircle('647e60e77054a955522b24ec', locale!);

    const pagesResponse = await getPayloadResponse<PaginatedDocs<Page>>(`/api/pages/?where[slug][equals]=alles-auf-neu&locale=${locale}`);
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

export default ({ page, circle }: Props): ReactElement => {
    const locale = useLocale();

    const organisation = typeof circle.organisation === 'string' ? null : circle.organisation;

    // Circle
    const imageUrl: string =
        (circle.circleImage ?? null) !== null ? (circle.circleImage as Media).url! : `/assets/stickFigures/${circle.fallbackImage}.svg`;

    return (
        <Fragment>
            <NextHead
                title={page.meta?.title ?? circle.meta?.title ?? 'Kultur e.V.'}
                description={page.meta?.description ?? 'Der B-Side Kultur e.V. ist der gemeinnützige Kulturverein innerhalb der B-Side.'}
                url={`${getPublicClientUrl(locale)}/hansawerkstatt/alles-auf-neu`}
            />

            <div className="flex min-h-screen flex-col justify-between">
                <HeaderBar />

                <main id="content">
                    <div className="mx-auto w-full text-center lg:w-[54rem] xl:w-[70rem]">
                        <div className="relative h-40 w-full md:h-52 lg:mt-4">
                            <Image
                                src={imageUrl}
                                alt=""
                                fill={true}
                                className={(circle.circleImage ?? null) !== null ? 'object-cover lg:rounded-xl' : 'object-fill'}
                                priority={true}
                            />
                        </div>

                        <div className="mt-2 bg-black pb-4 text-white">
                            <ContentWrapper className="!-mb-2 !pb-0 pt-2">
                                <Headline
                                    title={page.title}
                                    teaser={circle?.name ?? null}
                                    teaserLink={
                                        (organisation?.shortName ?? null) !== null
                                            ? `/${organisation!.shortName}/${kebabCase(circle.name)}`
                                            : null
                                    }
                                    level="h1"
                                    as="h3"
                                />
                            </ContentWrapper>
                        </div>
                    </div>

                    <ReusableBlockLayout
                        layout={page.layout}
                        eventsOnPage={{
                            ownerId: circle.id,
                            filter: 'Circle',
                            perPage: 10,
                            withPagination: true,
                            withFilters: true,
                        }}
                    />
                </main>

                <Footer />
            </div>
        </Fragment>
    );
};
