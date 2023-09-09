import type { ReactElement } from 'react';
import BsideElements from '@/components/bside/BsideElements';
import Footer from '@/components/common/Footer';
import ContentDivider from '@/components/layout/ContentDivider';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import Headline from '@blocks/headlineBlock/Headline';
import RichText from '@blocks/richTextBlock/RichText';

export default (): ReactElement => (
    <div className="min-h-screen flex flex-col justify-between">
        <NextHead />
        <HeaderBar />

        <ContentDivider />

        <main id="content">
            <div className="py-1" />

            <ContentWrapper>
                <Headline
                    title="Diese Seite wurde nicht gefeunden nicht gefunden."
                    teaser="404"
                    level="h1"
                    as="h2"
                />

                <div className="py-4" />

                <RichText
                    content={[{
                        type: 'paragraph',
                        children: [
                            { text: 'Falls du der Meinung bist, dass dies ein Fehler ist, dann ' },
                            {
                                type: 'link',
                                linkType: 'custom',
                                url: '/kontakt',
                                children: [{ text: 'schreibe uns eine Nachricht' }],
                            },
                            { text: '.' },
                        ],
                    }]}
                />

                <div className="py-4" />

                <Headline
                    title="Bist du vielleicht an einer dieser Informationen interessiert?"
                    teaser=""
                    level="h2"
                    as="h3"
                />

                <div className="py-4" />

                <BsideElements />

            </ContentWrapper>
        </main>

        <Footer />
    </div>
);
