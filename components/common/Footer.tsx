import type { ReactElement } from 'react';

const Footer = (): ReactElement => {
    return (
        <footer className="mb-auto">
            <div className="bg-black mt-5">
                <div className="py-5 text-center text-white font-bold font-serif text-lg">
                    Impressum | Datenschutz | AGB
                </div>
            </div>

            <div className="px-2 my-4 flex justify-center text-center font-serif text-sm">
                B-Side GmbH | B-Side Kultur e.V. | B-Side e.V.
            </div>
        </footer>
    );
};

export default Footer;
