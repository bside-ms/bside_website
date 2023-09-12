import { Fragment } from 'react';
import Link from 'next/link';
import type { ReactElement, ReactNode } from 'react';
import { SiGithub, SiInstagram } from 'react-icons/si';
import ContentWrapper from '@/components/layout/ContentWrapper';

interface FooterProps {
    children?: ReactNode;
}

const FooterLink = ({ linkUrl, linkText }: {linkUrl: string, linkText: string}): ReactElement => (
    <div className="my-2">
        <Link
            href={linkUrl}
            aria-label="Die B-Side auf GitHub"
            target="_blank"
            className="italic hover:text-orange-500"
        >
            <span className="underline underline-offset-4">
                {linkText}
            </span>
        </Link>
    </div>
);

const GithubLink = (): ReactElement => (
    <div className="my-2">
        <Link
            href="https://github.com/bside-ms/"
            aria-label="Die B-Side auf GitHub"
            target="_blank"
            className="italic hover:text-orange-500"
        >
            <SiGithub className="inline" />
            <span className="underline underline-offset-4 ml-1">
                Github
            </span>
        </Link>
    </div>
);

const Instagram = (): ReactElement => (
    <div className="my-2">
        <Link
            href="https://instagram.com/bsidemuenster/"
            aria-label="Die B-Side bei Instagram"
            target="_blank"
            className="italic hover:text-orange-500"
        >
            <SiInstagram className="inline" />
            <span className="underline underline-offset-4 ml-1">
                Instagram
            </span>
        </Link>
    </div>
);

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

                {/* Only used for inViewRefs. */}
                {children}

                <ContentWrapper className="!pb-2">
                    <div className="grid grid-cols-3 text-center text-sm">
                        <div className="">
                            <p className="font-serif font-bold mb-2">B-Side GmbH</p>
                            <FooterLink linkUrl="/quarier" linkText="Über uns" />
                            <FooterLink linkUrl="/impressum" linkText="Impressum" />
                        </div>
                        <div>
                            <p className="font-serif font-bold mb-2">Zentrale Teile des Zentrums</p>
                            <FooterLink linkUrl="/kultur" linkText="B-Side Kultur e.V." />
                            <FooterLink linkUrl="/bside/kollektiv" linkText="B-Side Kollektiv" />
                        </div>
                        <div>
                            <p className="font-serif font-bold mb-2">Andere Platformen</p>
                            <Instagram />
                            <GithubLink />
                        </div>
                    </div>
                </ContentWrapper>

            </footer>
        </Fragment>
    );
};

export default Footer;
