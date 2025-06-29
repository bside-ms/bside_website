import { useLivePreview } from '@payloadcms/live-preview-react';
import type { GetStaticProps } from 'next';
import useLocale from '@/lib/common/hooks/useLocale';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import HeroImageSvg from '@/components/common/HeroImageSvg';
import HeaderBar from '@/components/layout/header/HeaderBar';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import heroImage from '@/public/assets/stickFigures/Veranstaltungen.svg';
import type { EventPage } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';
import { StaticImageData } from 'next/image';

interface Props {
    page: EventPage;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const page = await getPayloadResponse<EventPage>(`/api/globals/event-page/?locale=${locale}`);

    return {
        revalidate: 60,
        props: {
            page,
            locale,
        },
    };
};

export default ({ page }: Props): ReactElement => {
    const locale = useLocale();

    const { data: pageData } = useLivePreview({
        serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || '',
        depth: 1,
        initialData: page,
    });

    return (
        <div className="flex min-h-screen flex-col justify-between">
            <HeaderBar />

            <main id="content">
                <HeroImageSvg imageSrc={heroImage as StaticImageData} imageAlt="" title={locale === 'de' ? 'Veranstaltungen' : 'Events'} />

                <ReusableBlockLayout
                    layout={pageData.layout}
                    eventsOnPage={{
                        filter: 'Overview',
                        withPagination: true,
                        perPage: 20,
                        withFilters: true,
                    }}
                />
            </main>

            <Footer />
        </div>
    );
};
