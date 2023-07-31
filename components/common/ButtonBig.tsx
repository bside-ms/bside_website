import Link from 'next/link';
import type { ReactElement } from 'react';

interface Props {
    buttonText: string;
    buttonLink: string;
}

const ButtonBig = ({ buttonText, buttonLink }: Props): ReactElement => {
    return (
        <div className="mt-3 mx-8 text-md md:text-lg md:mx-16 md:px-16">
            <Link
                href={buttonLink}
                className="block text-lg text-center font-serif
                           py-1 md:py-3 mt-1 md:mt-3
                           text-white bg-black
                           md:cursor-pointer md:hover:text-black md:hover:bg-orange-500"
            >
                {buttonText}
            </Link>
        </div>
    );
};

export default ButtonBig;
