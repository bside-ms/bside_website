
import type { ReactElement } from 'react';
import ContentWrapper from 'components/common/ContentWrapper';
import Footer from 'components/common/Footer';
import HeaderBar from 'components/common/HeaderBar';
import ContactForm from 'components/contactForm/ContactForm';
import Navigation from 'components/navigation/Navigation';

export default (): ReactElement => {

    return (
        <>
            <Navigation />

            <HeaderBar />

            <ContentWrapper>
                <ContactForm />
            </ContentWrapper>

            <Footer />
        </>
    );
};
