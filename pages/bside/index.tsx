import type { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import NextHead from '@/components/layout/next/NextHead';
import { SvgHistory } from '@/components/svg/History';
import { SvgHouse } from '@/components/svg/House';
import { SvgKollektiv } from '@/components/svg/Kollektiv';
import { SvgLegal } from '@/components/svg/Legal';
import { getPublicClientUrl } from '@/lib/common/url';
import getPayloadResponse from '@/lib/payload/getPayloadResponse';
import type PaginatedDocs from '@/types/payload/PaginatedDocs';
import type { Page } from '@/types/payload/payload-types';
import ReusableBlockLayout from '@blocks/reusableLayout/ReusableBlockLayout';
import SubNavigation from '@blocks/subNavigation/SubNavigation';

interface Props {
    page: Page;
}

export const getStaticProps: GetStaticProps<Props> = async () => {

    const pagesResponse = await getPayloadResponse<PaginatedDocs<Page>>('/api/pages/?where[slug][equals]=bside');

    const page = pagesResponse.docs[0];

    if (page === undefined) {
        return { notFound: true };
    }

    return {
        revalidate: 60,
        props: {
            page,
        },
    };
};

export default ({ page }: Props): ReactElement => {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <NextHead
                title={page.meta?.title ?? `${page.title} | B-Side Münster`}
                description={page.meta?.description ?? 'Selbstorganisierter und offener Ort der Möglichkeiten am Münsteraner Hafen'}
                url={`${getPublicClientUrl()}/${page.slug}`}
            />
            <HeaderBar />

            <main id="content">
                <ContentWrapper>
                    <div>
                        <div className="w-full h-32 xs:h-40 md:h-52 relative mt-16 mb-8">
                            <Image
                                src="/assets/haus.png"
                                alt="Eine Grafik des Hauses"
                                fill={true}
                                className="object-contain"
                                priority={true}
                            />
                        </div>

                        <div className="font-serif text-lg md:text-xl text-center">
                            Die B-Side ist ein Haus,<br />
                            ein Kollektiv, eine Idee.
                        </div>
                        <div className="md:text-lg text-center">
                            Erfahre hier alles was du wissen willst.
                        </div>
                    </div>

                    <div className="md:flex">
                        {/* Das Haus */}
                        <Link
                            href="/bside/haus"
                            aria-label="Erfahre mehr über das Haus und was wir darin machen"
                            className="bg-black mt-6 py-4 flex w-full md:w-1/2 md:mr-2 text-white hover:bg-orange-500 hover:text-black"
                        >
                            <div className="hidden min-[320px]:block w-[100px] md:w-28 lg:w-32">
                                <SvgHouse
                                    className="fill-current w-[100px] md:w-28 lg:w-32 p-4 my-auto"
                                />
                            </div>
                            <div className="flex-1 px-2 lg:px-4 my-auto">
                                <p className="font-serif text-lg md:text-xl">
                                    Das Haus
                                </p>
                                <p className="text-sm sm:text-base">
                                    Welche Räume und Bereiche gibt es?
                                    Was passiert wo?
                                    Was bietet dir das Haus?
                                </p>
                            </div>
                        </Link>

                        {/* Kollektiv */}
                        <Link
                            href="/bside/kollektiv"
                            aria-label="Erfahre mehr über das Haus und was wir darin machen"
                            className="bg-black mt-6 py-4 flex w-full md:w-1/2 md:ml-2 text-white hover:bg-cyan-500 hover:text-black"
                        >
                            <div className="hidden min-[320px]:block w-[100px] md:w-28 lg:w-32 my-auto">
                                <SvgKollektiv
                                    className="fill-current w-[100px] md:w-28 lg:w-32 p-4"
                                />
                            </div>
                            <div className="flex-1 px-2 lg:px-4 my-auto">
                                <p className="font-serif text-lg md:text-xl">
                                    Das Kollektiv<br />
                                    & seine Kreise
                                </p>
                                <p className="text-sm sm:text-base">
                                    Wer ist die B-Side?
                                    Wie arbeiten wir miteinander?
                                    Wo kannst du mitmachen?
                                </p>
                            </div>
                        </Link>

                    </div>

                    <div className="md:flex">
                        {/* Die Vergangenheit */}
                        <Link
                            href="/bside/history"
                            aria-label="Erfahre mehr über das Haus und was wir darin machen"
                            className="bg-black mt-6 py-4 flex w-full md:w-1/2 md:mr-2 text-white hover:bg-red-500 hover:text-black"
                        >
                            <div className="hidden min-[320px]:block w-[100px] md:w-28 lg:w-32 my-auto">
                                <SvgHistory
                                    className="fill-current w-[100px] md:w-28 lg:w-32 p-4"
                                />
                            </div>
                            <div className="flex-1 px-2 lg:px-4 my-auto">
                                <p className="font-serif text-lg md:text-xl">
                                    B-Side History
                                </p>
                                <p className="text-sm sm:text-base">
                                    Erfahre mehr über die Geschichte und Hintergründe der B-Side.
                                </p>
                            </div>
                        </Link>

                        {/* Trägerschaft */}
                        <Link
                            href="/bside/traegerschaft"
                            aria-label="Erfahre mehr über das Haus und was wir darin machen"
                            className="bg-black mt-6 py-4 flex w-full md:w-1/2 md:ml-2 text-white hover:bg-green-500 hover:text-black"
                        >
                            <div className="hidden min-[320px]:block w-[100px] md:w-28 lg:w-32 my-auto">
                                <SvgLegal
                                    className="fill-current w-[100px] md:w-28 lg:w-32 p-4"
                                />
                            </div>
                            <div className="flex-1 px-2 lg:px-4 my-auto">
                                <p className="font-serif text-lg md:text-xl">
                                    Trägerschaft
                                </p>
                                <p className="text-sm sm:text-base">
                                    Erfahre mehr über unsere formaljuristische Organisationsstruktur.
                                </p>
                            </div>
                        </Link>
                    </div>

                </ContentWrapper>

                <div className="my-4" />

                <SubNavigation pageLayout={page.layout} />

                <ReusableBlockLayout
                    layout={page.layout}
                />
            </main>

            <Footer />
        </div>
    );
};
