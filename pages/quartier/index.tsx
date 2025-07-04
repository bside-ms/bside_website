import { Fragment } from 'react';
import type { GetStaticProps } from 'next';
import useLocale from '@/lib/common/hooks/useLocale';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import HeroImageSvg from '@/components/common/HeroImageSvg';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getPublicClientUrl } from '@/lib/common/url';
import { getCirclesOfOrganisation, getOrganisation } from '@/lib/organisations';
import heroImageSvg from '@/public/assets/stickFigures/GmbH.svg';
import type { Circle, Organisation } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';
import { StaticImageData } from 'next/image';

interface Props {
    organisation: Organisation;
    circles: Array<Circle>;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const organisation = await getOrganisation('647e60bd7054a955522b24cb', locale!);

    return {
        revalidate: 60,
        props: {
            organisation,
            circles: await getCirclesOfOrganisation(organisation.id, locale!),
            locale,
        },
    };
};

export default ({ organisation, circles }: Props): ReactElement => {
    const locale = useLocale();

    return (
        <Fragment>
            <NextHead
                title={organisation.meta?.title ?? 'B-Side GmbH'}
                description={
                    organisation.meta?.description ?? 'Die B-Side GmbH betreibt das soziokulturelle Zentrum am Münsteraner Mittelhafen.'
                }
                url={`${getPublicClientUrl(locale)}/quartier`}
            />

            <div className="flex min-h-screen flex-col justify-between">
                <HeaderBar />

                <main id="content">
                    <HeroImageSvg
                        imageSrc={heroImageSvg as StaticImageData}
                        imageAlt=""
                        title={locale === 'de' ? 'Quartiersarbeit' : 'Neighbourhood Work'}
                    />

                    <ReusableBlockLayout
                        layout={organisation.layout}
                        circles={circles}
                        eventsOnPage={{
                            ownerId: organisation.id,
                            filter: 'Organisation',
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
