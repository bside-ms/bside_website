import Link from 'next/link';
import type { ReactElement, ReactNode } from 'react';

interface FooterProps {
    children?: ReactNode;
}

const Footer = ({ children }: FooterProps): ReactElement => {
    return (
        <footer className="mb-auto" key="footer">
            <div className="bg-black mt-5 py-2">
                <div className="py-auto text-center text-white font-bold font-serif">
                    <Link
                        href="/impressum"
                        className="text-md md:text-lg font-bold font-serif"
                    >
                        Impressum
                    </Link>
                    <span className="px-2">|</span>
                    <Link
                        href="/datenschutz"
                        className="text-md md:text-lg font-bold font-serif"
                    >
                        Datenschutz
                    </Link>
                    <span className="px-2">|</span>
                    <Link
                        href="/kontakt"
                        className="text-md md:text-lg font-bold font-serif"
                    >
                        Kontakt
                    </Link>
                </div>
            </div>

            {children}

            <div className="px-2 my-4 flex justify-center text-center font-serif text-sm">
                Platzhalter für Footer-Text
            </div>
        </footer>
    );
};

export default Footer;
