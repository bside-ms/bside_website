import { useLivePreview } from '@payloadcms/live-preview-react';
import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import HeaderBar from '@/components/layout/header/HeaderBar';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type { EventArchive, Media } from '@/types/payload/payload-types';
import MediaBlock from '@blocks/mediaBlock/MediaBlock';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';

interface Props {
    page: EventArchive;
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const page = await getPayloadResponse<EventArchive>(`/api/globals/event-archive/?locale=${locale}`);

    return {
        revalidate: 60,
        props: {
            page,
            locale,
        },
    };
};

export default ({ page }: Props): ReactElement => {
    const { data: pageData } = useLivePreview({
        serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || '',
        depth: 1,
        initialData: page,
    });

    const media = pageData.headerImage as Media | undefined;

    return (
        <div className="flex min-h-screen flex-col justify-between">
            <HeaderBar />

            <main id="content">
                {media !== undefined && media.url !== undefined && <MediaBlock size="wide" media={pageData.headerImage as Media} />}
                <div className="my-6" />

                <ReusableBlockLayout
                    layout={pageData.layout}
                    eventsOnPage={{
                        dateDirection: 'past',
                        perPage: 20,
                        withPagination: true,
                        withFilters: true,
                    }}
                />
            </main>

            <Footer />
        </div>
    );
};
