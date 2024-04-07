import type { ReactElement } from 'react';
import ContentWrapper from '@/components/layout/ContentWrapper';
import type { CallToActionBlockProps } from '@/types/payload/Blocks';
import Button from '@blocks/buttonBlock/Button';

const ButtonBlock = ({ title, href, text }: CallToActionBlockProps): ReactElement => {
    return (
        <ContentWrapper>
            <Button title={title} href={href} text={text} />
        </ContentWrapper>
    );
};

export default ButtonBlock;
