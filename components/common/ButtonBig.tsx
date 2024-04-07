import Link from 'next/link';
import type { ReactElement } from 'react';

interface Props {
    buttonText: string;
    buttonLink: string;
}

const ButtonBig = ({ buttonText, buttonLink }: Props): ReactElement => {
    return (
        <div className="text-md mx-8 mt-3 md:mx-16 md:px-16 md:text-lg">
            <Link
                href={buttonLink}
                className="mt-1 block bg-black py-1
                           text-center font-serif text-lg text-white
                           md:mt-3 md:cursor-pointer
                           md:py-3 md:hover:bg-orange-500 md:hover:text-black"
            >
                {buttonText}
            </Link>
        </div>
    );
};

export default ButtonBig;
