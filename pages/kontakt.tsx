import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContactForm from '@/components/contactForm/ContactForm';
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
        <main className="flex min-h-screen flex-col justify-between">
            <HeaderBar />

            <main id="content">
                <ContentWrapper>
                    <ContactForm />
                </ContentWrapper>
            </main>

            <Footer />
        </main>
    );
};
