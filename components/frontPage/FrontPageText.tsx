import Link from 'next/link';
import type { ReactElement } from 'react';
import type { HomePageProps } from '@/types/globals';

const FrontPageText = ({ title, textBody, buttonText }: HomePageProps): ReactElement => (
    <div>
        <div className="text-center font-serif text-2xl font-bold lg:text-xl">{title}</div>

        <div className="mt-1 text-base md:text-lg lg:mt-3">{textBody}</div>

        <div className="mt-3">
            <Link
                href="/bside"
                className="mt-1 block bg-black py-1 text-center font-serif text-lg text-white lg:cursor-pointer lg:py-2 lg:hover:bg-orange-500 lg:hover:text-black"
            >
                {buttonText}
            </Link>
        </div>
    </div>
);

export default FrontPageText;
