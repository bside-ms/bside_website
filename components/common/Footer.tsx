import Link from 'next/link';
import { useRouter } from 'next/router';
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
    const { locale } = useRouter();

    return (
        <footer className="mb-auto" key="footer">
            <div className="bg-black mt-5 py-2">
                <div className="py-auto text-center text-white font-bold font-serif">
                    <Link
                        href="/impressum"
                        aria-label={locale !== 'en' ? 'Alle rechtlichen Angaben sind hier zu finden' : 'All legal information can be found here'}
                        className="text-md md:text-lg font-bold font-serif hover:text-orange-500"
                    >
                        {locale !== 'en' ? 'Impressum' : 'Imprint'}
                    </Link>
                    <span className="px-2">|</span>
                    <Link
                        href="/datenschutz"
                        aria-label={locale !== 'en' ? 'Erfahre mehr darüber, wie wir mit deinen Daten umgehen' : 'Learn more about how we handle your data'}
                        className="text-md md:text-lg font-bold font-serif hover:text-orange-500"
                    >
                        {locale !== 'en' ? 'Datenschutz' : 'Privacy Policy'}
                    </Link>
                    <span className="px-2">|</span>
                    <Link
                        href="/kontakt"
                        aria-label={locale !== 'en' ? 'Trete mit uns in den Kontakt' : 'Get in touch with us'}
                        className="text-md md:text-lg font-bold font-serif hover:text-orange-500"
                    >
                        {locale !== 'en' ? 'Kontakt' : 'Contact Us'}
                    </Link>
                </div>
            </div>

            {/* Only used for inViewRefs. */}
            {children}

            <ContentWrapper className="!pb-2">
                <div className="grid md:grid-cols-3 text-center text-sm">
                    <div className="mb-2 md:my-0">
                        <p className="font-serif font-bold mb-2">B-Side GmbH</p>
                        <FooterLink linkUrl="/quartier" linkText={locale !== 'en' ? 'Über uns' : 'About us'} />
                        <FooterLink linkUrl="/impressum" linkText={locale !== 'en' ? 'Impressum' : 'Imprint'} />
                    </div>
                    <div className="mb-2 md:my-0">
                        <p className="font-serif font-bold mb-2">{locale !== 'en' ? 'Zentrale Teile des Zentrums' : 'Other Central Parts'}</p>
                        <FooterLink linkUrl="/kultur" linkText="B-Side Kultur e.V." />
                        <FooterLink linkUrl="/bside/kollektiv" linkText={locale !== 'en' ? 'B-Side Kollektiv' : 'B-Side Collective'} />
                    </div>
                    <div className="">
                        <p className="font-serif font-bold mb-2">{locale !== 'en' ? 'Andere Platformen' : 'Other Platforms'}</p>
                        <Instagram />
                        <GithubLink />
                    </div>
                </div>
            </ContentWrapper>

        </footer>
    );
};

export default Footer;
