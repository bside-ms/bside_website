/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import type { ReactElement } from 'react';
import hausPng from 'public/assets/haus.png';
import herzPng from 'public/assets/herz.png';

const HouseHero = (): ReactElement => {

    return (
        <div className="relative overflow-hidden md:overflow-visible md:flex md:justify-center pt-5">
            <Link href="/bside/haus" className="cursor-default md:cursor-pointer">
                <div className="relative md:flex md:justify-center">
                    <div className="md:relative h-[400px] md:h-auto md:w-[45rem]">
                        <img
                            className="absolute top-[0px] left-[20px] w-[200px] md:w-[220px] max-w-none"
                            src={herzPng.src}
                            alt="B-Side-Herz"
                            width={1900}
                            loading="eager"
                        />
                        <img
                            className="absolute md:relative top-[55px] md:top-0 md:pt-[55px] left-[20px] w-[600px] md:w-full md:left-0 max-w-none"
                            src={hausPng.src}
                            alt="B-Side am Hafen"
                            width={1900}
                            loading="eager"
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default HouseHero;
