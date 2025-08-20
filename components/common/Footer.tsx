import { Fragment } from 'react';
import Link from 'next/link';
import useLocale from '@/lib/common/hooks/useLocale';
import type { ReactElement } from 'react';
import { SiGithub, SiInstagram, SiMastodon } from 'react-icons/si';
import ContentWrapper from '@/components/layout/ContentWrapper';

const FooterLink = ({ linkUrl, linkText }: { linkUrl: string; linkText: string }): ReactElement => (
    <div className="my-2">
        <Link href={linkUrl} aria-label="Die B-Side auf GitHub" target="_blank" className="italic hover:text-orange-500">
            <span className="underline underline-offset-4">{linkText}</span>
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
            <span className="ml-1 underline underline-offset-4">Github</span>
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
            <span className="ml-1 underline underline-offset-4">Instagram</span>
        </Link>
    </div>
);

const Mastodon = (): ReactElement => (
    <div className="my-2">
        <Link href="https://muenster.im/@bside" aria-label="Mastodon" target="_blank" className="italic hover:text-orange-500" rel="me">
            <SiMastodon className="inline" />
            <span className="ml-1 underline underline-offset-4">Mastodon</span>
        </Link>
    </div>
);

const Footer = (): ReactElement => {
    const locale = useLocale();

    return (
        <Fragment>
            {/* This empty Content-Wrapper is used to force the Footer to the bottom on smaller pages. */}
            <ContentWrapper />

            <footer className="mb-auto" key="footer">
                <div className="mt-5 bg-black py-2">
                    <div className="text-center font-serif font-bold text-white">
                        <Link
                            href="/anfahrt"
                            aria-label={
                                locale !== 'en' ? 'Alle rechtlichen Angaben sind hier zu finden' : 'All legal information can be found here'
                            }
                            className="font-serif text-base font-bold hover:text-orange-500 md:text-lg"
                        >
                            {locale !== 'en' ? 'Anfahrt' : 'Arrival'}
                        </Link>
                        <span className="px-1 sm:px-2">|</span>
                        <Link
                            href="/impressum"
                            aria-label={
                                locale !== 'en' ? 'Alle rechtlichen Angaben sind hier zu finden' : 'All legal information can be found here'
                            }
                            className="font-serif text-base font-bold hover:text-orange-500 md:text-lg"
                        >
                            {locale !== 'en' ? 'Impressum' : 'Imprint'}
                        </Link>
                        <span className="px-1 sm:px-2">|</span>
                        <Link
                            href="/datenschutz"
                            aria-label={
                                locale !== 'en'
                                    ? 'Erfahre mehr darüber, wie wir mit deinen Daten umgehen'
                                    : 'Learn more about how we handle your data'
                            }
                            className="font-serif text-base font-bold hover:text-orange-500 md:text-lg"
                        >
                            {locale !== 'en' ? 'Datenschutz' : 'Privacy Policy'}
                        </Link>
                        <span className="px-1 sm:px-2">|</span>
                        <Link
                            href="/kontakt"
                            aria-label={locale !== 'en' ? 'Trete mit uns in den Kontakt' : 'Get in touch with us'}
                            className="font-serif text-base font-bold hover:text-orange-500 md:text-lg"
                        >
                            {locale !== 'en' ? 'Kontakt' : 'Contact Us'}
                        </Link>
                    </div>
                </div>

                <ContentWrapper className="mt-4 lg:mt-0">
                    <div className="grid text-center text-sm md:grid-cols-3">
                        <div className="mb-2 md:my-0">
                            <p className="mb-2 font-serif font-bold">B-Side GmbH</p>
                            <FooterLink linkUrl="/quartier" linkText={locale !== 'en' ? 'Über uns' : 'About us'} />
                            <FooterLink linkUrl="/impressum" linkText={locale !== 'en' ? 'Impressum' : 'Imprint'} />
                        </div>
                        <div className="mb-2 md:my-0">
                            <p className="mb-2 font-serif font-bold">
                                {locale !== 'en' ? 'Zentrale Teile des Zentrums' : 'Other Central Parts'}
                            </p>
                            <FooterLink linkUrl="/kultur" linkText="B-Side Kultur e.V." />
                            <FooterLink linkUrl="/bside/kollektiv" linkText={locale !== 'en' ? 'B-Side Kollektiv' : 'B-Side Collective'} />
                            <FooterLink linkUrl="/quartier/b-side-cafe" linkText="B-Side Cafe" />
                        </div>
                        <div className="">
                            <p className="mb-2 font-serif font-bold">{locale !== 'en' ? 'Andere Plattformen' : 'Other platforms'}</p>
                            <Instagram />
                            <Mastodon />
                            <GithubLink />
                        </div>
                    </div>
                </ContentWrapper>
            </footer>
        </Fragment>
    );
};

export default Footer;
