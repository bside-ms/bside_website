import { nextWednesday } from 'date-fns';
import { range } from 'lodash';
import Image from 'next/image';
import type { ReactElement } from 'react';
import ContentWrapper from 'components/common/ContentWrapper';
import NextEvents from 'components/events/NextEvents';
import formatDate from 'lib/common/helper/formatDate';
import type { Event } from 'types/payload/payload-types';

interface Props {
    events: Array<Event>;
}

const CultureAndEducation = ({ events }: Props): ReactElement => {

    return (
        <>
            <ContentWrapper>
                <div className="w-full h-52 md:h-64 relative">
                    <Image src="assets/stickFigures/artists.svg" alt="artists" fill={true} />
                </div>

                <div className="font-serif text-white bg-black mt-4 text-2xl text-center p-3">
                    Kultur & Bildung
                </div>

                <div className="font-serif text-center mt-6 font-bold md:text-lg">
                    Im Haus und im Quartier
                </div>

                <div className="mt-4 md:text-lg">
                    Der B-Side Kultur e.V. ist der gemeinnützige Kulturverein der B-Side. Er wurde 2016 gegründet.
                    Seine Satzungszwecke sind die Förderung der Kunst und Kultur, sowie die Förderung der Erziehung,
                    Volks- und Berufsbildung.
                </div>

                <div className="mt-6 flex justify-end">
                    <div className="h-36 md:h-44 relative w-2/3 md:w-2/5">
                        <Image src="assets/stickFigures/musicians.svg" alt="musicians" fill={true} />
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

            <div className="mt-5 bg-black text-white">
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
                <div className="mt-8">
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

            <NextEvents
                title="Veranstaltungen des Kultur&nbsp;e.V.s"
                events={events}
            />

            <div className="bg-black text-white">
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
        </>
    );
};

export default CultureAndEducation;
