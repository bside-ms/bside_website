import type { GetServerSideProps } from 'next';
import type { ReactElement } from 'react';
import ContentWrapper from 'components/common/ContentWrapper';
import Footer from 'components/common/Footer';
import HeaderBar from 'components/common/HeaderBar';
import Navigation from 'components/navigation/Navigation';
import isEmptyString from 'lib/common/helper/isEmptyString';
import getPayloadResponse from 'lib/payload/getPayloadResponse';
import serializeRichTextToHtml from 'lib/payload/serializeRichTextToHtml';
import type PaginatedDocs from 'types/payload/PaginatedDocs';
import type { Page } from 'types/payload/payload-types';

interface Props {
    page: Page;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {

    if (context.params === undefined) {
        return { notFound: true };
    }

    const slug = context.params.slug as string | undefined;

    if (isEmptyString(slug)) {
        return { notFound: true };
    }

    const pagesResponse = await getPayloadResponse<PaginatedDocs<Page>>(`/api/pages/?where[slug][equals]=${slug}`);

    const page = pagesResponse.docs[0];

    if (page === undefined) {
        return { notFound: true };
    }

    return { props: { page } };
};

export default ({ page }: Props): ReactElement => {

    return (
        <>
            <Navigation />

            <HeaderBar />

            <div className="mt-12">
                <ContentWrapper>
                    <div className="px-8 mb-2 md:mb-3">
                        <div className="font-bold font-serif text-2xl md:text-4xl">
                            {page.title}
                        </div>

                        <div className="mt-1 text-sm md:text-lg md:mt-3">
                            {serializeRichTextToHtml(page.richText)}
                        </div>
                    </div>
                </ContentWrapper>
            </div>

            <Footer />
        </>
    );
};
