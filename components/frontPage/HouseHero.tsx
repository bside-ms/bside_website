/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import type { ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';
import hausPng from 'public/assets/haus.png';
import herzPng from 'public/assets/herz.png';

const HeroText = (): ReactElement => (
    <div>
        <div className="font-bold font-serif text-2xl lg:text-xl">
            Die B-Side in Münster
        </div>

        <div className="mt-1 text-md lg:mt-3 md:text-lg">
            Die B-Side ist ein offener Ort der Möglichkeiten
            am <span className="line-through">Münsteraner Hafen</span> Hawerkamp,
            der von vielen Menschen selbstorganisiert entwickelt, gestaltet und
            verwaltet wird. Auch du kannst hier kreativ und aktiv werden oder
            einfach eine gute Zeit haben!
        </div>

        <div className="mt-3 mx-8">
            <Link
                href="/bside"
                className="block text-lg text-center font-serif py-1 lg:py-2 mt-1 text-white bg-black lg:cursor-pointer lg:hover:text-black lg:hover:bg-orange-500"
            >
                Mehr erfahren
            </Link>
        </div>
    </div>
);

const HouseHero = (): ReactElement => {

    return (
        <>
            <ContentWrapper>
                <div className="mt-1 md:mt-0 lg:mx-auto lg:h-[560px] xl:h-[525px] 2xl:h-[580px]">
                    <div className="relative overflow-hidden lg:overflow-visible lg:flex lg:justify-center pt-5">
                        <div className="relative lg:flex lg:justify-start lg:mr-auto">
                            <Link href="/bside/haus" className="cursor-default lg:cursor-pointer">
                                <div className="lg:relative h-[400px] lg:h-auto lg:w-[700px] xl:w-[800px] 2xl:w-[900px]">
                                    <img
                                        className="absolute top-[0px] left-[20px] w-[200px] lg:w-[290px] max-w-none"
                                        src={herzPng.src}
                                        alt="B-Side-Herz"
                                        width={1900}
                                        loading="eager"
                                    />
                                    <img
                                        className="absolute lg:relative top-[55px] lg:top-0 lg:pt-[55px] left-[20px] w-[600px] lg:w-full lg:left-0 max-w-none"
                                        src={hausPng.src}
                                        alt="B-Side am Hafen"
                                        width={1900}
                                        loading="eager"
                                    />
                                </div>
                            </Link>
                        </div>
                        <div>

                            <div className="hidden lg:block absolute lg:top-[325px] xl:top-[350px] 2xl:top-[375px] right-0 bottom-0 lg:w-[400px] xl:w-[550px] 2xl:w-[500px]">
                                <HeroText />
                            </div>

                        </div>
                    </div>
                </div>
            </ContentWrapper>

            <div className="lg:hidden px-0 mb-2">
                <ContentWrapper>
                    <HeroText />
                </ContentWrapper>
            </div>
        </>
    );
};

export default HouseHero;
