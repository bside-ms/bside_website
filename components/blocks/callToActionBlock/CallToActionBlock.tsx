import type { ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';
import type { CallToActionBlockProps } from '@/types/payload/Blocks';
import CallToAction from 'components/blocks/callToActionBlock/CallToAction';

const CallToActionBlock = ({ title, href, text }: CallToActionBlockProps): ReactElement => {

    return (
        <ContentWrapper>
            <CallToAction title={title} href={href} text={text} />
        </ContentWrapper>
    );
};

export default CallToActionBlock;
