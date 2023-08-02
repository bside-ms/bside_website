import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import Footer from '@/components/common/Footer';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import HeaderBar from '@/components/Layout/Header/HeaderBar';
import { SvgHistory } from '@/components/svg/History';
import { SvgHouse } from '@/components/svg/House';
import { SvgKollektiv } from '@/components/svg/Kollektiv';
import { SvgLegal } from '@/components/svg/Legal';

export default (): ReactElement => {
    return (
        <main className="min-h-screen flex flex-col justify-between">
            <HeaderBar />

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

                    {/* Das Kollektiv */}
                    <Link
                        href="/bside/haus"
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

                <div className="md:flex mb-4">
                    {/* History */}
                    <Link
                        href="/bside/haus"
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
                        href="/bside/haus"
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
                <p className="sm:text-lg">
                    Das Haus war und wird ein offener Ort der Möglichkeiten am Münsteraner Hafen, der von vielen Menschen als Kollektiv selbstorganisiert entwickelt, gestaltet und verwaltet wird.
                    Alles begann mit der Idee, dass unsere Stadt mehr Freiräume braucht.
                    Freie, selbstverwaltete und nicht-kommerzielle Räume für Kunst, Kultur, Engagement und Begegnung.
                    Von dieser Idee angetrieben konnten wir unseren geliebten Hafenspeicher in Münster vor dem Verkauf an Investoren retten und erreichen, dass er zu einem soziokulturellen Quartierszentrum umgebaut wird.
                    So entsteht dort aktuell ein neuer Ort für Begegnung, kulturelle Vielfalt, gerechte Teilhabe und die sozial-ökologische Transformation.
                    Konkret: Auf über 3000 qm bietet die B-Side ab der Eröffnung Anfang nächsten Jahres Veranstaltungs-, Begegnungs-, Bewegungs-, Arbeits- und Werkräume.
                    Bis zur Eröffnung sind wir am Hawerkamp untergebracht.
                    Von dort aus arbeiten wir kollektiv an der Entstehung und Belebung des neues Hauses, planen Veranstaltungen rund um Kultur & Bildung und erproben gemeinsam unsere Utopie von Miteinander und Zusammenarbeit.
                </p>
            </ContentWrapper>

            <div className="bg-black text-white">
                <ContentWrapper>
                    <p className="sm:text-lg">
                        Bis zur Eröffnung sind wir am Hawerkamp untergebracht.
                        Von dort aus arbeiten wir kollektiv an der Entstehung und Belebung des neues Hauses, planen Veranstaltungen rund um Kultur & Bildung
                        und erproben gemeinsam unsere Utopie von Miteinander und Zusammenarbeit.
                    </p>
                </ContentWrapper>
            </div>

            <ContentWrapper>
                <p className="sm:text-lg">
                    Wir begreifen das Haus als einen Ort, der allen gehört. Wir wollen Kultur, Bildung und gesellschaftliches Engagement zusammenbringen.
                    Die B-Side soll von aktiven Bürger*innen genutzt und gestaltet werden, die sich vernetzen und ihre Stadt mitgestalten wollen.
                </p>
            </ContentWrapper>

            <div className="bg-black text-white">
                <ContentWrapper>
                    <p className="sm:text-lg">
                        Als B-Side Kollektiv organisieren wir uns so, dass alle gleichberechtigt zusammenarbeiten und versuchen Entscheidungen immer so zu treffen, dass alle daran teilhaben können.
                        Jede Idee und jede Meinung ist uns wichtig und soll gehört werden, alle Beteiligten sollen möglichst frei und selbstbestimmt mitgestalten können.
                    </p>
                </ContentWrapper>
            </div>

            <ContentWrapper>
                <div className="w-full h-96 relative mt-8 mb-8">
                    <Image
                        src="/assets/kennenlernen.png"
                        alt="Eine Grafik des Hauses"
                        fill={true}
                        className="object-contain"
                        priority={true}
                    />
                </div>
            </ContentWrapper>

            <Footer />
        </main>
    );
};
