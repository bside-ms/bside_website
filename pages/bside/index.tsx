import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContentWrapper from '@/components/layout/ContentWrapper';
import HeaderBar from '@/components/layout/header/HeaderBar';
import { SvgHistory } from '@/components/svg/History';
import { SvgHouse } from '@/components/svg/House';
import { SvgKollektiv } from '@/components/svg/Kollektiv';
import { SvgLegal } from '@/components/svg/Legal';
import CallToAction from '@blocks/callToActionBlock/CallToAction';
import Headline from '@blocks/headlineBlock/Headline';

export default (): ReactElement => {
    return (
        <div className="min-h-screen flex flex-col justify-between">
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

                <ContentWrapper>
                    <p className="font-serif text-2xl text-center mt-6 mb-2">
                        Ein Haus, ein Kollektiv, eine Idee.
                    </p>
                    <p className="sm:text-lg my-4">
                        Die B-Side ist sowohl ein offenes Haus als auch ein offenes Kollektiv, das
                        dieses Haus selbstorganisiert entwickelt, gestaltet und verwaltet. Gerade wird
                        unser heißgeliebter Hafenspeicher in Münster zu einem soziokulturellen Quartierszentrum
                        umgebaut.<br />
                        Währenddessen arbeiten wir vom Hawerkamp aus an der Eröffnung, planen Veranstaltungen rund
                        um Kultur & Bildung und erproben unsere Utopie von Miteinander und Zusammenarbeit.
                        Anfang 2024 ziehen wir endlich zurück in das alte/neue Hafengebäude.
                    </p>

                    <p className="sm:text-lg my-4">
                        Alles begann mit der Idee, dass unsere Stadt mehr soziokulturelle Freiräume und
                        bezahlbare Arbeits braucht. Selbstverwaltete und nicht-kommerzielle Räume für Kunst,
                        Kultur und Bildung, Begegnung und Engagement. Von dieser Idee angetrieben konnten wir
                        den Hill-Speicher am Münsteraner Hafen vor dem Verkauf an Investoren retten und erreichen,
                        dass stattdessen ein Ort entsteht, der Gemeinschaft, kulturelle Vielfalt, gerechte Teilhabe
                        und die sozial-ökologische Transformation ermöglicht. Ab ihrer Eröffnung Anfang 2024 bietet
                        die B-Side Veranstaltungs- und Begegnungs- und Werkräume auf über 3.000 qm!
                    </p>

                    <p className="sm:text-lg my-4">
                        Getragen wird das Gesamtprojekt von zwei Vereinen und einer GmbH.
                        Als Kollektiv organisieren wir uns so, dass alle gleichberechtigt zusammenarbeiten
                        und an Entscheidungen teilhaben können. Wir begreifen die B-Side als ein Haus von
                        Vielen für Viele. Sie soll von aktiven Bürger:innen genutzt werden, die sich vernetzen und
                        ihre Stadt mitgestalten wollen.
                    </p>
                </ContentWrapper>

                <div className="bg-black text-white">
                    <ContentWrapper>
                        <Headline
                            title="Unser Selbstverständnis"
                            teaser="Ein Ort, der allen gehört!"
                            level="h2"
                            as="h3"
                        />

                        <p className="sm:text-lg my-4">
                            Bis zur Eröffnung sind wir am Hawerkamp untergebracht.
                            Von dort aus arbeiten wir kollektiv an der Entstehung und Belebung des neues Hauses, planen Veranstaltungen rund um Kultur & Bildung
                            und erproben gemeinsam unsere Utopie von Miteinander und Zusammenarbeit.
                        </p>
                        <p className="sm:text-lg my-4">
                            Wir begreifen das Haus als einen Ort, der allen gehört. Wir wollen Kultur, Bildung und gesellschaftliches Engagement zusammenbringen.
                            Die B-Side soll von aktiven Bürger*innen genutzt und gestaltet werden, die sich vernetzen und ihre Stadt mitgestalten wollen.
                        </p>
                        <p className="sm:text-lg mt-4">
                            Als B-Side Kollektiv organisieren wir uns so, dass alle gleichberechtigt zusammenarbeiten und versuchen Entscheidungen immer so zu treffen, dass alle daran teilhaben können.
                            Jede Idee und jede Meinung ist uns wichtig und soll gehört werden, alle Beteiligten sollen möglichst frei und selbstbestimmt mitgestalten können.
                        </p>
                    </ContentWrapper>
                </div>

                <ContentWrapper>
                    <div className="mt-8">
                        <CallToAction title="" text="Machst du mit?" href="/mitmachen" />
                    </div>
                </ContentWrapper>
            </main>

            <Footer />
        </div>
    );
};
