import { Fragment } from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useBreakpointContext } from '@/components/common/BreakpointContext';
import Footer from '@/components/common/Footer';
import HeroImageSvg from '@/components/common/HeroImageSvg';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getPublicClientUrl } from '@/lib/common/url';
import { getCirclesOfOrganisation, getOrganisation } from '@/lib/organisations';
import kulturImageSvg from '@/public/assets/stickFigures/Kultur.svg';
import type { Circle, Organisation } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';
import SubNavigation from '@blocks/subNavigation/SubNavigation';
import SubNavigationLink from '@blocks/subNavigation/SubNavigationLink';
import { StaticImageData } from 'next/image';

interface Props {
    organisation: Organisation;
    circles: Array<Circle>;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const organisation = await getOrganisation('647e60a67054a955522b24ad', locale!);

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
                        imageSrc={kulturImageSvg as StaticImageData}
                        imageAlt=""
                        title={locale === 'de' ? 'Kultur & Bildung' : 'Culture & Education'}
                    />

                    <SubNavigation>
                        <SubNavigationLink
                            title={locale === 'de' ? 'Arbeitskreise' : 'Working Groups'}
                            anchor="kreise"
                        />
                        <SubNavigationLink
                            title={locale === 'de' ? 'Veranstaltungen' : 'Events'}
                            anchor="veranstaltungen"
                        />
                        {isMd && (
                            <SubNavigationLink
                                title={locale === 'de' ? 'Unterstützen' : 'Support Us'}
                                anchor="unterstuetzen"
                                teaser={true}
                            />
                        )}
                    </SubNavigation>

                    <ReusableBlockLayout
                        layout={organisation.layout}
                        circles={circles}
                        eventsOnPage={{
                            ownerId: organisation.id,
                            filter: 'Organisation',
                            perPage: 10,
                            pagination: true,
                        }}
                    />
                </main>

                <Footer />
            </div>
        </Fragment>
    );
};
