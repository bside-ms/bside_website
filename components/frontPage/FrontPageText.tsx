import Link from 'next/link';
import type { ReactElement } from 'react';
import type { HomePageProps } from '@/types/globals';

const FrontPageText = ({ title, textBody, buttonText }: HomePageProps): ReactElement => (
    <div>
        <div className="font-bold font-serif text-center text-2xl lg:text-xl">
            {title}
        </div>

        <div className="mt-1 text-md lg:mt-3 md:text-lg">
            {textBody}
        </div>

        <div className="mt-3">
            <Link
                href="/bside"
                className="block text-lg text-center font-serif py-1 lg:py-2 mt-1 text-white bg-black lg:cursor-pointer lg:hover:text-black lg:hover:bg-orange-500"
            >
                {buttonText}
            </Link>
        </div>
    </div>
);

export default FrontPageText;
