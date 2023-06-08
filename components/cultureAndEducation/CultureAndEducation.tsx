import { nextWednesday } from 'date-fns';
import { range } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import ContentWrapper from 'components/common/ContentWrapper';
import NextEvents from 'components/events/NextEvents';
import formatDate from 'lib/common/helper/formatDate';
import type { Event } from 'types/payload/payload-types';

interface Props {
    events: Array<Event>;
}

interface WorkingGroup {
    name: string;
    color: string;
}

const workingGroups = new Array<WorkingGroup>(
    { name: 'Booking', color: '#e72323' },
    { name: 'B-Side Festival', color: '#f1760d' },
    { name: 'Faltenrock', color: '#d51cce' },
    { name: 'KuBi', color: '#6f36ee' },
    { name: 'Ausstellungen', color: '#065088' },
    { name: 'B-Side Funk', color: '#1e5675' },
    { name: 'Luftruinen Festival', color: '#246726' },
);

const CultureAndEducation = ({ events }: Props): ReactElement => {

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
                            <Image src="/assets/veranstaltung.png" alt="musicians" fill={true} />
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

                <div className="mt-6 bg-black p-4 text-white text-center">
                    Interesse am Festival?<br />
                    Hier erfährst du mehr zum Arbeitskreis und alle Infos und Events.

                    <div className="flex justify-center">
                        <button className="font-serif bg-white mt-4 text-center px-2 leading-7 text-black w-2/3 max-w-xs hover:bg-orange-500 hover:text-white cursor-pointer">
                            Festival
                        </button>
                    </div>
                </div>
            </ContentWrapper>

            <div className="mt-5 overflow-hidden whitespace-nowrap bg-black py-2 text-white">
                {range(100).map(() => 'Hinweis | ')}
            </div>

            <div className="mt-16 bg-black text-white">
                <ContentWrapper>
                    <div className="font-serif text-2xl text-center py-2">
                        Von Vielen für Viele
                    </div>

                    <div>
                        Bei der Entwicklung und Durchführung seines Kultur- und Bildungsprogramms setzt der Kulturverein auf
                        Partizipation. Kultur von Vielen für Viele lautet die Devise! So wird z.B. das B-Side Festival
                        jedes Jahr aufs Neue im Rahmen eines breit angelegten Beteiligungsprozesses aus der Taufe gehoben.
                        Das Engagement im Verein ist dabei grundsätzlich ehrenamtlich. Jährlich engagieren sich neben den
                        aktuell ca. 70 aktiven Mitgliedern auch eben so viele Nicht-Mitglieder freiwillig ehrenamtlich für
                        die Vereinsaktivitäten. Die Aktiven organisieren sich dabei in soziokratischen Arbeitskreisen, die
                        du weiter unten aufgeführt findest.
                    </div>

                    <div className="flex justify-center">
                        <button className="font-serif bg-white mt-4 text-center px-2 leading-7 text-black w-2/3 max-w-xs hover:bg-orange-500 hover:text-white cursor-pointer">
                            Alle Arbeitskreise
                        </button>
                    </div>
                </ContentWrapper>
            </div>

            <ContentWrapper>
                <div className="mt-16">
                    <div className="font-serif text-2xl text-center">
                        Arbeitskreise & Mitgliederversammlung
                    </div>

                    <div className="mt-5">
                        Was nicht in den Zuständigkeitsbereich der Mitgliederversammlung (MV) fällt, ist Zuständigkeit
                        der Arbeitskreise (AK). Die MV bestimmt über die allgemeine Ausrichtung und Strategie des Vereins.
                        Die AK führen die Regie bei konkreten Projekten und im Tagesgeschehen des Vereinslebens. Sie
                        treffen sich regelmäßig zu Plena. Die Plena sind offen, um möglichst viele Menschen möglichst
                        niedrigschwellig an Entscheidungsprozessen zu beteiligen. Im monatlichen Kultur-Plenum werden
                        alle aktuellen Vereinsaktivitäten koordiniert. Es dient den Arbeitskreisen als Ort des Austauschs,
                        der Abstimmung und gegenseitigen Kontrolle und Unterstützung. Das Kultur-Plenum findet jeden 3.
                        Mittwoch im Monat um 18:00 statt (Am Hawerkamp 29). Wenn du die verschiedenen AK des Kulturvereins
                        kennenlernen möchtest, ist es eine gute erste Anlaufstelle. Auch, wenn du eigene Projektideen hast,
                        für die du Mitwirkende suchst. Komm gerne dazu, du bist herzlich Eingeladen!
                    </div>
                </div>

                <div className="mt-4 border-2 border-black p-2 text-center font-serif flex flex-wrap gap-x-1 justify-center">
                    <div className="whitespace-nowrap">Nächstes Kulturplenum:</div>
                    <div className="whitespace-nowrap">{formatDate(nextWednesday(new Date()), 'dd.MM. HH \'Uhr\'')}</div>
                </div>
            </ContentWrapper>

            <ContentWrapper>
                <NextEvents
                    title="Veranstaltungen des Kultur&nbsp;e.V.s"
                    events={events}
                />
            </ContentWrapper>

            <div className="mt-[90px] bg-black text-white relative">
                <div className="absolute right-0 -top-[80px] w-[170px] h-[80px]">
                    <div className="relative w-full h-full">
                        <Image src="/assets/stickFigures/withDog.svg" alt="artists" fill={true} className="object-contain" />
                    </div>
                </div>

                <ContentWrapper>
                    <div className="font-serif text-2xl text-center py-2">
                        Die Rolle im Haus
                    </div>

                    <div>
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
                <div className="mt-12">
                    <div className="border-4 border-black">
                        <div className="font-serif bg-black text-white text-center p-3">
                            Alle Arbeitskreise des Kultur e.V.s
                        </div>

                        <div>
                            {workingGroups.map(({ name, color }) => (
                                <div
                                    key={name}
                                    className="group relative flex justify-between items-center px-4 py-1 border-b border-gray-300 last:border-none cursor-pointer"
                                    // eslint-disable-next-line react/jsx-no-bind
                                    onClick={(): void => alert('Coming soon...')}
                                >
                                    <div className="font-bold z-20 group-hover:text-white transition-all duration-100">{name}</div>

                                    <div
                                        className="absolute top-0 right-0 bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-100"
                                        style={{ backgroundColor: color }}
                                    />

                                    <div className="text-sm z-20 group-hover:text-white transition-all duration-100">» mehr</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="font-serif text-2xl text-center py-2">
                        Unterstützen
                    </div>

                    <div>
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
        </>
    );
};

export default CultureAndEducation;
