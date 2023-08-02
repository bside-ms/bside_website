import type { ReactElement } from 'react';
import type { ContentColumnProps } from '@/types/payload/Blocks';
import { RichText } from '@blocks/RichTextBlock';

interface Props {
    firstColumn: ContentColumnProps;
}

const FullColumnContent = ({ firstColumn }: Props): ReactElement | null => {

    return <RichText content={firstColumn.richText} />;
};

export default FullColumnContent;
