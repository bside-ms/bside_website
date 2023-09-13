import type { ReactElement } from 'react';
import FrontPageImage from '@/components/frontPage/FrontPageImage';
import FrontPageText from '@/components/frontPage/FrontPageText';
import ContentWrapper from '@/components/layout/ContentWrapper';

const FrontPageHero = (): ReactElement => (
    <>
        <ContentWrapper>
            <FrontPageImage />
        </ContentWrapper>

        <div className="lg:hidden px-0 lg:mb-2">
            <ContentWrapper>
                <FrontPageText />
            </ContentWrapper>
        </div>
    </>
);

export default FrontPageHero;
