import { useLivePreview } from '@payloadcms/live-preview-react';
import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import HeroImageSvg from '@/components/common/HeroImageSvg';
import HeaderBar from '@/components/layout/header/HeaderBar';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import heroImage from '@/public/assets/stickFigures/Veranstaltungen.svg';
import type { EventPage } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';

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
    const { locale } = useRouter();

    const { data: pageData } = useLivePreview({
        serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || '',
        depth: 1,
        initialData: page,
    });

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <HeaderBar />

            <main id="content">
                <HeroImageSvg
                    imageSrc={heroImage}
                    imageAlt=""
                    title={locale === 'de' ? 'Veranstaltungen' : 'Events'}
                />

                <ReusableBlockLayout
                    layout={pageData.layout}
                    eventsOnPage={{
                        filter: 'Overview',
                        perPage: 10,
                        pagination: true,
                    }}
                />
            </main>

            <Footer />
        </div>
    );
};
