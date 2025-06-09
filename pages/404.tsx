import type { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import BsideElements from '@/components/bside/BsideElements';
import Footer from '@/components/common/Footer';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import createPayloadEntry from '@/lib/payload/createPayloadEntry';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type { AboutBside } from '@/types/payload/payload-types';
import Headline from '@blocks/headlineBlock/Headline';
import RichText from '@blocks/richTextBlock/RichText';

interface Props {
    about: AboutBside;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const aboutResponse = await getPayloadResponse<AboutBside>(`/api/globals/about-bside/?locale=${locale}`);

    return {
        revalidate: 300,
        props: {
            about: aboutResponse,
            locale,
        },
    };
};

export default ({ about }: Props): ReactElement => {
    try {
        const router = useRouter();
        if (!router.asPath.startsWith('/_next') && !process.env.NEXT_PUBLIC_FRONTEND_URL.startsWith('http://localhost')) {
            createPayloadEntry('/api/not-found-pages', {
                slug: router.asPath,
            }).then();
        }
    } catch {
        /* empty */
    }

    return (
        <div className="flex min-h-screen flex-col justify-between">
            <NextHead />
            <HeaderBar />

            <main id="content">
                <div className="py-1" />

                <ContentWrapper>
                    <Headline title="Diese Seite wurde nicht gefunden nicht gefunden." teaser="404" level="h1" as="h2" />

                    <div className="py-4" />

                    <RichText
                        content={[
                            {
                                type: 'paragraph',
                                children: [
                                    {
                                        text: 'Falls du der Meinung bist, dass dies ein Fehler ist, dann ',
                                    },
                                    {
                                        type: 'link',
                                        linkType: 'custom',
                                        url: '/kontakt',
                                        children: [{ text: 'schreibe uns eine Nachricht' }],
                                    },
                                    { text: '.' },
                                ],
                            },
                        ]}
                    />

                    <div className="py-4" />

                    <Headline title="Bist du vielleicht an einer dieser Informationen interessiert?" teaser="" level="h2" as="h3" />

                    <div className="py-4" />

                    <BsideElements about={about} />
                </ContentWrapper>
            </main>

            <Footer />
        </div>
    );
};
