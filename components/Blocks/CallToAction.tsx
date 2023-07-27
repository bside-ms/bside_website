import Link from 'next/link';
import type { ReactElement } from 'react';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import Chevron from '@/components/svg/Chevron';
import { toKebabCase } from '@/lib/common/toKebabCase';
import type { CallToActionBlockProps } from '@/types/payload/Blocks';

const CallToAction = ({ title, href, text }: CallToActionBlockProps): ReactElement => {
    return (

        <ContentWrapper>
            <div
                key={`cta-${toKebabCase(title)}`}
                className="relative w-[94%] mx-auto border-4 border-black px-6 py-4 text-center"
            >
                <div className="absolute w-4 md:w-6 top-1/2 -translate-y-1/2 right-[102%]">
                    <Chevron />
                </div>
                <div className="font-bold font-serif text-xl md:text-2xl">
                    {title}
                </div>
                <Link
                    href={href}
                    className="block text-lg py-1 md:py-3 mt-1 md:mt-3 text-white bg-black md:cursor-pointer md:hover:text-black md:hover:bg-orange-500"
                >
                    {text}
                </Link>
                <div className="absolute w-4 md:w-6 -scale-x-100 top-1/2 -translate-y-1/2 left-[102%]">
                    <Chevron />
                </div>
            </div>
        </ContentWrapper>

    );
};

export const CallToActionBlock = (props: CallToActionBlockProps): ReactElement => {
    return (
        <CallToAction
            title={props.title}
            text={props.text}
            href={props.href}
        />
    );
};
