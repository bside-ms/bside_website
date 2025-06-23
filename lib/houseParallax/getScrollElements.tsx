import type { StaticImageData } from 'next/image';
import type { ReactElement } from 'react';
import parallax01Image from 'public/assets/parallax/Parallax_01.png';
import parallax02Image from 'public/assets/parallax/Parallax_02.png';
import parallax061Image from 'public/assets/parallax/Parallax_06_1.png';
import parallax062Image from 'public/assets/parallax/Parallax_06_2.png';
import parallax063Image from 'public/assets/parallax/Parallax_06_3.png';
import parallax064Image from 'public/assets/parallax/Parallax_06_4.png';
import parallax065Image from 'public/assets/parallax/Parallax_06_5.png';
import parallax066Image from 'public/assets/parallax/Parallax_06_6.png';
import parallax067Image from 'public/assets/parallax/Parallax_06_7.png';
import parallax07Image from 'public/assets/parallax/Parallax_07.png';
import parallax08Image from 'public/assets/parallax/Parallax_08.png';
import parallax085Image from 'public/assets/parallax/Parallax_08_5.png';
import parallax10Image from 'public/assets/parallax/Parallax_10.png';
import parallax11Image from 'public/assets/parallax/Parallax_11.png';
import parallax12Image from 'public/assets/parallax/Parallax_12.png';
import parallax13Image from 'public/assets/parallax/Parallax_13.png';
import parallax14Image from 'public/assets/parallax/Parallax_14.png';
import parallax15Image from 'public/assets/parallax/Parallax_15.png';
import parallax16Image from 'public/assets/parallax/Parallax_16.png';
import parallax17Image from 'public/assets/parallax/Parallax_17.png';
import parallax18Image from 'public/assets/parallax/Parallax_18.png';
import parallax19Image from 'public/assets/parallax/Parallax_19.png';
import parallax20Image from 'public/assets/parallax/Parallax_20.png';
import parallax21Image from 'public/assets/parallax/Parallax_21.png';
import parallax22Image from 'public/assets/parallax/Parallax_22.png';
import parallax23Image from 'public/assets/parallax/Parallax_23.png';
import parallax24Image from 'public/assets/parallax/Parallax_24.png';
import parallax25Image from 'public/assets/parallax/Parallax_25.png';

export interface ScrollInfoBox {
    title?: string;
    text: string | ReactElement;
    display: {
        begin: number;
        end: number;
    };
}

export interface ScrollImage {
    image: StaticImageData;
    display?: {
        begin: number;
        end: number;
    };
    fade?: {
        inBegin: number;
        inEnd: number;
        outBegin: number;
        outEnd: number;
    };
}

export type ScrollElement = ScrollInfoBox | ScrollImage;

export const isScrollImage = (scrollElement: ScrollElement): scrollElement is ScrollImage => 'image' in scrollElement;

export const isScrollInfoBox = (scrollElement: ScrollElement): scrollElement is ScrollInfoBox => 'text' in scrollElement;

