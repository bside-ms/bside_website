import { Fragment } from 'react';
import Link from 'next/link';
import type { ReactElement, ReactNode } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';

interface FooterProps {
    children?: ReactNode;
}

const Footer = ({ children }: FooterProps): ReactElement => {
    return (
        <Fragment>
            <ContentWrapper />
            <footer className="mb-auto" key="footer">
                <div className="bg-black mt-5 py-2">
                    <div className="py-auto text-center text-white font-bold font-serif">
                        <Link
                            href="/impressum"
                            aria-label="Alle rechtlichen Angaben sind hier zu finden"
                            className="text-md md:text-lg font-bold font-serif hover:text-orange-500"
                        >
                            Impressum
                        </Link>
                        <span className="px-2">|</span>
                        <Link
                            href="/datenschutz"
                            aria-label="Erfahre mehr darüber, wie wir mit deinen Daten umgehen"
                            className="text-md md:text-lg font-bold font-serif hover:text-orange-500"
                        >
                            Datenschutz
                        </Link>
                        <span className="px-2">|</span>
                        <Link
                            href="/kontakt"
                            aria-label="Trete mit uns in den Kontakt"
                            className="text-md md:text-lg font-bold font-serif hover:text-orange-500"
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
        </Fragment>
    );
};

export default Footer;
