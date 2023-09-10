import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContactForm from '@/components/contactForm/ContactForm';
import ContentDivider from '@/components/layout/ContentDivider';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';

export const getStaticProps: GetStaticProps = () => {
    return {
        revalidate: 300,
        props: {},
    };
};

export default (): ReactElement => {

    return (
        <main className="min-h-screen flex flex-col justify-between">
            <HeaderBar />

            <ContentDivider />

            <main id="content">
                <ContentWrapper>
                    <ContactForm />
                </ContentWrapper>
            </main>

            <Footer />
        </main>
    );
};