const getScrollElements = (): Array<ScrollElement> => {
    const scrollImages = new Array<ScrollImage>({
        image: parallax02Image,
        fade: {
            inBegin: 0,
            inEnd: 0,
            outBegin: 150,
            outEnd: 400,
        },
    });

    const scrollInfoBoxes = new Array<ScrollInfoBox>();

    let currentBegin = 0;

    const addFadingScrollImage = (image: StaticImageData, duration: number, transition = 35): void => {
        const inBegin = currentBegin === 0 ? 0 : currentBegin - transition;
        const inEnd = currentBegin === 0 ? 0 : currentBegin + transition;

        currentBegin = currentBegin + duration;

        const outBegin = currentBegin - transition;
        const outEnd = currentBegin + transition;

        scrollImages.push({
            image,
            fade: {
                inBegin,
                inEnd,
                outBegin,
                outEnd,
            },
        });
    };

    const addDisplayingScrollImage = (image: StaticImageData, duration: number): void => {
        const begin = currentBegin === 0 ? 0 : currentBegin;

        currentBegin = currentBegin + duration;

        const end = currentBegin;

        scrollImages.push({
            image,
            display: {
                begin,
                end,
            },
        });
    };

    const addDisplayInfoBox = (title: string | undefined, text: string | ReactElement, duration: number): void => {
        const begin = currentBegin === 0 ? 0 : currentBegin;

        const end = currentBegin + duration;

        scrollInfoBoxes.push({
            title,
            text,
            display: {
                begin,
                end,
            },
        });
    };

    addFadingScrollImage(parallax01Image, 260);

    addFadingScrollImage(parallax061Image, 20);
    addFadingScrollImage(parallax062Image, 20);
    addFadingScrollImage(parallax063Image, 20);
    addFadingScrollImage(parallax064Image, 20);
    addFadingScrollImage(parallax065Image, 20);
    addFadingScrollImage(parallax066Image, 20);
    addFadingScrollImage(parallax067Image, 20);

    addFadingScrollImage(parallax07Image, 200);

    addDisplayInfoBox('Hill-Speicher', 'Den alten Hill-Speicher am Hafen teilen wir (rot) uns mit dem Ruderverein Münster (blau).', 500);

    addFadingScrollImage(parallax08Image, 500, 150);

    addFadingScrollImage(parallax07Image, 300, 150);
    addFadingScrollImage(parallax085Image, 300, 50);

    currentBegin = currentBegin - 50;

    addDisplayInfoBox('Dachterrasse', 'Über die Hafentreppe gelangst du auf das Sonnendeck mit ordentlich Platz zum Verweilen.', 500);
    addDisplayingScrollImage(parallax10Image, 500);

    addDisplayInfoBox(
        'Quartierswohnzimmer',
        'Komm rein ins Herz des soziokulturellen Zentrums! Hier kannst du auf Sofas chillen, was Leckeres essen oder an der Bar rumhängen.',
        500,
    );
    addDisplayingScrollImage(parallax11Image, 500);

    addDisplayInfoBox(
        'Haus- und Allmendeküche',
        'Die Hausküche sorgt für gutes Essen; die Allmendeküche steht Initiativen rund ums Thema Ernährungswende zur Verfügung.',
        500,
    );
    addDisplayingScrollImage(parallax12Image, 500);

    addDisplayInfoBox(
        'Veranstaltungssaal',
        <>
            Hier steppt der Bär! Etwa bei Konzerten und diversen Kultur&shy;veranstaltungen. Bei Kongressen oder Podiums&shy;diskussionen
            sitzt er dann eher.
        </>,
        500,
    );
    addDisplayingScrollImage(parallax13Image, 500);

    addDisplayInfoBox('Ausstellungsraum', 'Im Foyer kannst du regelmäßig wechselnde Ausstellungen bestaunen.', 500);
    addDisplayingScrollImage(parallax14Image, 500);

    addDisplayInfoBox(
        'Gruppenräume',
        'Du bist in einer Initiative oder einem Verein aktiv? Drei Gruppenräume könnt ihr für eure Plena und Workshops nutzen.',
        500,
    );
    addDisplayingScrollImage(parallax15Image, 500);

    addDisplayInfoBox('B-Side Büro', 'Wenn du dazu Fragen hast, sprich uns einfach an! ;) ???', 500);
    addDisplayingScrollImage(parallax16Image, 500);

    addDisplayInfoBox(
        'fairdruckt eG',
        'Nachhaltige (Print-)Produkte kannst du im fairdruckt-Laden kaufen. Wenn du lieber selbst was Drucken willst, geht das in deren Siebdruckwerkstatt.',
        500,
    );
    addDisplayingScrollImage(parallax17Image, 500);

    addDisplayInfoBox(
        'Offene Werkstatt',
        'Einen größeren Maschinenfuhrpark findest du eine Etage tiefer. Hier kannst du unter Anleitung Dinge aus Holz und Metall bauen oder Kaputtes reparieren.',
        500,
    );
    addDisplayingScrollImage(parallax18Image, 500);

    addDisplayInfoBox(
        'Soziallabor',
        'Vielleicht willst du aber auch ein Sozialunternehmen gründen, um soziale und ökologische Herausforderungen zu meistern? Im Coworking-Space findest du Gleichgesinnte.',
        500,
    );
    addDisplayingScrollImage(parallax19Image, 500);

    addDisplayInfoBox(
        'Bewegungsraum',
        'Wenn dir die Krisen dieser Welt zwischendurch zu nahe gehen, bekommst du bei Yoga, Meditation oder Tanz hoffentlich den Kopf frei.',
        500,
    );
    addDisplayingScrollImage(parallax20Image, 500);

    addDisplayInfoBox(
        'Gemeinschaftsatelier',
        'Oder auf dem Wege der bildenden Kunst? Auch für Künstler:innen gibt es ordentlich Platz, um schöpferisch tätig zu sein.',
        500,
    );
    addDisplayingScrollImage(parallax21Image, 500);

    addDisplayInfoBox(
        'Kreativräume',
        'Es gibt aber auch Ateliers auf die du dich bewerben kannst, wenn du von dort aus kreativ werken und wirken möchtest.',
        500,
    );
    addDisplayingScrollImage(parallax22Image, 500);

    addDisplayInfoBox(
        'Büros',
        'Die Büros stehen Vereinen, Organisationen und Initiativen zur Verfügung, die gemeinnützig oder gemeinwohlorientiert arbeiten.',
        500,
    );
    addDisplayingScrollImage(parallax23Image, 500);

    addDisplayInfoBox(
        'Proberäume',
        'Und wenn du einen Raum brauchst, um mit deiner Band Mucke zu machen, kannst du dich auf einen von vier Proberäumen bewerben.',
        500,
    );
    addDisplayingScrollImage(parallax24Image, 500);

    addDisplayInfoBox(
        'Mobi',
        'Ach, du musst schon wieder los? Nutze gerne unser Mobilitätsangebot. Neben Stadtteilautos steht eine Cargobike-Flotte zur Ausleihe bereit.',
        500,
    );
    addDisplayingScrollImage(parallax25Image, 500);

    currentBegin = currentBegin - 50;

    addFadingScrollImage(parallax085Image, 300, 50);

    addFadingScrollImage(parallax07Image, 300);

    scrollImages.push({
        image: parallax02Image,
        fade: {
            inBegin: currentBegin,
            inEnd: currentBegin + 200,
            outBegin: currentBegin + 300,
            outEnd: currentBegin + 1200,
        },
    });

    addFadingScrollImage(parallax067Image, 20);
    addFadingScrollImage(parallax066Image, 20);
    addFadingScrollImage(parallax065Image, 20);
    addFadingScrollImage(parallax064Image, 20);
    addFadingScrollImage(parallax063Image, 20);
    addFadingScrollImage(parallax062Image, 20);
    addFadingScrollImage(parallax061Image, 20);

    addDisplayInfoBox('Ciao!', 'Bis bald am Hafen!', 200);

    addFadingScrollImage(parallax01Image, 600);

    return [...scrollImages, ...scrollInfoBoxes];
};

export default getScrollElements;
