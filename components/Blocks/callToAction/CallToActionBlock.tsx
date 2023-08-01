import type { ReactElement } from 'react';
import CallToAction from '@/components/Blocks/callToAction/CallToAction';
import ContentWrapper from '@/components/Layout/ContentWrapper';
import type { CallToActionBlockProps } from '@/types/payload/Blocks';

const CallToActionBlock = ({ title, href, text }: CallToActionBlockProps): ReactElement => {

    return (
        <ContentWrapper>
            <CallToAction title={title} href={href} text={text} />
        </ContentWrapper>
    );
};

export default CallToActionBlock;
