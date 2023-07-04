import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContactForm from '@/components/contactForm/ContactForm';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import HeaderBar from '@/components/Layout/Header/HeaderBar';
import MobileNavigation from '@/components/Layout/Navigation/MobileNavigation';

export default (): ReactElement => {

    return (
        <main className="min-h-screen flex flex-col justify-between">
            <MobileNavigation />

            <HeaderBar />

            <ContentWrapper>
                <ContactForm />
            </ContentWrapper>

            <Footer />
        </main>
    );
};
