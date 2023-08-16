import Image from 'next/image';
import type { ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';

const CultureAndEducation = (): ReactElement => {

    return (
        <>
            <ContentWrapper>
                <div className="w-full h-32 xs:h-40 md:h-52 relative lg:mt-4">
                    <Image
                        src="/assets/stickFigures/artists.svg"
                        alt="artists"
                        fill={true}
                        className="object-contain"
                        priority={true}
                    />
                </div>

                <div className="font-serif text-white bg-black mt-4 text-2xl text-center p-3">
                    Kultur & Bildung
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 mt-6">

                    <p className="font-serif text-center font-bold md:text-lg lg:col-span-4">
                        Im Haus und im Quartier
                    </p>

                    <div className="lg:col-span-4">

                        <p className="mt-4 md:text-lg">
                            Der B-Side Kultur e.V. ist der gemeinnützige Kulturverein innerhalb der B-Side.
                            Der Verein wurde 2016 gegründet und organisiert und beteiligt sich an Kunstausstellungen,
                            Konzerten, Filmvorführungen, Theateraufführungen, Lesungen und anderen kulturellen Veranstaltungen.
                        </p>
                    </div>

                    <div className="mt-4 lg:col-span-2">

                        <p className="md:text-lg">
                            Der B-Side Kultur e.V. verfolgt das Ziel, ein vielfältiges kulturelles Angebot zu schaffen und
                            Künstlern und Künstlerinnen eine Plattform zu bieten, um ihre Werke einem breiten Publikum zu
                            präsentieren. Der Verein arbeitet dabei eng mit lokalen Künstlern, Kulturschaffenden und anderen
                            kulturellen Einrichtungen zusammen.
                        </p>

                    </div>

                    <div className="flex justify-center align-middle lg:col-span-2 lg:mb-4">
                        <div className="mt-4 relative w-full py-auto h-[200px] md:h-[400px] lg:h-full">
                            <Image
                                src="/assets/veranstaltung.png"
                                alt="musicians"
                                fill={true}
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <p className="mt-4 md:text-lg ">
                            Zusätzlich zu seinen eigenen Veranstaltungen unterstützt der B-Side Kultur e.V. auch andere
                            kulturelle Projekte und Initiativen in Münster. Der Verein möchte die kulturelle Vielfalt und
                            den kreativen Austausch in der Stadt fördern und das kulturelle Leben bereichern.
                        </p>
                    </div>
                </div>
            </ContentWrapper>

            <div className="my-8 bg-black text-white">
                <ContentWrapper>
                    <div className="font-serif text-2xl text-center py-2">
                        Von Vielen für Viele
                    </div>

                    <p className="lg:text-lg">
                        Bei der Entwicklung und Durchführung seines Kultur- und Bildungsprogramms setzt der Kulturverein auf
                        Partizipation. Kultur von Vielen für Viele lautet die Devise! So wird z.B. das B-Side Festival
                        jedes Jahr aufs Neue im Rahmen eines breit angelegten Beteiligungsprozesses aus der Taufe gehoben.
                        Das Engagement im Verein ist dabei grundsätzlich ehrenamtlich. Jährlich engagieren sich neben den
                        aktuell ca. 70 aktiven Mitgliedern auch eben so viele Nicht-Mitglieder freiwillig ehrenamtlich für
                        die Vereinsaktivitäten. Die Aktiven organisieren sich dabei in soziokratischen Arbeitskreisen, die
                        du weiter unten aufgeführt findest.
                    </p>

                    <div className="flex justify-center">
                        <button className="font-serif bg-white mt-4 text-center text-lg px-2 leading-7 text-black w-2/3 max-w-xs hover:bg-orange-500 hover:text-white cursor-pointer">
                            Alle Arbeitskreise
                        </button>
                    </div>
                </ContentWrapper>
            </div>

            { /* * /}
            <div className="bg-black text-white relative">

                <ContentWrapper>
                    <div className="font-serif text-2xl text-center py-2">
                        Die Rolle im Haus
                    </div>

                    <div className="text-lg">
                        Ende 2023 soll die B-Side am Hafen endlich bezugsfertig sein. Der B-Side Kultur e.V. wird einen
                        Großteil der öffentlichen Bereiche des Hauses mit gemeinnützigem Kultur- und Bildungsprogramm
                        füllen. Er bespielt Veranstaltungsraum und Ausstellungsraum und betreibt die Offene Werkstatt.
                        Die Vereinsmitglieder haben bereits in jahrelanger Projektarbeit ein Betriebskonzept für die
                        gemeinnützige Nutzung der Veranstaltungs- und Begegnungsräume entwickelt.
                    </div>

                    <div className="bg-white p-4 mt-4">
                        <div className="text-center text-black text-sm">
                            Du willst mehr erfahren wie die B-Side organisiert sind? Hier
                            findest du mehr zu unserm Trägerschaftsmodell.
                        </div>

                        <div className="flex justify-center">
                            <button className="font-serif bg-black mt-2 text-center px-2 leading-7 w-2/3 max-w-xs hover:bg-orange-500 text-white cursor-pointer">
                                Trägerschaftsmodell
                            </button>
                        </div>
                    </div>
                </ContentWrapper>
            </div>

            <ContentWrapper>
                <div className="mt-10">
                    <div className="font-serif text-2xl text-center py-2">
                        Unterstützen
                    </div>

                    <div className="text-lg">
                        Der B-Side Kultur e.V. freut sich über tatkräftige Unterstützung. Komm gerne zum Kultur-Plenum,
                        um dich innerhalb seiner Strukturen zu engagieren. Wenn du zu wenig Zeit hast, dich ehrenamtlich
                        einzubringen, kannst du die Vereinsaktivitäten auch mit einer Fördermitgliedschaft oder Spenden
                        unterstützen. Für weitere Informationen, schreib uns gerne
                        an <Link href="mailto:kultur@b-side.ms" className="font-bold cursor-pointer">kultur@b-side.ms</Link>.
                    </div>
                </div>

                <div className="mt-12">
                    <button className="w-full cursor-pointer bg-black text-center py-3 px-5 font-serif text-lg font-bold text-white">
                        Download Satzung & Rechtliches
                    </button>
                </div>

            </ContentWrapper>
            { /* */ }
        </>
    );
};

export default CultureAndEducation;
