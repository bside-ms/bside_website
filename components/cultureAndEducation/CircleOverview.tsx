import { Fragment } from 'react';
import { nextWednesday } from 'date-fns';
import Link from 'next/link';
import type { ReactElement } from 'react';
import formatDate from '@/lib/common/helper/formatDate';
import isEmptyString from '@/lib/common/helper/isEmptyString';
import createCircleLink from '@/lib/events/createCircleLink';
import type { Circle } from '@/types/payload/payload-types';
import Headline from '@blocks/headlineBlock/Headline';

interface Props {
    headlineText: string;
    circles: Array<Circle>;
}

const CircleOverview = ({ headlineText, circles }: Props): ReactElement => {

    return (
        <Fragment>
            <div className="my-4">
                <Headline
                    title={headlineText}
                    level="h2"
                />
            </div>

            <div className="lg:flex lg:gap-4 lg:flex-row-reverse">

                <div className="lg:basis-1/2 lg:align-text-top lg:px-4 overflow-y-auto">
                    <p className="lg:text-lg">
                        Was nicht in den Zuständigkeitsbereich der Mitgliederversammlung (MV) fällt, ist
                        Zuständigkeit der Arbeitskreise (AK). Die MV bestimmt über die allgemeine Ausrichtung
                        und Strategie des Vereins. Die AK führen die Regie bei konkreten Projekten und im
                        Tagesgeschehen des Vereinslebens. Sie treffen sich regelmäßig zu Plena. Die Plena
                        sind offen, um möglichst viele Menschen möglichst niedrigschwellig an Entscheidungsprozessen
                        zu beteiligen. Im monatlichen Kultur-Plenum werden alle aktuellen Vereinsaktivitäten koordiniert.
                        Es dient den Arbeitskreisen als Ort des Austauschs, der Abstimmung und gegenseitigen Kontrolle
                        und Unterstützung. Das Kultur-Plenum findet jeden 3. Mittwoch im Monat um 18:00 statt
                        (Am Hawerkamp 29). Wenn du die verschiedenen AK des Kulturvereins kennenlernen möchtest,
                        ist es eine gute erste Anlaufstelle. Auch, wenn du eigene Projektideen hast, für die
                        du Mitwirkende suchst. Komm gerne dazu, du bist herzlich Eingeladen!
                    </p>

                    <div className="mt-4 border-2 border-black p-2 text-center font-serif flex flex-wrap gap-x-1 justify-center">
                        <div className="whitespace-nowrap">Nächstes Kulturplenum:</div>
                        <div className="whitespace-nowrap">{formatDate(nextWednesday(new Date()), 'dd.MM. HH \'Uhr\'')}</div>
                    </div>
                </div>

                <div className="lg:basis-1/2">
                    <div className="border-2 border-black my-4">
                        {circles.map((circle: Circle) => (
                            <Link
                                href={createCircleLink(circle)}
                                key={circle.name}
                            >
                                <div
                                    className="group relative flex justify-between items-center px-4 py-1 cursor-pointer border-b border-gray-300"
                                >
                                    <div className="z-20 lg:text-lg group-hover:text-white transition-all duration-100">
                                        <p className="font-bold">
                                            {circle.name}
                                        </p>
                                        {!isEmptyString(circle.description) && (
                                            <p className="text-sm lg:text-base">
                                                {circle.description}
                                            </p>
                                        )}
                                    </div>
                                    <div
                                        className="absolute top-0 right-0 bottom-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-100"
                                        style={{ backgroundColor: circle.color }}
                                    />

                                    <div className="text-sm z-20 group-hover:text-white transition-all duration-100">
                                        »&nbsp;mehr
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );

};

export default CircleOverview;
