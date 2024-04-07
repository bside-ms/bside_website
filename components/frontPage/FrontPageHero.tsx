import type { ReactElement } from 'react';
import FrontPageImage from '@/components/frontPage/FrontPageImage';
import FrontPageText from '@/components/frontPage/FrontPageText';
import ContentWrapper from '@/components/layout/ContentWrapper';
import type { HomePageProps } from '@/types/globals';

const FrontPageHero = ({ title, textBody, buttonText }: HomePageProps): ReactElement => (
    <>
        <ContentWrapper>
            <FrontPageImage title={title} textBody={textBody} buttonText={buttonText} />
        </ContentWrapper>

        <div className="px-0 lg:mb-2 lg:hidden">
            <ContentWrapper>
                <FrontPageText title={title} textBody={textBody} buttonText={buttonText} />
            </ContentWrapper>
        </div>
    </>
);

export default FrontPageHero;
