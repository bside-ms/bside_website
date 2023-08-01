import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContactForm from '@/components/contactForm/ContactForm';
import ContentDivider from '@/components/Layout/ContentDivider';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import HeaderBarContainer from '@/components/Layout/Header/HeaderBarContainer';

export default (): ReactElement => {

    return (
        <main className="min-h-screen flex flex-col justify-between">
            <HeaderBarContainer />

            <ContentDivider />

            <ContentWrapper>
                <ContactForm />
            </ContentWrapper>

            <Footer />
        </main>
    );
};
