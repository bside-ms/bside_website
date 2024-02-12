import { Fragment } from 'react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import HeroImageSvg from '@/components/common/HeroImageSvg';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { getPublicClientUrl } from '@/lib/common/url';
import { getUpcomingEventsByOwner } from '@/lib/events';
import { getCirclesOfOrganisation, getOrganisation } from '@/lib/organisations';
import heroImageSvg from '@/public/assets/stickFigures/GmbH.svg';
import type { Circle, Event, Organisation } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';

interface Props {
    events: Array<Event>;
    organisation: Organisation;
    circles: Array<Circle>;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const organisationId = '647e60bd7054a955522b24cb';

    const events = await getUpcomingEventsByOwner(organisationId, 25, 'Organisation');
    const organisation = await getOrganisation(organisationId, locale!);

    return {
        revalidate: 60,
        props: {
            events,
            organisation,
            circles: await getCirclesOfOrganisation(organisation.id, locale!),
            locale,
        },
    };
};

export default ({ events, organisation, circles }: Props): ReactElement => {

    const { locale } = useRouter();

    return (
        <Fragment>
            <NextHead
                title={organisation.meta?.title ?? 'B-Side GmbH'}
                description={organisation.meta?.description ?? 'Die B-Side GmbH betreibt das soziokulturelle Zentrum am Münsteraner Mittelhafen.'}
                url={`${getPublicClientUrl(locale)}/quartier`}
            />

            <div className="min-h-screen flex flex-col justify-between">
                <HeaderBar />

                <main id="content">
                    <HeroImageSvg
                        imageSrc={heroImageSvg}
                        imageAlt=""
                        title={locale === 'de' ? 'Quartiersarbeit' : 'Neighbourhood Work'}
                    />

                    <ReusableBlockLayout
                        layout={organisation.layout}
                        circles={circles}
                        events={events}
                    />
                </main>

                <Footer />
            </div>

        </Fragment>
    );
};
