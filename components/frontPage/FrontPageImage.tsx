import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import FrontPageText from '@/components/frontPage/FrontPageText';
import hausPng from '@/public/assets/haus.png';
import herzPng from '@/public/assets/herz.png';

const FrontPageImage = (): ReactElement => (
    <div className="mt-1 md:mt-0 lg:mx-auto lg:h-[560px] xl:h-[525px] 2xl:h-[580px]">
        <div className="relative overflow-hidden lg:overflow-visible lg:flex lg:justify-center pt-5">
            <div className="relative lg:flex lg:justify-start lg:mr-auto">
                <Link href="/bside/haus" className="cursor-default lg:cursor-pointer">
                    <div className="lg:relative h-[400px] lg:h-auto lg:w-[700px] xl:w-[800px] 2xl:w-[900px]">
                        <Image
                            className="absolute top-[0px] left-[20px] w-[200px] lg:w-[290px] max-w-none"
                            src={herzPng}
                            alt="B-Side-Herz"
                            loading="eager"
                        />
                        <Image
                            className="absolute lg:relative top-[55px] lg:top-0 lg:pt-[55px] left-[20px] w-[600px] lg:w-full lg:left-0 max-w-none"
                            src={hausPng}
                            alt="B-Side am Hafen"
                            loading="eager"
                        />
                    </div>
                </Link>
            </div>
            <div>

                <div className="hidden lg:block absolute lg:top-[325px] xl:top-[350px] 2xl:top-[375px] right-0 bottom-0 lg:w-[400px] xl:w-[550px] 2xl:w-[500px]">
                    <FrontPageText />
                </div>

            </div>
        </div>
    </div>
);

export default FrontPageImage;
