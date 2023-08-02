import type { ReactElement } from 'react';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import type { CallToActionBlockProps } from '@/types/payload/Blocks';
import { CallToAction } from '@blocks/CallToActionBlock';

const CallToActionBlock = ({ title, href, text }: CallToActionBlockProps): ReactElement => {

    return (
        <ContentWrapper>
            <CallToAction title={title} href={href} text={text} />
        </ContentWrapper>
    );
};

export default CallToActionBlock;
