import type { StaticImageData } from 'next/image';
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
    text: string;
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

export const isScrollImage = (scrollElement: ScrollElement): scrollElement is ScrollImage => (
    'image' in scrollElement
);

export const isScrollInfoBox = (scrollElement: ScrollElement): scrollElement is ScrollInfoBox => (
    'text' in scrollElement
);

const getScrollElements = (): Array<ScrollElement> => {

    const scrollImages = new Array<ScrollImage>(
        {
            image: parallax02Image,
            fade: {
                inBegin: 0,
                inEnd: 0,
                outBegin: 700,
                outEnd: 1500,
            },
        },
    );

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

    const addDisplayInfoBox = (title: string | undefined, text: string, duration: number): void => {

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

    addFadingScrollImage(parallax01Image, 1000);

    addFadingScrollImage(parallax061Image, 100);
    addFadingScrollImage(parallax062Image, 100);
    addFadingScrollImage(parallax063Image, 100);
    addFadingScrollImage(parallax064Image, 100);
    addFadingScrollImage(parallax065Image, 100);
    addFadingScrollImage(parallax066Image, 100);
    addFadingScrollImage(parallax067Image, 100);

    addFadingScrollImage(parallax07Image, 500);

    addDisplayInfoBox(
        undefined,
        'Hier seht ihr, wie wir uns den Hill-Speicher zukünftig mit dem Ruderverein Münster teilen werden.',
        2000
    );

    addFadingScrollImage(parallax08Image, 2000, 150);

    addFadingScrollImage(parallax07Image, 500, 150);
    addFadingScrollImage(parallax085Image, 400, 50);

    currentBegin = currentBegin - 50;

    addDisplayInfoBox(
        'Blauer Raum',
        'Dies ist der blaue Raum, schön nicht?',
        1500
    );
    addDisplayingScrollImage(parallax10Image, 1500);

    addDisplayInfoBox(
        'Raum in lila',
        'Und hier vorne haben wir einen lilafarbenen Raum',
        1500
    );
    addDisplayingScrollImage(parallax11Image, 1500);

    addDisplayInfoBox(
        undefined,
        'Und so geht es dann mit den anderen Räumen weiter!',
        1500
    );
    addDisplayingScrollImage(parallax12Image, 1500);

    addDisplayInfoBox(
        undefined,
        'Viele bunte Räume, ...',
        1500
    );
    addDisplayingScrollImage(parallax13Image, 1500);

    addDisplayInfoBox(
        undefined,
        '... für viele schöne Dinge.',
        1500
    );
    addDisplayingScrollImage(parallax14Image, 1500);

    addDisplayInfoBox(
        undefined,
        'Zum Beispiel gemeinsam am Tisch sitzen!',
        1500
    );
    addDisplayingScrollImage(parallax15Image, 1500);

    addDisplayInfoBox(
        undefined,
        'Oder am Schreibtisch!',
        1500
    );
    addDisplayingScrollImage(parallax16Image, 1500);

    addDisplayInfoBox(
        undefined,
        'Peek & Cloppenburg hat auch eine Filiale im Haus.',
        1500
    );
    addDisplayingScrollImage(parallax17Image, 1500);

    addDisplayInfoBox(
        undefined,
        'Hier wird fleißig gewerkelt.',
        1500
    );
    addDisplayingScrollImage(parallax18Image, 1500);

    addDisplayInfoBox(
        undefined,
        'Und hier geplant!',
        1500
    );
    addDisplayingScrollImage(parallax19Image, 1500);

    addDisplayInfoBox(
        undefined,
        'Ob sich dies überhaupt jemand durchließt?',
        1500
    );
    addDisplayingScrollImage(parallax20Image, 1500);

    addDisplayInfoBox(
        undefined,
        'Die Programmierung dieser Parallax-UX macht Spaß!',
        1500
    );
    addDisplayingScrollImage(parallax21Image, 1500);

    addDisplayInfoBox(
        undefined,
        'Wundervolle Sonntag-Nachmittag-Beschäftigung!',
        1500
    );
    addDisplayingScrollImage(parallax22Image, 1500);

    addDisplayInfoBox(
        undefined,
        'Nun kommen wir auch zum Ende der Räume',
        1500
    );
    addDisplayingScrollImage(parallax23Image, 1500);

    addDisplayInfoBox(
        undefined,
        'Danke für eure Aufmerksamkeit!',
        1500
    );
    addDisplayingScrollImage(parallax24Image, 1500);

    addDisplayInfoBox(
        undefined,
        'Tschüss!',
        1500
    );
    addDisplayingScrollImage(parallax25Image, 1500);

    currentBegin = currentBegin - 50;

    addFadingScrollImage(parallax085Image, 600, 50);

    addFadingScrollImage(parallax07Image, 500);

    scrollImages.push({
        image: parallax02Image,
        fade: {
            inBegin: currentBegin,
            inEnd: currentBegin + 400,
            outBegin: currentBegin + 1200,
            outEnd: currentBegin + 2500,
        },
    });

    addFadingScrollImage(parallax067Image, 100);
    addFadingScrollImage(parallax066Image, 100);
    addFadingScrollImage(parallax065Image, 100);
    addFadingScrollImage(parallax064Image, 100);
    addFadingScrollImage(parallax063Image, 100);
    addFadingScrollImage(parallax062Image, 100);
    addFadingScrollImage(parallax061Image, 1000);

    return [...scrollImages, ...scrollInfoBoxes];
};

export default getScrollElements;
