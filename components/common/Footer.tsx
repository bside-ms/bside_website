import type { ReactElement } from 'react';
import ContentWrapper from 'components/common/ContentWrapper';

const Footer = (): ReactElement => {

    return (
        <>
            <div className="bg-black mt-5">
                <ContentWrapper>
                    <div className="py-5 text-center text-white font-bold font-serif text-lg">
                        Impressum | Datenschutz | AGB
                    </div>
                </ContentWrapper>
            </div>

            <div className="px-2 my-4 flex justify-center text-center font-serif text-sm">
                B-Side GmbH | B-Side Kultur e.V. | B-Side e.V.
            </div>
        </>
    );
};

export default Footer;
