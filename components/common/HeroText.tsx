import type { ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';

interface Props {
    title: string;
}

const HeroText = ({ title }: Props): ReactElement => {
    return (
        <ContentWrapper>
            <h1 className="mt-4 bg-black p-3 text-center font-serif text-2xl text-white">{title}</h1>
        </ContentWrapper>
    );
};

export default HeroText;
