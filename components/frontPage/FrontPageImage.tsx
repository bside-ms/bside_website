import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import FrontPageText from '@/components/frontPage/FrontPageText';
import hausPng from '@/public/assets/haus.png';
import herzPng from '@/public/assets/herz.png';
import type { HomePageProps } from '@/types/globals';

const FrontPageImage = ({ title, textBody, buttonText }: HomePageProps): ReactElement => (
    <div className="mt-1 md:mt-0 lg:mx-auto lg:h-[560px] xl:h-[525px] 2xl:h-[580px]">
        <div className="relative overflow-hidden pt-5 lg:flex lg:justify-center lg:overflow-visible">
            <div className="relative lg:mr-auto lg:flex lg:justify-start">
                <Link href="/bside/haus" className="cursor-default lg:cursor-pointer">
                    <div className="h-[400px] lg:relative lg:h-auto lg:w-[700px] xl:w-[800px] 2xl:w-[900px]">
                        <Image
                            className="absolute left-[20px] top-[0px] w-[200px] max-w-none lg:w-[290px]"
                            src={herzPng}
                            alt="B-Side-Herz"
                            loading="eager"
                            width={1200}
                            height={1091}
                        />
                        <Image
                            className="absolute left-[20px] top-[55px] w-[600px] max-w-none lg:relative lg:left-0 lg:top-0 lg:w-full lg:pt-[55px]"
                            src={hausPng}
                            alt="B-Side am Hafen"
                            loading="eager"
                            width={1297}
                            height={682}
                        />
                    </div>
                </Link>
            </div>
            <div>
                <div className="absolute bottom-0 right-0 hidden lg:top-[325px] lg:block lg:w-[400px] xl:top-[350px] xl:w-[550px] 2xl:top-[375px] 2xl:w-[500px]">
                    <FrontPageText title={title} textBody={textBody} buttonText={buttonText} />
                </div>
            </div>
        </div>
    </div>
);

export default FrontPageImage;
